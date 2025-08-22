// src/pages/TemplateSelectionPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from '../templates';
import { Calendar } from 'lucide-react';

const TemplateSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate('/create', { state: { templateId: selectedTemplate } });
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl w-full">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center"
          >
            &larr; Back to Events Calendar
          </button>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Choose Your Event Template
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select a stunning design template that perfectly captures your event's unique personality and style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(templates).map((template) => (
            <div
              key={template.id}
              className={`cursor-pointer rounded-2xl bg-white shadow-lg border-4 transition-all duration-300 ${
                selectedTemplate === template.id 
                  ? 'border-indigo-500 scale-105 shadow-2xl' 
                  : 'border-white hover:border-gray-200'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className={`h-56 rounded-t-xl ${template.preview} flex items-center justify-center p-4`}>
                <div className={`w-full h-full rounded-md ${template.previewCard} p-3 flex flex-col justify-between`}>
                  <h3 className="font-bold text-sm">Sample Event</h3>
                  <div className="space-y-1">
                    <div className={`w-3/4 h-2 rounded-full ${template.previewAccent} opacity-50`}></div>
                    <div className={`w-1/2 h-2 rounded-full ${template.previewAccent} opacity-30`}></div>
                  </div>
                  <div className="flex items-center space-x-1 opacity-60">
                    <Calendar size={12} />
                    <span className="text-xs">Dec 25, 2024</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-1 h-12">{template.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {template.tags.map((tag, index) => (
                    <span key={index} className={`px-2 py-1 text-xs font-semibold rounded-full ${index === 0 ? template.tagStyle : template.tagStyle2}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedTemplate && (
          <div className="mt-12 text-center">
            <button
              onClick={handleContinue}
              className="bg-indigo-600 text-white px-10 py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              Continue with {templates[selectedTemplate].name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelectionPage;