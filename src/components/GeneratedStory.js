// src/components/GeneratedStory.js
import React,{useState, useEffect} from 'react';
import axios from 'axios';

const GeneratedStory = ({ story, storyId }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  
  const handleUpvote = async (e) => {
    e.preventDefault();
    if (!isUpvoted) {
      try {
        const response= await axios.post('http://localhost:3001/api/upvote', { storyId });
        setIsUpvoted(true);
      } catch (error) {
        console.error('Error upvoting story:', error.message);
      }
    }
  };

  return (
    <div>
      <p>{story}</p>
      <button onClick={handleUpvote} disabled={isUpvoted}>
        {isUpvoted ? 'Upvoted' : 'Upvote'}
      </button>
    </div>
  );
};


export default GeneratedStory;
