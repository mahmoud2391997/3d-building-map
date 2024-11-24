import React from 'react';
import Building from "./components/Building"
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
  import MarkerClusterGroup from "react-leaflet-cluster";
  import { Icon, divIcon, point } from "leaflet";
  import  { useEffect, useState, useRef } from "react";
  import * as THREE from "three";
  import { Canvas } from "@react-three/fiber";
  import Floor from "./components/Floor";
  
  const App = () => {
  // Custom Icon
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38], // size of the icon
  });
  
  // Custom Cluster Icon
  const createClusterCustomIcon = (cluster) => {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };
  
  // Markers data
  const markers = [
    { geocode: [48.86, 2.3522], popUp: "Hello, I am pop up 1" },
  ]
  
  // 3D Building Component (you can replace this with your own building component)
  
  
  // Custom Three.js overlay component
  const ThreeJSOverlay = ({ position }) => {
    const map = useMap(); // Access the map instance
    const containerRef = useRef(null);
    const [coordinates, setCoordinates] = useState([0, 0]);
  
    useEffect(() => {
      const updatePosition = () => {
        const point = map.latLngToContainerPoint(position); // Get pixel position
        setCoordinates([point.x, point.y]);
      };
  
      // Update position on map move or zoom
      map.on('moveend', updatePosition);
      updatePosition(); // Initial position set
  
      // Cleanup the event listener
      return () => {
        map.off('moveend', updatePosition);
      };
    }, [map, position]);
  
    return (
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          left: `${coordinates[0]}px`,
          top: `${coordinates[1]}px`,
          transform: "translate(-50%, -50%)", // Center the building
          zIndex: 1000, // Ensure the 3D object is rendered above the map
  
        }}
  
      >
       <Canvas
       style={{
        height: "120px",
        width: "120px",
      }}
  
       >
    {/* Ambient and Point Lights */}
    <ambientLight intensity={0.3} />
    <pointLight position={[10, 10, 10]} />
    
    {/* Floors */}
    <Floor position={[0, 0, 0]} floorNumber={1} withRooms={true} />
    <Floor position={[0, 2.1, 0]} floorNumber={2} withRooms={true} />
    <Floor position={[0, 4.2, 0]} floorNumber={3} withRooms={true} />
    <Floor position={[0, 6.3, 0]} floorNumber={4} />
  
    {/* Camera Setup */}
  
  </Canvas>
  
      </div>
    );
  };
  

  return <div className='flex'>
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "100vh", width:"50vw", zIndex: 0 }}>
      {/* Tile Layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Clustered Markers */}
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {markers.map((marker, index) => (
          <Marker position={marker.geocode} icon={customIcon} key={index}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* ThreeJS Overlays for 3D buildings */}
      {markers.map((marker, index) => (
        <ThreeJSOverlay key={index} position={marker.geocode} />
      ))}
    </MapContainer>
   <Building />
  </div>

};

export default App;
