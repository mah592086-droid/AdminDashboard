# SocialPulse - Social Media Analytics Dashboard

A comprehensive social media analytics dashboard for managing posts, comments, moderation, and real-time engagement metrics. Built with React 19 and featuring advanced animations, interactive charts, and a modern glassmorphic design.

## Features

- 📊 **Social Media Analytics** - Real-time metrics for DAU, impressions, engagement, and follower growth
- 📱 **Feed Management** - Create, view, like, comment, and delete posts from all users
- 🛡️ **Content Moderation** - Review and manage reported content with severity-based filtering
- 📈 **Advanced Charts** - Interactive area charts, donut charts, and heatmaps using ECharts
- 💬 **Comment System** - Threaded comments with full moderation capabilities
- 🎨 **Modern UI/UX** - Glassmorphic design with gradient accents and smooth animations
- 🌓 **Dark Mode** - Seamless theme switching with persistent preferences
- ⚡ **Performance Optimized** - Built with Vite and React 19 for lightning-fast performance
- 📱 **Fully Responsive** - Mobile-first design that works beautifully on all devices
- 🎭 **Framer Motion** - Advanced animations and micro-interactions throughout

## Tech Stack

- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Advanced animations and transitions
- **ECharts** - Interactive data visualization (area, donut, heatmap charts)
- **React Router DOM** - Client-side routing with nested routes
- **Zustand** - Lightweight state management
- **Lucide React** - Modern icon library
- **Heroicons** - Beautiful SVG icons
- **Headless UI** - Accessible component primitives

## Getting Started

### Prerequisites

Make sure you have Node.js v22.18.0 installed. You can use nvm to manage Node versions:

```bash
nvm use v22.18.0
```

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Hero.jsx        # Main hero section
│   ├── Navigation.jsx  # Navigation bar
│   ├── AboutMe.jsx     # About section
│   ├── Projects.jsx    # Projects showcase
│   ├── Contact.jsx     # Contact form
│   ├── Footer.jsx      # Footer component
│   └── ...
├── pages/
│   └── HomePage.jsx    # Main page component
├── assets/             # Images and static assets
└── main.jsx           # App entry point
```

## Development

This project uses:
- ESLint for code linting
- Tailwind CSS for styling
- Framer Motion for animations
- Three.js for 3D elements

## License

This project is free to use for personal and commercial projects.
