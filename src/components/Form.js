// src/components/Form.js
import React, { useState } from 'react';
import axios from 'axios';
import GeneratedStory from './GeneratedStory';

const Form = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [currentStoryId, setCurrentStoryId] = useState(null);
  const [genre,setGenre] = useState('comedy');
  const [sendPrompt,setSendPrompt] = useState('');
  const [words, setWords] = useState(50); 

  const handleWordsChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setWords(newValue);
  };

  const handleGenreChange = (event) => {
    console.log(event.target.value);
    setGenre(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(prompt!=""){
      try {
        const response = await axios.post('http://localhost:3001/api/generate', {
          prompt, genre , words
        });
        setSendPrompt(prompt);
        setGeneratedStory(response.data.story);
        setCurrentStoryId(response.data.storyId);
      } catch (error) {
        console.error('Error generating story:', error.message);
      }
    }else{
      alert("field is empty");
    }
    
  };

  return (
    <div className="container">
      <div className="col-md-10 offset-md-1 border border-success rounded p-4 mt-5 shadow border rounded-5">
        <form onSubmit={handleSubmit}>
        <div className="m-3">
          <h3 className="fw-bold fst-italic text-center m-4 fs-2">Story Prompt</h3>
          <div className="d-flex align-items-start">
            <input
                type="text"
                className="text-center form-control border-primary border rounded-5 m-2"
                placeholder="Enter prompt to generate Story"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button className="btn btn-success m-2 mb-3" type="submit">Generate</button>
            </div> 
            </div>
          </form>    
          <div class="d-flex justify-content-center">  
            <label  class="fw-bold fst-italic fs-5 m-2">No of Words : {words}</label>  
              <input
                type="range"
                id="slider"
                name="slider"
                min="0"
                max="300"
                step="1"
                value={words}
                onChange={handleWordsChange}
              />
                <label  class="fw-bold fst-italic fs-5 m-2">Select Genre :</label>
                <select className="btn btn-outline-primary m-2 " name="genre"
                  value={genre}
                  onChange={(e) => handleGenreChange(e)} >
                    <option value="horror">Horror</option>
                    <option value="action">Action</option>
                    <option value="romantic">Romance</option>
                    <option value="comedy">Comedy</option>
                    <option value="historical">Historical</option>
                    <option value="scientific fiction">Science Fiction</option>
                </select>
          </div>         
        <GeneratedStory story={generatedStory} storyId={currentStoryId} storyPrompt={sendPrompt}/>
      </div>
    </div>
    
  );
};

export default Form;
