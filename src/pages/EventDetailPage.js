// src/pages/EventDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { templates } from '../templates';
import { Users, Mail, Phone, Calendar, Clock, MapPin, Youtube } from 'lucide-react';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventById = async () => {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/events/${id}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Event not found (Status: ${response.status})`);
        setEvent(await response.json());
      } catch (err) { setError(err.message); } finally { setLoading(false); }
    };
    if (id) fetchEventById();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/events/${id}`;
        const response = await fetch(apiUrl, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete the event.');
        alert('Event deleted successfully!');
        navigate('/');
      } catch (err) { 
        alert(err.message); 
      }
    }
  };

  const handleRegister = () => {
    if (event.whatsappNumber) {
      const message = encodeURIComponent(event.messageText || 'I am interested in this event!');
      window.open(`https://wa.me/${event.whatsappNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
    } else {
      alert('Contact information not available for registration.');
    }
  };

  if (loading) return <div className="text-center p-10 font-semibold">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  if (!event) return <div className="text-center p-10">Event not found.</div>;

  const template = templates[event.templateId] || templates.classic;
  const formatWhatsAppLink = (number) => `https://wa.me/${('' + number).replace(/\D/g, '')}`;
  const bannerImage = event.bannerImageUrl || `https://placehold.co/1200x400/eeeeee/cccccc?text=${encodeURIComponent(event.eventTitle)}`;
  
  const extractYouTubeId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const formatWhatsAppNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 7)} ${cleaned.substring(7)}`;
    }
    return cleaned;
  };

  return (
    <div className={`min-h-screen ${template.mainBg || 'bg-gray-100'}`}>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center">
            &larr; Back to All Events
          </Link>
          <div className="flex space-x-3">
            <Link to={`/event/${id}/edit`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors">
                Edit Event
              </button>
            </Link>
            <button 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors"
            >
              Delete Event
            </button>
          </div>
        </header>

        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={bannerImage} 
            alt={event.eventTitle}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <span className={`px-4 py-2 text-sm font-semibold rounded-full mb-4 inline-block ${template.tagStyle}`}>
                {event.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                {event.eventTitle}
              </h1>
              <button
                onClick={handleRegister}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>

        <main className={`${template.cardStyle} rounded-2xl shadow-2xl overflow-hidden`}>
          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <div className={`${template.accent} pl-6`}>
                <h2 className={`text-3xl font-bold mb-4 ${template.textStyle}`}>About</h2>
                <p className={`text-lg ${template.textStyle} opacity-80 leading-relaxed`}>
                  {event.eventDescription}
                </p>
              </div>
              
              {event.agenda && event.agenda.length > 0 && (
                <div className="border-t border-white/10 pt-8">
                  <h2 className={`${template.accent} pl-6 text-3xl font-bold mb-6 ${template.textStyle}`}>
                    Event Agenda
                  </h2>
                  <div className="space-y-4">
                    {event.agenda.map((item, i) => (
                      <div key={i} className="flex items-start p-4 bg-white/5 rounded-lg">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${template.iconBg}`}>
                          <span className={`font-bold ${template.textStyle}`}>{i + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${template.textStyle}`}>{item.time}</h4>
                          <p className={`${template.textStyle} opacity-80`}>{item.title}</p>
                          {item.speaker && (
                            <p className={`text-sm ${template.textStyle} opacity-60`}>Speaker: {item.speaker}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.speakers && event.speakers.length > 0 && (
                <div className="border-t border-white/10 pt-8">
                  <h2 className={`${template.accent} pl-6 text-3xl font-bold mb-6 ${template.textStyle}`}>
                    Speakers
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {event.speakers.map((s, i) => (
                      <div key={i} className="text-center">
                        <img 
                          src={s.photoUrl} 
                          alt={s.name} 
                          className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg mb-2 border-2 border-indigo-500" 
                        />
                        <h4 className={`font-bold ${template.textStyle}`}>{s.name}</h4>
                        <p className={`text-sm opacity-80 ${template.textStyle}`}>{s.designation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.youtubeUrl && (
                <div className="border-t border-white/10 pt-8">
                  <h2 className={`${template.accent} pl-6 text-3xl font-bold mb-6 ${template.textStyle}`}>
                    Event Video
                  </h2>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(event.youtubeUrl)}`}
                      title="Event Video"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex items-center mt-4 text-blue-400">
                    <Youtube size={20} className="mr-2" />
                    <span className={template.textStyle}>Watch on YouTube</span>
                  </div>
                </div>
              )}

            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <div className={`p-6 rounded-lg border border-white/10 ${template.iconBg}`}>
                <h2 className={`text-2xl font-bold mb-4 ${template.textStyle}`}>Event Details</h2>
                <div className="space-y-4 text-lg">
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-3 text-indigo-400"/>
                    <span className={template.textStyle}>
                      {new Date(event.date).toLocaleDateString('en-US', {dateStyle: 'full'})}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={20} className="mr-3 text-indigo-400"/>
                    <span className={template.textStyle}>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={20} className="mr-3 text-indigo-400"/>
                    <span className={template.textStyle}>{event.location}</span>
                  </div>
                  {event.price && (
                    <div className="flex items-center">
                      <span className="mr-3 text-green-400 font-bold text-xl">$</span>
                      <span className={`font-semibold ${template.textStyle}`}>
                        {event.price} per ticket
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={`p-6 rounded-lg border border-white/10 ${template.iconBg}`}>
                <h2 className={`text-2xl font-bold mb-4 ${template.textStyle}`}>Organizer</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Users size={18} className="mr-3"/>
                    <span className={template.textStyle}>{event.organizerName}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={18} className="mr-3"/>
                    <a href={`mailto:${event.email}`} className={`hover:underline break-all ${template.textStyle}`}>
                      {event.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone size={18} className="mr-3"/>
                    <a href={formatWhatsAppLink(event.whatsappNumber)} className={`hover:underline ${template.textStyle}`}>
                      {formatWhatsAppNumber(event.whatsappNumber)}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {event.partners && event.partners.length > 0 && (
          <div className={`${template.cardStyle} rounded-2xl shadow-2xl overflow-hidden mt-8`}>
            <div className="p-6 md:p-10 text-center">
              <h2 className={`text-3xl font-bold mb-8 ${template.textStyle}`}>
                Our Partners
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center">
                {event.partners.map((partner, i) => (
                  <div key={i} className="text-center p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <img 
                      src={partner.logoUrl} 
                      alt={partner.name}
                      className="w-24 h-24 object-contain mx-auto mb-3"
                    />
                    <h4 className={`font-semibold ${template.textStyle}`}>{partner.name}</h4>
                    {partner.website && (
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`text-sm text-blue-400 hover:underline ${template.textStyle}`}
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;