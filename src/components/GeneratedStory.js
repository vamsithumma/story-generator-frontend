// src/components/GeneratedStory.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import { RWebShare } from "react-web-share";
import { BASE_URL } from '../url';

const EnumEmojis =  {
  like:  '❤️',
  funny:  '😂',
  interesting: '🤓' ,
  emotional: '🥺',
  shocking: '😲',
  dislike:  '👎',
};

const GeneratedStory = ({ story, storyId ,storyPrompt }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isReacted, setIsReacted] = useState(false);

  useEffect(() => {
    setIsUpvoted(false);
    setIsReacted(false);
  }, []);

  const handleUpvote = async () => {
    if (!isUpvoted) {
      try {
        await axios.post(`${BASE_URL}/api/upvote`, { storyId });
        //console.log("voted")
        setIsUpvoted(true);
        sessionStorage.setItem('votedStories', JSON.stringify([storyId]));
      } catch (error) {
        console.error('Error upvoting story:', error.message);
      }
    }
  };

  const handleUpreaction = async(reactiontype) =>{
    if (!isReacted) {
      try {
        await axios.post(`${BASE_URL}/api/addreaction`, { storyId ,reactiontype});
        //console.log("reacted")
        setIsReacted(true);
        sessionStorage.setItem('reactedStories', JSON.stringify([storyId]));
      } catch (error) {
        console.error('Error adding reaction to story:', error.message);
      }
    }

  }



  
  const handleSave = () => {
    const blob = new Blob([story], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `story${storyId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Story saved as a text file!');
  };


  return (
    <>
      {story ? (
          <div className="col-md-12 offset-md-0 border-success border rounded-5 p-4 mt-5 shadow">
          <p class="fw-bold fst-italic fs-4">{storyPrompt}</p>
          <p class="fs-5 text-justify">{story}</p>
          <div>
            
          </div>
          <button className="btn btn-primary m-2" onClick={handleUpvote} disabled={isUpvoted}>
            {isUpvoted ? 'voted' : 'vote'}
          </button>
          <button className="btn btn-success m-2" onClick={handleSave}>Save as Text <Icon.Download/></button>
          <RWebShare
            data={{
              text: `${story}`,
              url: BASE_URL,
              title: `AI Generated Story for Title: ${storyPrompt}`,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <button  className="btn btn-dark m-2" ><Icon.Share/> Share</button>
          </RWebShare>

          <Link to={`/extendedStory/${storyId}`} className="btn btn-warning m-2">Extend Story</Link>
          

          <br></br>

          {Object.entries(EnumEmojis).map(([reaction, emoji]) => (
              <span key={reaction} style={{ marginRight: '10px' }}>
                <button
                    className="border-success border rounded-4 m-2 "
                    onClick={() => handleUpreaction(reaction)}
                    disabled={isReacted}
                  >
                  {isReacted ? (<span style={{ fontSize: '24px', backgroundcolor: 'black'}}>{emoji}</span>): (<span style={{ fontSize: '24px' }}>{emoji}</span>)}
                  
                  </button>
    
                  </span>
            ))}
    
        </div>
      ):(<p class="fst-italic text-center fs-6 m-1"> Kindly Navigate to LeaderBoard page to view all Generated Stories</p>)}
    </>
    
  );
};

export default GeneratedStory;
