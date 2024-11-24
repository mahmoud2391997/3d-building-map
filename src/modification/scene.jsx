import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from '@mapbox/threebox';
import * as THREE from 'three';
import Building from '../src/components/Building'; // Your JSX building component

const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_API_KEY;

const MapWithBuilding = () => {
  const buildingLocation = [-74.006, 40.7128]; // Longitude, Latitude

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Initialize Mapbox map
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: buildingLocation,
      zoom: 16,
    });

    map.on('style.load', () => {
      // Initialize Threebox
      const tb = new Threebox(map, map.getCanvas(), { defaultLights: true });

      // Create the building as a Three.js group
      const buildingGroup = new THREE.Group();

      // Use the Building component and add it to the group
      const building = <Building/>;
      ReactDOM.render(building, buildingGroup); // Render JSX to the group

      // Position the building on the map
      const worldCoords = tb.projectToWorld(buildingLocation);
      buildingGroup.position.copy(worldCoords);

      tb.add(buildingGroup); // Add to Threebox
      tb.update();
    });

    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default MapWithBuilding;
