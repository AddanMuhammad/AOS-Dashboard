import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import { newJSON } from '../json/Json';

const MapComponent = () => {
  const mapRef = useRef(null);
  const selectedLayerRef = useRef(null); 
  const mapRefInstance = useRef(); 
  const [info, setInfo] = useState({
    district: "N/A",
    tehsil: "N/A",
    mouza: "N/A",
    ownerName: "N/A",
    ownerId: "N/A",
    ownerCnic: "N/A",
    contract: "N/A",
    cropType: "N/A",
    area: "N/A",
    cropStatus: "N/A",
  });

  // Track if the map has zoomed already
  const hasZoomedRef = useRef(false); 

  useEffect(() => {
    // Initialize map only once
    mapRefInstance.current = L.map(mapRef.current).setView([30.3753, 69.3451], 11);

    // Add ESRI World Imagery base layer
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    ).addTo(mapRefInstance.current);

    // Fit map bounds to a specific area
    const bounds = [
      [28.494650644, 70.01325594],
      [28.542171522, 70.07730582],
    ];
    mapRefInstance.current.fitBounds(bounds);

    // Create GeoJSON layer
    const interactiveLayer = L.geoJSON(newJSON, {
      onEachFeature: (feature, layer) => {
        layer.on("click", () => {
          // Reset the style of the previously selected layer
          if (selectedLayerRef.current) {
            interactiveLayer.resetStyle(selectedLayerRef.current);
          }
          
          // Check if the clicked layer is already selected
          if (selectedLayerRef.current === layer) {
            return; // Do not proceed if the same layer is clicked
          }

          // Highlight the currently selected layer
          selectedLayerRef.current = layer; // Store reference to selected layer
          layer.setStyle({
            color: "red",
            weight: 3,
          });

          const area = turf.area(layer.toGeoJSON()); // Calculate area
          const areaInAcres = area / 4046.86; // Convert to acres

          // Update state with selected feature properties
          setInfo({
            district: feature.properties.District,
            tehsil: feature.properties.Tehsil,
            mouza: feature.properties.Mouza,
            ownerName: feature.properties.Grw__Name,
            ownerId: feature.properties.Grw__Code,
            ownerCnic: feature.properties.CNIC,
            contract: feature.properties.Contract,
            cropType: feature.properties.classLabel,
            area: areaInAcres.toFixed(2),
            cropStatus: feature.properties.Status || "N/A",
          });

          // Zoom to the selected polygon only if it hasn't zoomed before
          if (!hasZoomedRef.current) {
            mapRefInstance.current.fitBounds(layer.getBounds());
            hasZoomedRef.current = true; // Mark that the map has zoomed
          }
        });
      },
    }).addTo(mapRefInstance.current);

    // Clean up the map on component unmount
    return () => {
      mapRefInstance.current.remove();
    };
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
      {/* Info display area */}
      <div>
        <p>District: <span>{info.district}</span></p>
        <p>Tehsil: <span>{info.tehsil}</span></p>
        <p>Mouza: <span>{info.mouza}</span></p>
        <p>Owner Name: <span>{info.ownerName}</span></p>
        <p>Owner ID: <span>{info.ownerId}</span></p>
        <p>Owner CNIC: <span>{info.ownerCnic}</span></p>
        <p>Contract: <span>{info.contract}</span></p>
        <p>Crop Type: <span>{info.cropType}</span></p>
        <p>Area (Acres): <span>{info.area}</span></p>
        <p>Crop Status: <span>{info.cropStatus}</span></p>
      </div>
    </>
  );
};

export default MapComponent;