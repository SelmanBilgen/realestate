import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProjectDetailPage from './Pages/ProjectDetailPage';
import AdminPage from './Pages/AdminPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;