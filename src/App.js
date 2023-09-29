import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Form from './components/Form';
import GeneratedStory from './components/GeneratedStory';
import Leaderboard from './components/LeaderBoard';
import ChatbotApp from './ChatBot';

function App() {
  const [generatedStory, setGeneratedStory] = useState('');
  const [currentStoryId, setCurrentStoryId] = useState(null);
  const [topStories, setTopStories] = useState([]);
  const handleStoryGenerated = (story, storyId) => {
    //console.log(story);
    setCurrentStoryId(storyId);
    setGeneratedStory(story);
  };

  return (
    <div>
      
      <Form onStoryGenerated={handleStoryGenerated} />
      <GeneratedStory story={generatedStory} storyId={currentStoryId}/>
      <Leaderboard />
    </div>
  );
};

export default App;
