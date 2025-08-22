// src/pages/EditEventPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EventForm from '../components/EventForm'; 

const EditEventPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/events/${id}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Could not fetch event data.');
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error("Failed to fetch event data for editing:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, [id]);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
      <header className="mb-8">
        <Link to={`/event/${id}`} className="text-indigo-600 hover:text-indigo-800 font-semibold">&larr; Back to Event</Link>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mt-2">Edit Event</h1>
        <p className="text-gray-500 mt-2">Update the details for your event below.</p>
      </header>
      
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        {loading ? (
          <p>Loading event data...</p>
        ) : eventData ? (
          <EventForm existingEvent={eventData} />
        ) : (
          <p>Could not load event data to edit.</p>
        )}
      </div>
    </div>
  );
};

export default EditEventPage;