// src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [topStories, setTopStories] = useState([]);
  const [votedStories, setVotedStories] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/leaderboard');
        setTopStories(response.data.topStories);
      } catch (error) {
        console.error('Error fetching leaderboard:', error.message);
      }
    };

    fetchLeaderboard();
  }, []); // Run once on component mount

  useEffect(() => {
    // Load voted stories from localStorage
    const storedVotedStories = JSON.parse(localStorage.getItem('votedStories')) || [];
    setVotedStories(storedVotedStories);
  }, []);

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
      localStorage.setItem('votedStories', JSON.stringify([...votedStories, storyId]));
    } catch (error) {
      console.error('Error upvoting story:', error.message);
    }
  };

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {topStories.map((story) => (
          <li key={story._id}>
            <p>{story.prompt}</p>
            <p>{story.content}</p>
            <p>{story.votes} Votes</p>
            <button
              onClick={() => handleUpvote(story._id)}
              disabled={votedStories.includes(story._id)}
            >
              {votedStories.includes(story._id) ? 'Voted' : 'Upvote'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
