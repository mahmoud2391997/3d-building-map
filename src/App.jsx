import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { Canvas } from "@react-three/fiber";
import Floor from "./components/Floor";
import { Box, OrbitControls } from "@react-three/drei";
import CameraController from "./components/cameraController";
const latLngTo3D = (lat, lng, map) => {
  const point = map.latLngToContainerPoint([lat, lng]); // Convert to pixel
  // Convert to 3D space (scale the coordinates appropriately)
  const x = point.x / 10;
  const z = point.y / 10;
  return [x, 0, z]; // Y position can be set as needed (e.g., building height)
};

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
const markers = [{ geocode: [48.86, 2.3522], popUp: "Hello, I am pop up 1" }];
const Building = ({ position }) => {
  const [buildingPosition, setBuildingPosition] = useState([0, 0, 0]);

  const map = useMap();

  useEffect(() => {
    // Update position based on map's position and zoom level
    const updatePosition = () => {
      const [x, y, z] = latLngTo3D(position[0], position[1], map);
      setBuildingPosition([x, y, z]);
    };

    updatePosition(); // Set initial position

    // Listen for map moves and zooms
    map.on("moveend", updatePosition);
    map.on("zoomend", updatePosition);

    return () => {
      map.off("moveend", updatePosition);
      map.off("zoomend", updatePosition);
    };
  }, [map, position]);
  console.log(buildingPosition);

  return (
    <Canvas
      camera={{ position: [10, 100, 50], fov: 10 }}
      style={{
        height: "120px",
        width: "120px",
        position: "absolute",
        right: "1%",
      }}
      className="h-screen absolute"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      {/* Floors with walls */}
      <Floor position={[0, 0, 0]} floorNumber={1} withRooms={true} />
      <Floor position={[0, 2.1, 0]} floorNumber={2} withRooms={true} />{" "}
      {/* Adjust height as needed */}
      <Floor position={[0, 4.2, 0]} floorNumber={3} withRooms={true} />
      <Floor position={[0, 6.3, 0]} floorNumber={4} />
      <OrbitControls />
      <CameraController />
    </Canvas>
  );
};
// 3D Building Component (you can replace this with your own building component)
const ThreeJSOverlay = ({ position }) => {
  const map = useMap(); // Access the map instance
  const containerRef = useRef(null);
  const [coordinates, setCoordinates] = useState([0, 0]);

  useEffect(() => {
    // Function to update position based on map's center
    const updatePosition = () => {
      const point = map.latLngToContainerPoint(position); // Get pixel position relative to map container
      setCoordinates([point.x, point.y]);
    };

    // Update position on map move or zoom
    map.on("moveend", updatePosition);
    map.on("zoomend", updatePosition);
    updatePosition(); // Initial position set

    // Cleanup the event listener
    return () => {
      map.off("moveend", updatePosition);
      map.off("zoomend", updatePosition);
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
        width: "120px",
        height: "120px",
      }}
    >
      {/* Ensure the Canvas is above the map */}

      <Building position={position} />
    </div>
  );
};

const App = () => {
  return (
    <div className="flex">
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        style={{ height: "100vh", width: "100vw", zIndex: 0 }}
      >
        {/* Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Clustered Markers */}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
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
    </div>
  );
};

export default App;
