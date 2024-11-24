// components/BuildingLayer.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { useMap } from 'react-map-gl';
import Building from '../components/Building'; // Your building component

const BuildingLayer = () => {
  const dispatch = useDispatch();
  const [mapInstance, setMapInstance] = useState(null);
  const [mapContainer, setMapContainer] = useState(null);
  
  // Get the building layers from the Redux store
  const buildingLayers = useSelector(state => state.customLayers.layers);

  const mapRef = useMap();

  useEffect(() => {
    if (!mapRef.current || !mapContainer || buildingLayers.length === 0) return;

    const map = mapRef.current.getMap();
    setMapInstance(map);

    buildingLayers.forEach((layer) => {
      // Convert lngLat to screen coordinates for each building
      const point = map.project(layer.lngLat);

      const style = {
        position: 'absolute',
        left: `${point.x}px`,
        top: `${point.y}px`,
        transform: 'translate(-50%, -50%)', // Center the building
      };

      // Render each building using React Portal
      ReactDOM.createPortal(
        <div style={style}>
          <Building /> {/* Your building component */}
        </div>,
        mapContainer
      );
    });

    // Cleanup: Remove layers when component unmounts
    return () => {
      // You can dispatch actions to clean up layers if needed
    };
  }, [mapRef, mapContainer, buildingLayers]);

  return (
    <div ref={setMapContainer} style={{ position: 'relative', width: '100%', height: '100%' }} />
  );
};

export default BuildingLayer;
