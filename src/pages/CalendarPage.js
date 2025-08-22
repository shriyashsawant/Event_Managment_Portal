// src/pages/CalendarPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LiquidBackground from '../components/LiquidBackground';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/events`;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16 border border-white/20 calendar-day glass-day-empty bg-black/20 backdrop-blur-sm"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = getEventsForDate(date);
      const hasEvents = dayEvents.length > 0;
      const isToday = new Date().toDateString() === date.toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`h-16 border border-white/20 p-1 relative group calendar-day glass-day bg-black/30 backdrop-blur-sm ${
            hasEvents ? 'has-events glass-day-events' : 'glass-day-normal'
          } ${isToday ? 'glass-day-today bg-blue-900/40' : ''}`}
        >
          <div className={`text-sm font-medium ${
            hasEvents ? 'text-white drop-shadow-md' : 
            isToday ? 'text-blue-300 font-bold drop-shadow-md' : 
            'text-white/90'
          }`}>{day}</div>
          {hasEvents && (
            <div className="absolute bottom-1 left-1 right-1">
              {dayEvents.slice(0, 2).map((event, index) => (
                <div
                  key={index}
                  className="text-xs bg-white/40 text-white px-1 py-0.5 rounded mb-0.5 truncate backdrop-blur-sm border border-white/30"
                  title={event.eventTitle}
                >
                  {event.eventTitle}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-white/80 drop-shadow-sm">+{dayEvents.length - 2} more</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (loading) return <div className="text-center p-10 text-white">Loading calendar...</div>;

  return (
    <div className="min-h-screen relative">
      <LiquidBackground />
      
      <div className="relative z-10">

        <div className="flex justify-center mb-12">
          <div className="glass-container-darker rounded-2xl p-6 w-full max-w-4xl">
            <div className="flex items-center justify-center mb-6 relative">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors absolute left-0 text-white"
              >
                <ChevronLeft size={24} />
              </button>
              
              <h2 className="text-4xl font-bold text-white text-center drop-shadow-lg">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors absolute right-0 text-white"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-white py-2 drop-shadow-sm">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="glass-container-secondary rounded-2xl p-8 max-w-2xl mx-auto">
            <blockquote className="text-2xl font-light text-white italic mb-4 drop-shadow-md">
              "The best way to predict the future is to create it."
            </blockquote>
            <p className="text-white font-medium drop-shadow-sm">- Peter Drucker</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="glass-container-primary rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">{events.length}</div>
            <div className="text-white font-medium drop-shadow-sm">Total Events</div>
          </div>
          <div className="glass-container-secondary rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">
              {new Set(events.map(event => event.category)).size}
            </div>
            <div className="text-white font-medium drop-shadow-sm">Event Categories</div>
          </div>
          <div className="glass-container-primary rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2 drop-shadow-md">
              {events.filter(event => new Date(event.date) >= new Date()).length}
            </div>
            <div className="text-white font-medium drop-shadow-sm">Upcoming Events</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
