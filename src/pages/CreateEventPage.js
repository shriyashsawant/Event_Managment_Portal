// src/pages/CreateEventPage.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import EventForm from '../components/EventForm';

const CreateEventPage = () => {
  const location = useLocation();
  const templateId = location.state?.templateId || 'classic'; 

  console.log("CHECK #1: CreateEventPage received templateId:", templateId);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <header className="mb-8">
        <Link to="/select-template" className="text-indigo-600 hover:text-indigo-800 font-semibold">&larr; Back to Templates</Link>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-2">Create a New Event</h1>
        <p className="text-gray-500 mt-2">Using the <span className="font-bold capitalize">{templateId}</span> template.</p>
      </header>
      
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <EventForm templateId={templateId} />
      </div>
    </div>
  );
};

export default CreateEventPage;