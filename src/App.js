import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import Form from './components/Form';
import GeneratedStory from './components/GeneratedStory';
import Leaderboard from './components/LeaderBoard';
import Navbar from './layouts/Navbar';
import ExtendedStoryGenerator from './components/ExtendedStoryGenerator';
import { BrowserRouter as Router, Route,Routes,   Link , useNavigate, Navigate} from 'react-router-dom';

function App() {
 
  return (
    <div>
       <Router>
        <Navbar />
        <Routes>
              <Route  path="/" element={<Form />} /> 
              <Route  path="/leaderBoard" element={<Leaderboard /> } /> 
              <Route path="/extendedStory/:storyId" element={<ExtendedStoryGenerator/>}/>
                       
        </Routes>
      </Router> 
      
      
      
    </div>
  );
};

export default App;
