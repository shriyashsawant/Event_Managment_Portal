// src/mockData.js
export const mockEvents = [
  {
    eventId: "1",
    templateId: "professional-conference",
    eventTitle: "Global Tech Summit 2025",
    date: "2025-10-20",
    location: "San Francisco, USA",
    bannerImageUrl: "https://via.placeholder.com/1200x400.png?text=Tech+Summit+Banner",
    description: "An annual conference bringing together the brightest minds in technology, innovation, and leadership.",
    speakers: [
      { name: "Jane Doe", designation: "CEO, Innovate Corp", photoUrl: "https://via.placeholder.com/150" },
      { name: "John Smith", designation: "Lead Engineer, Future Systems", photoUrl: "https://via.placeholder.com/150" },
      { name: "Carlos Mendes", designation: "CTO, AI Labs", photoUrl: "https://via.placeholder.com/150" }
    ],
    agenda: [
      { time: "09:00 AM", session: "Opening Keynote", speaker: "Jane Doe" },
      { time: "11:00 AM", session: "Future of AI", speaker: "Carlos Mendes" },
      { time: "02:00 PM", session: "Scaling Cloud Systems", speaker: "John Smith" }
    ],
    partners: [
      { name: "TechWorld Inc.", logoUrl: "https://via.placeholder.com/100x50.png?text=TechWorld" },
      { name: "Global IT", logoUrl: "https://via.placeholder.com/100x50.png?text=Global+IT" }
    ],
    registrationLink: "https://example.com/register/tech-summit"
  },
  {
    eventId: "2",
    templateId: "creative-expo",
    eventTitle: "Art & Design Festival",
    date: "2025-11-15",
    location: "Paris, France",
    bannerImageUrl: "https://via.placeholder.com/1200x400.png?text=Art+Festival+Banner",
    description: "A celebration of modern art, creative expression, and digital design innovations.",
    speakers: [
       { name: "Emily White", designation: "Contemporary Artist", photoUrl: "https://via.placeholder.com/150" },
       { name: "Raj Malhotra", designation: "Graphic Designer", photoUrl: "https://via.placeholder.com/150" }
    ],
    agenda: [
      { time: "10:00 AM", session: "Opening Ceremony", speaker: "Emily White" },
      { time: "01:00 PM", session: "Design Thinking Workshop", speaker: "Raj Malhotra" }
    ],
    partners: [
      { name: "Creative Hub", logoUrl: "https://via.placeholder.com/100x50.png?text=Creative+Hub" }
    ],
    registrationLink: "https://example.com/register/art-festival"
  },
  {
    eventId: "3",
    templateId: "professional-conference",
    eventTitle: "Healthcare Innovation Summit",
    date: "2025-12-05",
    location: "London, UK",
    bannerImageUrl: "https://via.placeholder.com/1200x400.png?text=Healthcare+Summit",
    description: "Exploring the intersection of healthcare, AI, and biotechnology for a healthier tomorrow.",
    speakers: [
      { name: "Dr. Anna Lopez", designation: "Head of Research, BioTech Ltd.", photoUrl: "https://via.placeholder.com/150" },
      { name: "Michael Green", designation: "Healthcare Data Analyst", photoUrl: "https://via.placeholder.com/150" }
    ],
    agenda: [
      { time: "09:30 AM", session: "AI in Medicine", speaker: "Dr. Anna Lopez" },
      { time: "01:00 PM", session: "Future of Telehealth", speaker: "Michael Green" }
    ],
    partners: [
      { name: "MediCare", logoUrl: "https://via.placeholder.com/100x50.png?text=MediCare" }
    ],
    registrationLink: "https://example.com/register/healthcare-summit"
  }
];
