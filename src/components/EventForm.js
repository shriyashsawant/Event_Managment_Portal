// src/components/EventForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Edit3, Calendar, Users, Camera, List, Star, Film, MessageSquare } from 'lucide-react';

const inputStyle = "w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow";
const fileInputStyle = `${inputStyle} file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100`;
const labelStyle = "block text-sm font-medium text-gray-700";
const subLabelStyle = "text-sm font-medium text-gray-600";
const addButtonStyle = "mt-4 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors";
const removeButtonStyle = "bg-red-500 text-white rounded-md px-3 py-2 font-semibold hover:bg-red-600 transition-colors";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


const EventForm = ({ existingEvent, templateId }) => {
  console.log("CHECK #2: EventForm component received prop templateId:", templateId);
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    eventTitle: '', date: '', time: '', location: '', category: 'Conference', bannerImage: null,
    eventDescription: '', purpose: '', price: '',
    speakers: [{ name: '', designation: '', photo: null }],
    agenda: [{ time: '', title: '' }],
    partners: [null], videos: [''],
    organizerName: '', email: '', whatsappNumber: '', messageText: 'I am interested in this event!',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingEvent) {
      setFormData(currentState => ({
        ...currentState,
        ...existingEvent,
        speakers: existingEvent.speakers?.length ? existingEvent.speakers : [{ name: '', designation: '', photo: null }],
        agenda: existingEvent.agenda?.length ? existingEvent.agenda : [{ time: '', title: '' }],
        partners: existingEvent.partners?.length ? existingEvent.partners : [null],
        videos: existingEvent.videos?.length ? existingEvent.videos : [''],
      }));
    }
  }, [existingEvent]);

  const handleChange = (e) => { const { name, value, type, files } = e.target; if (type === 'file') { setFormData(prevState => ({ ...prevState, [name]: files[0] })); } else { setFormData(prevState => ({ ...prevState, [name]: value })); } };
  const handleSpeakerChange = (index, e) => { const { name, value, type, files } = e.target; const newSpeakers = [...formData.speakers]; if (type === 'file') { newSpeakers[index][name] = files[0]; } else { newSpeakers[index][name] = value; } setFormData(prevState => ({ ...prevState, speakers: newSpeakers })); };
  const addSpeaker = () => { if (formData.speakers.length < 4) { setFormData(prevState => ({ ...prevState, speakers: [...prevState.speakers, { name: '', designation: '', photo: null }] })); } };
  const removeSpeaker = (index) => { if (formData.speakers.length > 1) { const newSpeakers = formData.speakers.filter((_, i) => i !== index); setFormData(prevState => ({ ...prevState, speakers: newSpeakers })); } };
  const handleAgendaChange = (index, e) => { const { name, value } = e.target; const newAgenda = [...formData.agenda]; newAgenda[index][name] = value; setFormData(prevState => ({ ...prevState, agenda: newAgenda })); };
  const addAgendaItem = () => { setFormData(prevState => ({ ...prevState, agenda: [...prevState.agenda, { time: '', title: '' }] })); };
  const removeAgendaItem = (index) => { if (formData.agenda.length > 1) { const newAgenda = formData.agenda.filter((_, i) => i !== index); setFormData(prevState => ({ ...prevState, agenda: newAgenda })); } };
  const handlePartnerChange = (index, e) => { const newPartners = [...formData.partners]; newPartners[index] = e.target.files[0]; setFormData(prevState => ({ ...prevState, partners: newPartners })); };
  const addPartner = () => { if (formData.partners.length < 5) { setFormData(prevState => ({ ...prevState, partners: [...prevState.partners, null] })); } };
  const removePartner = (index) => { if (formData.partners.length > 1) { const newPartners = formData.partners.filter((_, i) => i !== index); setFormData(prevState => ({ ...prevState, partners: newPartners })); } };
  const handleVideoChange = (index, e) => { const newVideos = [...formData.videos]; newVideos[index] = e.target.value; setFormData(prevState => ({ ...prevState, videos: newVideos })); };
  const addVideo = () => { if (formData.videos.length < 3) { setFormData(prevState => ({ ...prevState, videos: [...prevState.videos, ''] })); } };
  const removeVideo = (index) => { if (formData.videos.length > 1) { const newVideos = formData.videos.filter((_, i) => i !== index); setFormData(prevState => ({ ...prevState, videos: newVideos })); } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (existingEvent) {
      try {
        const updateUrl = `${apiBaseUrl}/events/${id}`; 
        await fetch(updateUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        alert('Event updated successfully!');
        window.location.href = `/event/${id}`; 
      } catch (error) {
        console.error("Update error:", error);
        alert('Failed to update event.');
      } finally {
        setIsSubmitting(false);
      }
    }else {
    
      const uploadFile = async (file) => {
        if (!file || typeof file === 'string') return file;
        const presignedUrlResponse = await fetch(`${apiBaseUrl}/presigned-url`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fileName: file.name, contentType: file.type }) });
        const { uploadUrl, fileUrl } = await presignedUrlResponse.json();
        await fetch(uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
        return fileUrl;
      };
      try {
        const bannerImageUrl = await uploadFile(formData.bannerImage);
        const partnerUrls = await Promise.all(formData.partners.map(uploadFile));
        const speakerPhotoUrls = await Promise.all(formData.speakers.map(s => uploadFile(s.photo)));

        
        const finalData = { 
            ...formData, 
            templateId, 
            bannerImageUrl, 
            partners: partnerUrls.filter(url => url), 
            speakers: formData.speakers.map((s, i) => ({ 
                name: s.name, 
                designation: s.designation, 
                photoUrl: speakerPhotoUrls[i] 
            })) 
        };

        console.log("CHECK #3: Final data object being sent to backend:", finalData);

        delete finalData.bannerImage;
        await fetch(`${apiBaseUrl}/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalData) });
        alert('Event created successfully!');
        window.location.href = '/';
      } catch (error) { 
        console.error('Create error:', error); 
        alert('Error creating event.'); 
      } finally { 
        setIsSubmitting(false); 
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><Edit3 size={20} className="mr-2 text-indigo-500" />Basic Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div><label htmlFor="eventTitle" className={labelStyle}>Event Title *</label><input type="text" id="eventTitle" name="eventTitle" value={formData.eventTitle} onChange={handleChange} required className={inputStyle} placeholder="Your Event Name" /></div>
          <div><label htmlFor="category" className={labelStyle}>Category *</label><select id="category" name="category" value={formData.category} onChange={handleChange} className={inputStyle}><option>Conference</option><option>Workshop</option><option>Networking</option><option>Webinar</option><option>Social Event</option></select></div>
        </div>
        <div className="mt-6"><label htmlFor="eventDescription" className={labelStyle}>Event Description *</label><textarea id="eventDescription" name="eventDescription" value={formData.eventDescription} onChange={handleChange} required rows="4" className={inputStyle} placeholder="Describe what your event is about..." /></div>
        <div className="mt-6"><label htmlFor="purpose" className={labelStyle}>Purpose of the Event</label><textarea id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} required rows="3" className={inputStyle} /></div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><Calendar size={20} className="mr-2 text-indigo-500" />Date & Location</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div><label htmlFor="date" className={labelStyle}>Date *</label><input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className={inputStyle} /></div>
          <div><label htmlFor="time" className={labelStyle}>Time *</label><input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required className={inputStyle} /></div>
        </div>
        <div className="mt-6"><label htmlFor="location" className={labelStyle}>Location / Venue *</label><input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required className={inputStyle} placeholder="e.g., Grand Ballroom or Online" /></div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><Camera size={20} className="mr-2 text-indigo-500" />Additional Details</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div><label htmlFor="price" className={labelStyle}>Price (USD)</label><input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className={inputStyle} placeholder="Leave empty for free" /></div>
          <div><label htmlFor="bannerImage" className={labelStyle}>Banner Image</label><input type="file" id="bannerImage" name="bannerImage" onChange={handleChange} accept="image/*" className={fileInputStyle}/></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><Users size={20} className="mr-2 text-indigo-500" />Speakers</h3>
        <div className="space-y-4">{formData.speakers.map((s, i) => (<div key={i} className="bg-gray-50 p-4 rounded-lg border space-y-3 relative"><h4 className="font-bold text-gray-600">Speaker {i + 1}</h4><div><label className={subLabelStyle}>Name</label><input type="text" name="name" value={s.name} onChange={(e)=>handleSpeakerChange(i, e)} required className={inputStyle}/></div><div><label className={subLabelStyle}>Designation</label><input type="text" name="designation" value={s.designation} onChange={(e)=>handleSpeakerChange(i, e)} required className={inputStyle}/></div><div><label className={subLabelStyle}>Photo</label><input type="file" name="photo" onChange={(e)=>handleSpeakerChange(i, e)} accept="image/*" className={fileInputStyle}/></div>{formData.speakers.length > 1 && (<button type="button" onClick={()=>removeSpeaker(i)} className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full h-7 w-7 flex items-center justify-center font-bold hover:bg-red-200">&times;</button>)}</div>))}</div>
        {formData.speakers.length < 4 && (<button type="button" onClick={addSpeaker} className={addButtonStyle}>+ Add Speaker</button>)}
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><List size={20} className="mr-2 text-indigo-500" />Agenda</h3>
        <div className="space-y-4">{formData.agenda.map((item, i) => (<div key={i} className="bg-gray-50 p-4 rounded-lg border flex items-end gap-4"><div className="flex-1"><label className={subLabelStyle}>Time</label><input type="text" name="time" placeholder="e.g., 9:00 AM" value={item.time} onChange={(e)=>handleAgendaChange(i, e)} required className={inputStyle}/></div><div className="flex-auto w-64"><label className={subLabelStyle}>Title</label><input type="text" name="title" placeholder="e.g., Keynote Speech" value={item.title} onChange={(e)=>handleAgendaChange(i, e)} required className={inputStyle}/></div>{formData.agenda.length > 1 && (<button type="button" onClick={()=>removeAgendaItem(i)} className={removeButtonStyle}>Remove</button>)}</div>))}</div>
        <button type="button" onClick={addAgendaItem} className={addButtonStyle}>+ Add Agenda Item</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><Star size={20} className="mr-2 text-indigo-500" />Partners</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{formData.partners.map((p, i) => (<div key={i}><label className={`${labelStyle} text-sm mb-1`}>Partner {i + 1} Logo</label><input type="file" onChange={(e)=>handlePartnerChange(i, e)} accept="image/*" className={fileInputStyle} /></div>))}</div>
        {formData.partners.length < 5 && <button type="button" onClick={addPartner} className={addButtonStyle}>+ Add Partner</button>}
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><Film size={20} className="mr-2 text-indigo-500" />Videos</h3>
        <div className="space-y-2">{formData.videos.map((v, i) => (<div key={i}><label className={`${labelStyle} text-sm mb-1`}>Video {i + 1} URL</label><input type="url" placeholder="https://www.youtube.com/embed/..." value={v} onChange={(e)=>handleVideoChange(i, e)} className={inputStyle}/></div>))}</div>
        {formData.videos.length < 3 && <button type="button" onClick={addVideo} className={addButtonStyle}>+ Add Video</button>}
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><MessageSquare size={20} className="mr-2 text-indigo-500" />Contact Details</h3>
        <div><label className={labelStyle}>Organizer Name</label><input type="text" name="organizerName" value={formData.organizerName} onChange={handleChange} required className={inputStyle}/></div>
        <div><label className={labelStyle}>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle}/></div>
        <div><label className={labelStyle}>WhatsApp Number</label><input type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} required className={inputStyle}/></div>
        <div><label className={labelStyle}>Message Text</label><textarea name="messageText" value={formData.messageText} onChange={handleChange} className={inputStyle}/></div>
      </div>
      
      <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xl disabled:bg-gray-400 disabled:cursor-not-allowed">
        {isSubmitting ? 'Saving...' : (existingEvent ? 'Save Changes' : 'Create Event')}
      </button>
    </form>
  );
};

export default EventForm;