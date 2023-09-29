// src/components/Form.js
import React, { useState } from 'react';
import axios from 'axios';

const Form = ({ onStoryGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [response,setResponse] = useState('----');

  const handleSubmit = async (e) => {
    e.preventDefault();
      /*axios
        .post("http://localhost:3001/chat/",{prompt})
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err)=> {
          console.error(err);
        });*/
    if(prompt!=""){
      try {
        const response = await axios.post('http://localhost:3001/api/generate', {
          prompt,
        });
  
        const generatedStory = response.data.story;
        const generatedstoryid = response.data.storyId;
        //console.log(generatedStory);
        setResponse(generatedStory);
        onStoryGenerated(generatedStory,generatedstoryid);
      } catch (error) {
        console.error('Error generating story:', error.message);
      }
    }else{
      alert("field is empty");
    }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>
        Story Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      <button type="submit">Generate Story</button>
    </form>
    </div>
    
  );
};

export default Form;
