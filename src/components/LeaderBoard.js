// src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RWebShare } from "react-web-share";
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const EnumEmojis =  {
  like:  '❤️',
  funny:  '😂',
  interesting: '🤓' ,
  emotional: '🥺',
  shocking: '😲',
  dislike:  '👎',
};


const Leaderboard = () => {
  const [topStories, setTopStories] = useState([]);
  const [votedStories, setVotedStories] = useState([]);
  const [reactedStories, setReactedStories] = useState([]);

  

  useEffect(() => {
    fetchLeaderboard();
    const storedVotedStories = JSON.parse(sessionStorage.getItem('votedStories')) || [];
    setVotedStories(storedVotedStories);
  }, []); // Run once on component mount

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/leaderboard');
      setTopStories(response.data.topStories);
    } catch (error) {
      console.error('Error fetching leaderboard:', error.message);
    }
  };


  const handleDownreaction = async (storyId,reactiontype) => {
    try {
      await axios.post('http://localhost:3001/api/downvote', { storyId,reactiontype });
      console.log(topStories);
      setTopStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId ? { ...story, reactions: { ...story.reactions, [reactiontype]: story.reactions[reactiontype] - 1 }} : story
        )
      );

      setVotedStories((prevVotedStories) => prevVotedStories.filter((id) => id !== storyId));
      sessionStorage.setItem('votedStories', JSON.stringify([...votedStories, storyId]));
    } catch (error) {
      console.error('Error upvoting story:', error.message);
    }

  };



  const handleUpreaction = async (storyId,reactiontype) => {
    if (reactedStories.includes(storyId)) {
      alert('You have already Reacted for this story.');
      return;
    }
    try {

      await axios.post('http://localhost:3001/api/addreaction', { storyId,reactiontype });
      console.log(topStories);
      setTopStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId ? { ...story, reactions: { ...story.reactions, [reactiontype]: story.reactions[reactiontype] + 1 }} : story
        )
      );
      setReactedStories((prevReactedStories) => [...prevReactedStories, storyId]);
      sessionStorage.setItem('reactedStories', JSON.stringify([...reactedStories, storyId]));
    } catch (error) {
      console.error('Error upvoting story:', error.message);
    }
  };


  const handleUpvote = async (storyId) => {
    // Check if the user has already voted for this story
    if (votedStories.includes(storyId)) {
      alert('You have already voted for this story.');
      return;
    }

    try {
      // Call the upvote API
      await axios.post('http://localhost:3001/api/upvote', { storyId });

      // Update the local state and localStorage
      setTopStories((prevStories) =>
        prevStories.map((story) =>
          story._id === storyId ? { ...story, votes: story.votes + 1 } : story
        )
      );

      setVotedStories((prevVotedStories) => [...prevVotedStories, storyId]);
      sessionStorage.setItem('votedStories', JSON.stringify([...votedStories, storyId]));
    } catch (error) {
      console.error('Error upvoting story:', error.message);
    }

  };

  const handleSave = (story,storyId) => {
    // Create a Blob with the story content
    const blob = new Blob([story], { type: 'text/plain' });

    // Create a link to download the Blob as a text file
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `story${storyId}.txt`;

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link to initiate the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    console.log('Story saved as a text file!');
  };


  return (
    <>
      {topStories!=[]? (
        <div className="container">
        <div>
          <h2 className="text-center m-4 ">Leaderboard</h2>
          <ul class="list-unstyled">
            {topStories.map((story) => (
              <div className="col-md-12 offset-md-0 border-success border rounded-5 p-4 mt-5 shadow">
                <li key={story._id}>
                <p class="fw-bold fst-italic fs-4">{story.prompt}</p>
                <p class="fs-5 text-justify">{story.content}</p>
  
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleUpvote(story._id)}
                  disabled={votedStories.includes(story._id)}
                >
                  {`${story.votes} Votes` }
                </button>  
                <button className="btn btn-success m-2" onClick={()=>{handleSave(story.content,story._id)}}> Save as Text <Icon.Download/></button>
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
                <Link to={`/extendedStory/${story._id}`} className="btn btn-warning m-2">Extend Story</Link>
  
  
                <br></br>
  
  
                {Object.entries(story.reactions).map(([reaction, count]) => (
                  <span key={reaction} style={{ marginRight: '10px' }}>
                    <button
                      className="border-success border rounded-4 m-2 "
                      onClick={() => handleUpreaction(story._id,reaction)}
                    >
                      <span style={{ fontSize: '24px' }}>{EnumEmojis[reaction]}</span>{' '}
                        <span style={{ fontSize: '18px' }}>{count}</span>
                    </button>
  
                  </span>
                ))}
                         
                
                              
              </li>
  
              </div>
              
            ))}
          </ul>
        </div>   
      </div>

      ):(<p class="fst-italic text-center fs-6 mt-5"> No Stories to Display Generate your first story</p>)}
    </>
    
  );
};

export default Leaderboard;
