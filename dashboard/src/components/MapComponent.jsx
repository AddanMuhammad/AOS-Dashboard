import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import { newJSON } from '../json/Json';

const MapComponent = () => {
    const mapRef = useRef(null);
    const [selectedLayer, setSelectedLayer] = useState(null);
  
    useEffect(() => {
      const map = L.map(mapRef.current).setView([30.3753, 69.3451], 11); // Coordinates of Pakistan
  
      // Add ESRI World Imagery base layer
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }
      ).addTo(map);
  
      // Fit map bounds to a specific area
      const bounds = [
        [28.494650644, 70.01325594],
        [28.542171522, 70.07730582],
      ];
      map.fitBounds(bounds);
  
      // Interactive Layer with GeoJSON data
      const interactiveLayer = L.geoJSON(newJSON, {
        onEachFeature: (feature, layer) => {
          layer.on("click", () => {
            if (selectedLayer) {
              interactiveLayer.resetStyle(selectedLayer);
            }
            setSelectedLayer(layer);
  
            const area = turf.area(layer.toGeoJSON()); // Calculate area
            const areaInAcres = area / 4046.86; // Convert to acres
  
            // Update your display elements (you need to create these in your JSX)
            document.getElementById("district").textContent =
              feature.properties.District;
            document.getElementById("tehsil").textContent =
              feature.properties.Tehsil;
            document.getElementById("mouza").textContent =
              feature.properties.Mouza;
            document.getElementById("ownerName").textContent =
              feature.properties.Owners_Nam;
            document.getElementById("ownerId").textContent =
              feature.properties.owner_ID;
            document.getElementById("ownerCnic").textContent =
              feature.properties.CNIC_numbe;
            document.getElementById("contract").textContent =
              feature.properties.Contract;
            document.getElementById("cropType").textContent =
              feature.properties.classLabel;
            document.getElementById("area").textContent =
              areaInAcres.toFixed(2);
            document.getElementById("cropStatus").textContent =
              feature.properties.Status || "N/A";
  
            // Highlight selected polygon
            layer.setStyle({
              color: "red",
              weight: 3,
            });
  
            // Zoom to the selected polygon
            map.fitBounds(layer.getBounds());
          });
        },
      }).addTo(map);
  
      // Clean up the map on component unmount
      return () => {
        map.remove();
      };
    }, [selectedLayer]);
  
    return (
      <>
        <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
        {/* Info display area */}
        <div>
          <p>District: <span id="district">N/A</span></p>
          <p>Tehsil: <span id="tehsil">N/A</span></p>
          <p>Mouza: <span id="mouza">N/A</span></p>
          <p>Owner Name: <span id="ownerName">N/A</span></p>
          <p>Owner ID: <span id="ownerId">N/A</span></p>
          <p>Owner CNIC: <span id="ownerCnic">N/A</span></p>
          <p>Contract: <span id="contract">N/A</span></p>
          <p>Crop Type: <span id="cropType">N/A</span></p>
          <p>Area (Acres): <span id="area">N/A</span></p>
          <p>Crop Status: <span id="cropStatus">N/A</span></p>
        </div>
      </>
    );
  };

export default MapComponent;
