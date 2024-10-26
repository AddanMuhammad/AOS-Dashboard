import React, { useEffect, useRef, useState } from "react";
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { newJSON } from '../json/Json';

const MapComponent = () => {
  const mapRef = useRef(null);
  const selectedLayerRef = useRef(null);
  const mapRefInstance = useRef();
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTehsil, setSelectedTehsil] = useState('');
  const [selectedMouza, setSelectedMouza] = useState('');
  const [selectedGrwName, setSelectedGrwName] = useState('');
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [panelData, setPanelData] = useState({
    title: "Default Data",
    data: [
      { title: "Total Area:", value: "3792 acres" },
      { title: "Field Area:", value: "2.1 acres" },
      { title: "Orchards:", value: "15.3 acres" },
      { title: "Constructed Area:", value: "0 acres" },
      { title: "Non-Constructed Area:", value: "177.4 acres" },
      { title: "Yield Area:", value: "177.4 acres" },
    ],
  });

  // Extract unique values for dropdowns
  const divisions = [...new Set(newJSON.features.map(feature => feature.properties.Division))];
  const districts = [...new Set(newJSON.features.map(feature => feature.properties.District))];
  const tehsils = [...new Set(newJSON.features.map(feature => feature.properties.Tehsil))];
  const mouzas = [...new Set(newJSON.features.map(feature => feature.properties.Mouza))];
  const grwNames = [...new Set(newJSON.features.map(feature => feature.properties.Grw__Name))];

  useEffect(() => {
    mapRefInstance.current = L.map(mapRef.current).setView([30.3753, 69.3451], 11);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    ).addTo(mapRefInstance.current);

    const bounds = [[29.1623, 71.3782]];
    mapRefInstance.current.fitBounds(bounds);

    const interactiveLayer = L.geoJSON(newJSON, {
      style: { color: "yellow", weight: 1 }, // Change default color to yellow
      onEachFeature: (feature, layer) => {
        layer.on("click", () => {
          if (selectedLayerRef.current) {
            interactiveLayer.resetStyle(selectedLayerRef.current);
          }
          selectedLayerRef.current = layer;
          layer.setStyle({ color: "red", weight: 3 });
          mapRefInstance.current.flyToBounds(layer.getBounds(), { duration: 1.5 });
        });
      },
    }).addTo(mapRefInstance.current);

    return () => {
      mapRefInstance.current.remove();
    };
  }, []);

  const handleFilter = () => {
    if (!selectedDivision || !selectedDistrict || !selectedTehsil || !selectedMouza) {
      alert("Please select an option from all dropdowns.");
      return;
    }

    let filteredFeatures = newJSON.features.filter(feature => (
      feature.properties.Division === selectedDivision &&
      feature.properties.District === selectedDistrict &&
      feature.properties.Tehsil === selectedTehsil &&
      feature.properties.Mouza === selectedMouza
    ));

    if (selectedGrwName) {
      filteredFeatures = filteredFeatures.filter(feature =>
        feature.properties.Grw__Name === selectedGrwName
      );

      if (filteredFeatures.length === 0) {
        alert(`No features found for the selected criteria including Grw Name: ${selectedGrwName}.`);
        return;
      } else {
        const selectedFeature = filteredFeatures[0];
        setPanelData({
          title: selectedFeature.properties.Grw__Name || "N/A",
          data: [
            { title: "Grw Name:", value: selectedFeature.properties.Grw__Name || "N/A" },
            { title: "Father Name:", value: selectedFeature.properties.Father_Nam || "N/A" },
            { title: "CNIC:", value: selectedFeature.properties.CNIC || "N/A" },
            { title: "Phone No:", value: selectedFeature.properties.Phone_no || "N/A" },
            { title: "Area:", value: selectedFeature.properties.Area || "N/A" },
            { title: "Ratoon:", value: selectedFeature.properties.Ratoon || "N/A" },
          ]
        });
      }
    } else {
      setPanelData({
        title: "Default Data",
        data: [
          { title: "Total Area:", value: "3792 acres" },
          { title: "Field Area:", value: "2.1 acres" },
          { title: "Orchards:", value: "15.3 acres" },
          { title: "Constructed Area:", value: "0 acres" },
          { title: "Non-Constructed Area:", value: "177.4 acres" },
          { title: "Yield Area:", value: "177.4 acres" },
        ]
      });
    }

    if (filteredFeatures.length > 0) {
      const bounds = L.geoJSON(filteredFeatures).getBounds();
      mapRefInstance.current.flyToBounds(bounds, { duration: 1.5 });

      if (selectedGrwName) {
        const selectedFeature = newJSON.features.find(feature => feature.properties.Grw__Name === selectedGrwName);
        if (selectedFeature) {
          // Reset previous layer style and unbind tooltip
          if (selectedLayerRef.current) {
            selectedLayerRef.current.setStyle({ color: "yellow", weight: 1 }); // Reset to yellow
            selectedLayerRef.current.unbindTooltip();  // Remove previous tooltip
          }

          // Add new layer with Grw_Code tooltip
          const layer = L.geoJSON(selectedFeature, {
            style: { color: "red", weight: 3 }
          });

          selectedLayerRef.current = layer;  // Set the new layer as selected
          layer.addTo(mapRefInstance.current);

          // Bind the Grw_Code as a tooltip to the selected layer
          layer.bindTooltip(`Grw Code: ${selectedFeature.properties.Grw__Code}`, {
            permanent: true,
            direction: 'top'
          }).openTooltip();

          mapRefInstance.current.flyToBounds(layer.getBounds(), { duration: 1.5 });
        }
      }

      setIsPanelVisible(true);
    } else {
      alert("No features found for the selected criteria.");
    }
  };

  const togglePanel = () => {
    setIsPanelVisible(prev => !prev);
  };

  return (
    <>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>
      <div style={filterContainerStyle}>
        <select onChange={(e) => setSelectedDivision(e.target.value)} value={selectedDivision} style={selectStyle}>
          <option value="">Select Division</option>
          {divisions.map(division => (
            <option key={division} value={division}>{division}</option>
          ))}
        </select>
        <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict} style={selectStyle}>
          <option value="">Select District</option>
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
        <select onChange={(e) => setSelectedTehsil(e.target.value)} value={selectedTehsil} style={selectStyle}>
          <option value="">Select Tehsil</option>
          {tehsils.map(tehsil => (
            <option key={tehsil} value={tehsil}>{tehsil}</option>
          ))}
        </select>
        <select onChange={(e) => setSelectedMouza(e.target.value)} value={selectedMouza} style={selectStyle}>
          <option value="">Select Mouza</option>
          {mouzas.map(mouza => (
            <option key={mouza} value={mouza}>{mouza}</option>
          ))}
        </select>
        <select onChange={(e) => setSelectedGrwName(e.target.value)} value={selectedGrwName} style={selectStyle}>
          <option value="">Select Grw Name</option>
          {grwNames.map(grwName => (
            <option key={grwName} value={grwName}>{grwName}</option>
          ))}
        </select>
        <button onClick={handleFilter} style={buttonStyle}>Filter</button>
      </div>

      <button onClick={togglePanel} style={roundButtonStyle}>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}><UpOutlined /></span>
      </button>

      <div style={{ ...panelStyle, transform: isPanelVisible ? "translateY(0)" : "translateY(100%)" }}>
        <div style={panelContentStyle}>
          <button onClick={togglePanel} style={closeButtonStyle}>
            <span style={{ fontWeight: "bold", fontSize: "20px" }}><DownOutlined /></span>
          </button>
          <div style={dataCardContainer}>
            {panelData.data.map((item, index) => (
              <DataCard key={index} title={item.title} value={item.value} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const DataCard = ({ title, value }) => (
  <div style={dataCardStyle}>
    <h4 style={dataTitleStyle}>{title}</h4>
    <p style={dataValueStyle}>{value}</p>
  </div>
);

// Styles
const filterContainerStyle = {
  position: "absolute",
  top: "7%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  background: "rgba(255, 255, 255, 0.6)",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  maxWidth: "90%",
  overflow: "hidden",
};

const selectStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid rgba(0, 0, 0, 0.6)",
  background: "white",
  color: "black",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  fontSize: "14px",
  cursor: "pointer",
  maxWidth: "150px",
  flexGrow: 1,
  transition: "border 0.3s",
};

const buttonStyle = {
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#1fd655",
  color: "white",
  fontSize: "14px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const roundButtonStyle = {
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "40px",
  height: "40px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "50%",
  border: "1px solid rgba(0, 0, 0, 0.3)",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const panelStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: "30%",
  backgroundColor: "#F2F3F2",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
  transition: "transform 0.3s ease-in-out",
  zIndex: 1500,
};

const panelContentStyle = {
  padding: "10px 30px 10px 30px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  overflowY: "auto",
};

const closeButtonStyle = {
  fontSize: "20px",
  background: "#83f28f",
  border: "1px solid rgba(0, 0, 0, 0.3)",
  borderRadius: "50%",
  color: "#888",
  cursor: "pointer",
  alignSelf: "center",
  width: "30px",
  height: "30px",
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
};

const dataCardContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "space-between"

};

const dataCardStyle = {
  // flex: "1 1 calc(25% - 10px)",
  width: "30%",

  padding: "10px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  textAlign: "center",

  overflow: "hidden",
};

const dataTitleStyle = {
  fontSize: "15px",
  background: "linear-gradient(90deg, #FF5733, #FFC300)",
  WebkitBackgroundClip: "text",
  color: "transparent",
  margin: "0 0 8px",
};

const dataValueStyle = {
  fontSize: "13px",
  background: "red",
  WebkitBackgroundClip: "text",
  color: "transparent",
  fontWeight: "bold",
  margin: 0,
};

export default MapComponent;
