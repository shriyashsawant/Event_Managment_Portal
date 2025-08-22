// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage'; 
import TemplateSelectionPage from './pages/TemplateSelectionPage';
import CalendarPage from './pages/CalendarPage';
import LiquidBackground from './components/LiquidBackground';
import Navigation from './components/Navigation';
import './App.css';


function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans relative">
        <LiquidBackground />
        <div className="relative z-10 container mx-auto p-4 sm:p-6 lg:p-8">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/select-template" element={<TemplateSelectionPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/create" element={<CreateEventPage />} />
            <Route path="/event/:id/edit" element={<EditEventPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
