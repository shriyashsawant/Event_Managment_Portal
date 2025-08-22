# Event Portal 🎉

A modern, responsive event management platform built with React and Tailwind CSS. Create, manage, and discover events with beautiful templates and seamless user experience.

## 🌐 Live Demo
Check out the live application: [https://event-managment-portal.vercel.app/](https://event-managment-portal.vercel.app/)

![Event Portal](screenshots/Screenshot%202025-08-22%20233652.png)

## 🎥 Demo Video

A video demonstration of the Event Portal is available to showcase the application's features and functionality:

📹 **Watch the Working Demo**: [Google Drive Video Link](https://drive.google.com/file/d/1g2yVsRiiWYS14fc9WLuy6IuCCJA3TiLP/view?usp=sharing)

## ✨ Features

- **Event Creation**: Create events with customizable templates
- **Template System**: 8+ beautiful templates (Classic, Neon, Nature, Retro, etc.)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Search & Filter**: Find events by type, date, or keywords
- **Calendar View**: Visual calendar interface for event browsing
- **AWS Integration**: Backend powered by AWS API Gateway and Lambda
- **Modern UI**: Glassmorphism design with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/event-portal.git
   cd event-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your actual API endpoints and configuration

4. **Start development server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── EventForm.js    # Event creation/editing form
│   ├── GlassContainer.js
│   └── LiquidBackground.js
├── pages/              # Page components
│   ├── HomePage.js
│   ├── CalendarPage.js
│   ├── CreateEventPage.js
│   ├── EditEventPage.js
│   ├── EventDetailPage.js
│   └── TemplateSelectionPage.js
├── templates.js        # Event template definitions
├── mockData.js         # Sample event data
└── App.js              # Main app component
```

## 🎨 Templates

The app includes 8 beautifully designed templates:

- **Classic Elegance** - Timeless, sophisticated design
- **Neon Cyber** - Futuristic cyberpunk aesthetic  
- **Organic Nature** - Earth-inspired natural tones
- **Retro Wave** - 80s synthwave vibes
- **Pure Minimal** - Clean, minimal design
- **Cosmic Galaxy** - Space-themed stellar gradients
- **Golden Sunset** - Warm sunset colors
- **Arctic Ice** - Cool, icy crystalline effects

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is irreversible!** Ejects from Create React App

## 🌐 API Integration

The app connects to an AWS backend with the following endpoints:

- `GET /events` - Fetch all events
- `POST /events` - Create new event
- `PUT /events/:id` - Update event
- `POST /presigned-url` - Get S3 upload URLs

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS, Custom CSS
- **Icons**: Lucide React
- **Backend**: AWS Amplify, API Gateway, Lambda
- **Storage**: AWS S3 for file uploads
- **Build Tool**: Create React App

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Create React App for the excellent starter template
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- AWS for the backend infrastructure
