# AdminDashboard

A modern React-based admin dashboard built with Vite, featuring 3D elements, animations, and a responsive design.

## Features

- 🎭 **Framer Motion Animations** - Smooth, professional animations throughout
- 🎨 **3D Elements** - Interactive 3D cubes and scenes using Three.js
- 📱 **Fully Responsive** - Looks great on all devices
- 🌈 **Modern Design** - Glassmorphism effects and gradient backgrounds
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 🎯 **SEO Optimized** - Meta tags and structured data ready
- 🛠️ **Easy Customization** - Component-based architecture for easy modification

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D graphics
- **React Three Fiber** - React Three.js integration
- **React Helmet** - SEO management

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
