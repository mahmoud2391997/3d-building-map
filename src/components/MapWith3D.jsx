import React, { useEffect, useRef, useState } from "react";
import KeplerGl from "@kepler.gl/components";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Building from "./Building";

const MapWith3D = () => {
  return (
    <div
      className="h-full w-full"
      style={{ display: "flex", position: "relative" }}
    >
      {/* Kepler.gl component to display the map */}
      <KeplerGl
        id="map"
        mapboxApiAccessToken={import.meta.env.VITE_APP_MAPBOX_API_KEY}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ pointerEvents: "auto" }} // Disable interactions with the map
      />

      {/* Three.js scene for the building */}
      <Building />
    </div>
  );
};

export default MapWith3D;
