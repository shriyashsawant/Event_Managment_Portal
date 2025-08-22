// src/components/Navigation.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  // Don't show navigation on template selection page
  if (location.pathname === '/select-template') {
    return null;
  }

  return (
    <nav className="glass-container-secondary rounded-2xl p-4 mb-6 backdrop-blur-sm border border-white/20">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg 
              viewBox="0 0 100 100" 
              className="w-8 h-8 text-white group-hover:text-indigo-300 transition-colors"
              fill="currentColor"
            >
              <path d="M50 15C30.67 15 15 30.67 15 50s15.67 35 35 35 35-15.67 35-35S69.33 15 50 15zm0 60c-13.81 0-25-11.19-25-25s11.19-25 25-25 25 11.19 25 25-11.19 25-25 25z"/>
              <path d="M50 30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 35c-8.27 0-15-6.73-15-15s6.73-15 15-15 15 6.73 15 15-6.73 15-15 15z"/>
              <path d="M50 40c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-white tracking-tight">Event Portal</h1>
            <p className="text-white/70 text-sm">Manage your events</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              location.pathname === '/' 
                ? 'bg-white/20 text-white' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Events
          </Link>
          
          <Link 
            to="/calendar" 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              location.pathname === '/calendar' 
                ? 'bg-white/20 text-white' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            Calendar
          </Link>

          <Link 
            to="/select-template"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Create Event
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
