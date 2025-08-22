// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { templates } from '../templates';
import { Calendar, MapPin } from 'lucide-react';

const EventCard = ({ event }) => {
  const template = templates[event.templateId] || templates.classic;
  const bannerImage = event.bannerImageUrl || `https://placehold.co/400x200/eeeeee/cccccc?text=No+Image`;
  
  console.log(`EventCard - Event ID: ${event.eventId}, Template ID: ${event.templateId}`);
  console.log(`Template:`, template);
  console.log(`Card Style: ${template.cardStyle}`);

  return (
    <div className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${template.cardStyle} relative overflow-hidden group cursor-pointer`}>
      <div className="relative z-10">
        <Link to={`/event/${event.eventId}`}>
          <div className="relative mb-4"><img src={bannerImage} alt={event.eventTitle} className="w-full h-48 object-cover rounded-xl" /></div>
        </Link>
        <div className={`${template.accent} pl-4 mb-4`}>
          <h3 className={`text-xl font-bold mb-1 ${template.textStyle}`}>{event.eventTitle}</h3>
          <p className={`mb-4 ${template.textStyle} opacity-80 h-10`}>{event.eventDescription ? event.eventDescription.substring(0, 50) + '...' : ''}</p>
        </div>
        <div className={`space-y-3 mb-6 text-sm font-medium ${template.textStyle} opacity-75`}>
          <div className="flex items-center"><Calendar size={14} className="mr-3" /><span>{event.date} {event.time ? `at ${event.time}`: ''}</span></div>
          {event.location && (<div className="flex items-center"><MapPin size={14} className="mr-3" /><span>{event.location}</span></div>)}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('upcoming');
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/events`;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        console.log("DATA RECEIVED FROM DATABASE:", data);
        setEvents(data);
        setFilteredEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.eventTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.eventDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (eventTypeFilter !== 'all') {
      filtered = filtered.filter(event => event.category === eventTypeFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (sortBy === 'upcoming') {
        return dateA - dateB;
      } else if (sortBy === 'recent') {
        return dateB - dateA;
      }
      return 0;
    });

    setFilteredEvents(filtered);
  }, [events, searchTerm, eventTypeFilter, sortBy]);

  const eventTypes = ['all', ...new Set(events.map(event => event.category).filter(Boolean))];

  if (loading) return <div className="text-center p-10 text-white">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-300">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="glass-container-secondary rounded-2xl p-8 mb-8">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-white border-opacity-20">
          <h1 className="text-4xl font-extrabold text-white tracking-tight text-center sm:text-left drop-shadow-lg">
            Events Calendar
          </h1>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
            <Link to="/calendar">
              <button className="glass-button bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-colors">
                View Calendar
              </button>
            </Link>
            <Link to="/select-template">
              <button className="glass-button bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-colors">
                Create Event
              </button>
            </Link>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full px-4 py-3 rounded-lg text-white placeholder-white placeholder-opacity-60"
            />
            <span className="absolute right-3 top-3 text-white opacity-60">
              🔍
            </span>
          </div>

          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="glass-select px-4 py-3 rounded-lg text-white"
          >
            <option value="all" className="bg-gray-800">All Event Types</option>
            {eventTypes.filter(type => type !== 'all').map(type => (
              <option key={type} value={type} className="bg-gray-800">{type}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="glass-select px-4 py-3 rounded-lg text-white"
          >
            <option value="upcoming" className="bg-gray-800">Upcoming Events</option>
            <option value="recent" className="bg-gray-800">Recent Events</option>
          </select>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="glass-container-secondary text-center py-20 rounded-2xl">
          <h2 className="text-2xl font-semibold text-white">No events found.</h2>
          <p className="text-white opacity-80 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (<EventCard key={event.eventId} event={event} />))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
