'use client';

import { useEffect, useRef, useState } from 'react';

export default function OrangeCountyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Check if script already exists
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', initMap);
      return;
    }

    // Load Google Maps script
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError('Google Maps API key not found');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      initMap();
    };

    script.onerror = () => {
      setError('Failed to load Google Maps');
    };

    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    if (!mapRef.current || !window.google) return;

    // Orange County precise boundaries (following actual county borders and coastline)
    const orangeCountyCoords = [
      // Northern border with Los Angeles County
      { lat: 33.915, lng: -117.98 },   // Seal Beach (coast)
      { lat: 33.945, lng: -117.96 },   // North of Seal Beach
      { lat: 33.960, lng: -117.91 },   // La Palma area
      { lat: 33.965, lng: -117.85 },   // Buena Park
      { lat: 33.970, lng: -117.75 },   // Fullerton
      { lat: 33.943, lng: -117.63 },   // Yorba Linda

      // Eastern border with Riverside/San Bernardino Counties
      { lat: 33.920, lng: -117.47 },   // Corona area border
      { lat: 33.860, lng: -117.43 },   // Cleveland National Forest
      { lat: 33.780, lng: -117.42 },   // Trabuco Canyon
      { lat: 33.700, lng: -117.43 },   // South of Lake Forest
      { lat: 33.620, lng: -117.47 },   // Rancho Mission Viejo

      // Southern border with San Diego County
      { lat: 33.545, lng: -117.54 },   // San Onofre area
      { lat: 33.470, lng: -117.60 },   // San Clemente (inland)
      { lat: 33.427, lng: -117.61 },   // South San Clemente

      // Coastline (north from San Clemente to Seal Beach)
      { lat: 33.423, lng: -117.61 },   // San Clemente (coast)
      { lat: 33.460, lng: -117.66 },   // Dana Point
      { lat: 33.497, lng: -117.73 },   // Laguna Beach
      { lat: 33.545, lng: -117.78 },   // Crystal Cove
      { lat: 33.603, lng: -117.88 },   // Newport Beach
      { lat: 33.641, lng: -117.93 },   // Newport Coast
      { lat: 33.685, lng: -117.96 },   // Huntington Beach
      { lat: 33.742, lng: -117.98 },   // Huntington State Beach
      { lat: 33.785, lng: -118.00 },   // Bolsa Chica
      { lat: 33.845, lng: -117.99 },   // Sunset Beach
    ];

    const map = new google.maps.Map(mapRef.current, {
      zoom: 9,
      center: { lat: 33.7174708, lng: -117.8311428 },
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }],
        },
      ],
    });

    // Create the polygon
    const orangeCounty = new google.maps.Polygon({
      paths: orangeCountyCoords,
      strokeColor: '#E68130',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#E68130',
      fillOpacity: 0.35,
    });

    orangeCounty.setMap(map);

    // Add hover effects
    orangeCounty.addListener('mouseover', () => {
      orangeCounty.setOptions({
        fillOpacity: 0.5,
        strokeWeight: 3,
      });
    });

    orangeCounty.addListener('mouseout', () => {
      orangeCounty.setOptions({
        fillOpacity: 0.35,
        strokeWeight: 2,
      });
    });
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
}
