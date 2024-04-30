"use client";
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { FaLocationDot } from "react-icons/fa6";

interface LeafletMapProps {
  latitude: number;
  longitude: number;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Create a map instance
    mapRef.current = L.map('mapid').setView([latitude, longitude], 13);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Add marker at the center of the map with the default icon
    const markerIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });

    L.marker([latitude, longitude], { icon: markerIcon }).addTo(mapRef.current);

    // Cleanup function to remove the map instance when the component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [latitude, longitude]);

  return <div id="mapid" className="h-full"></div>;
};

export default LeafletMap;
