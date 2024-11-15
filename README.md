# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

3D Interactive Building with Map Integration
This document provides a detailed guide to set up, use, and customize a 3D interactive building model integrated with a map built using Kepler.gl and OpenStreetMap data.

Overview
This project combines Three.js and Kepler.gl to create an interactive 3D building model placed on a geospatial map. The system allows users to interact with floors, rooms, and lighting while navigating through the building’s geospatial location on a map.

Features
3D Building Model
Three Floors:

Each floor can change color upon interaction.
Floors are stacked with realistic proportions and animations.
Rooms:

Rooms feature toggleable lights.
Light colors can be customized through interaction.
Animations:

Smooth transitions for camera movements and user interactions.
Interactive elements such as doors and lights respond to user proximity.
Map Integration
Interactive Map:
Panning and zooming capabilities for geospatial navigation.
A marker indicates the building’s geolocation on the map.
Geospatial Layers:
Display building location
Base map rendered using OpenStreetMap data.
Setup
System Requirements
Node.js: Version 18 or higher.
Mapbox API Key: Required for map rendering with Kepler.gl.
Web Browser: Must support WebGL (e.g., Chrome, Firefox).
