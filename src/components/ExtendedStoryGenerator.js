// src/components/GeneratedStory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';
import { RWebShare } from "react-web-share";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EnumEmojis =  {
  like:  '❤️',
  funny:  '😂',
  interesting: '🤓' ,
  emotional: '🥺',
  shocking: '😲',
  dislike:  '👎',
};

const ExtendedStoryGenerator = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState([]);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isReacted, setIsRecated] = useState(false);
  const [extendedStories, setExtendedStories] = useState([]);

  useEffect(() => {
    extendStory();
    const exstories = JSON.parse(sessionStorage.getItem('ExtendedStories')) || [];
    setExtendedStories(exstories);
  }, []);


  const extendStory = async () =>{
    if (extendedStories.includes(storyId)) {
      alert('You have already Extended this story.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/extendstory', {
        storyId 
      });
      setStory(response.data.story);
      setExtendedStories((prevExtendedStories) => [...prevExtendedStories, storyId]);
      sessionStorage.setItem('ExtendedStories', JSON.stringify([...extendedStories, storyId]));
    } catch (error) {
      console.error('Error generating story:', error.message);
    }

  }
  const fetchStoryById = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/getStoryById/${storyId}` );
      setStory(response.data.story);
    } catch (error) {
      console.error('Error fetching leaderboard:', error.message);
    }
  };

  const handleUpvote = async () => {
    if (!isUpvoted) {
      try {
        await axios.post('http://localhost:3001/api/upvote', { storyId });
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
        await axios.post('http://localhost:3001/api/addreaction', { storyId  ,reactiontype });
        //console.log("reacted")
        setIsRecated(true);
        sessionStorage.setItem('reactedStories', JSON.stringify([storyId]));
      } catch (error) {
        console.error('Error adding reaction to story:', error.message);
      }
    }

  } 



  
  const handleSave = () => {
    const blob = new Blob([story.content], { type: 'text/plain' });
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
        {story.content ? (
          <div className="container">
          <div className="col-md-10 offset-md-1 border-success border rounded-5 p-4 mt-5 shadow">
          <p class="fw-bold fst-italic fs-4">{story.prompt}</p>
          <p class="fs-5 text-justify">{story.content}</p>
  
          <button className="btn btn-primary m-2" onClick={handleUpvote} disabled={isUpvoted}>
            {isUpvoted ? 'voted' : 'vote'}
          </button>
          <button className="btn btn-success m-2" onClick={handleSave}>Save as Text <Icon.Download/></button>
          <RWebShare
            data={{
              text: `${story.content}`,
              url: "http://localhost:3000",
              title: `AI Generated Story for Title: ${story.prompt}`,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <button  className="btn btn-dark m-2" ><Icon.Share/> Share</button>
          </RWebShare>

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
            <br></br>
            <Link className="btn btn-primary my-2" to={-1}>
              Go Back
            </Link>
          </div>
          
          </div>
        ):(<p class="fw-bold fst-italic fs-5 m-2"> Loading....</p>)}
      
    </>
    
  );
};

export default ExtendedStoryGenerator;
