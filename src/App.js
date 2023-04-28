import React from 'react';
import Homepage from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';
import Fact from './pages/Fact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/fact" element={<Fact />} />
    </Routes>
  );
}

export default App;
