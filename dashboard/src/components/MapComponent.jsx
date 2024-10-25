// import React, { useEffect, useRef, useState } from "react";
// import { UpOutlined, DownOutlined } from '@ant-design/icons';
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { newJSON } from '../json/Json';

// const MapComponent = () => {
//   const mapRef = useRef(null);
//   const selectedLayerRef = useRef(null);
//   const mapRefInstance = useRef();
//   const [selectedDivision, setSelectedDivision] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [selectedTehsil, setSelectedTehsil] = useState('');
//   const [selectedMouza, setSelectedMouza] = useState('');
//   const [isPanelVisible, setIsPanelVisible] = useState(false);

//   // Extract unique values for dropdowns
//   const divisions = [...new Set(newJSON.features.map(feature => feature.properties.Division))];
//   const districts = [...new Set(newJSON.features.map(feature => feature.properties.District))];
//   const tehsils = [...new Set(newJSON.features.map(feature => feature.properties.Tehsil))];
//   const mouzas = [...new Set(newJSON.features.map(feature => feature.properties.Mouza))];

//   useEffect(() => {
//     mapRefInstance.current = L.map(mapRef.current).setView([30.3753, 69.3451], 11);

//     L.tileLayer(
//       "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//     ).addTo(mapRefInstance.current);

//     const bounds = [
//       [23.6345, 60.8724],
//       [37.0841, 77.8375],
//     ];
//     mapRefInstance.current.fitBounds(bounds);

//     const interactiveLayer = L.geoJSON(newJSON, {
//       onEachFeature: (feature, layer) => {
//         layer.on("click", () => {
//           if (selectedLayerRef.current) {
//             interactiveLayer.resetStyle(selectedLayerRef.current);
//           }

//           selectedLayerRef.current = layer;
//           layer.setStyle({
//             color: "red",
//             weight: 3,
//           });

//           mapRefInstance.current.fitBounds(layer.getBounds());
//         });
//       },
//     }).addTo(mapRefInstance.current);

//     return () => {
//       mapRefInstance.current.remove();
//     };
//   }, []);

//   const handleFilter = () => {
//     if (!selectedDivision || !selectedDistrict || !selectedTehsil || !selectedMouza) {
//       alert("Please select an option from all dropdowns.");
//       return;
//     }

//     const filteredFeatures = newJSON.features.filter(feature => (
//       feature.properties.Division === selectedDivision &&
//       feature.properties.District === selectedDistrict &&
//       feature.properties.Tehsil === selectedTehsil &&
//       feature.properties.Mouza === selectedMouza
//     ));

//     if (filteredFeatures.length > 0) {
//       const bounds = L.geoJSON(filteredFeatures).getBounds();
//       mapRefInstance.current.fitBounds(bounds);
//       setIsPanelVisible(true); // Open the sliding panel when features are found
//     } else {
//       alert("No features found for the selected criteria.");
//     }
//   };

//   const togglePanel = () => {
//     setIsPanelVisible(prev => !prev);
//   };

//   return (
//     <>
//       <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>
//       <div style={filterContainerStyle}>
//         <select onChange={(e) => setSelectedDivision(e.target.value)} value={selectedDivision} style={selectStyle}>
//           <option value="">Select Division</option>
//           {divisions.map(division => (
//             <option key={division} value={division}>{division}</option>
//           ))}
//         </select>
//         <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict} style={selectStyle}>
//           <option value="">Select District</option>
//           {districts.map(district => (
//             <option key={district} value={district}>{district}</option>
//           ))}
//         </select>
//         <select onChange={(e) => setSelectedTehsil(e.target.value)} value={selectedTehsil} style={selectStyle}>
//           <option value="">Select Tehsil</option>
//           {tehsils.map(tehsil => (
//             <option key={tehsil} value={tehsil}>{tehsil}</option>
//           ))}
//         </select>
//         <select onChange={(e) => setSelectedMouza(e.target.value)} value={selectedMouza} style={selectStyle}>
//           <option value="">Select Mouza</option>
//           {mouzas.map(mouza => (
//             <option key={mouza} value={mouza}>{mouza}</option>
//           ))}
//         </select>
//         <button onClick={handleFilter} style={buttonStyle}>Filter</button>
//       </div>

//       {/* Circular button to open sliding panel */}
//       <button onClick={togglePanel} style={roundButtonStyle}>
//         <span style={{ fontWeight: "bold", fontSize: "20px" }}><UpOutlined /></span>
//       </button>

//       {/* Sliding panel */}
//       <div style={{ ...panelStyle, transform: isPanelVisible ? "translateY(0)" : "translateY(100%)" }}>
//         <div style={panelContentStyle}>
//           {/* Close button at the top center */}
//           <button onClick={togglePanel} style={closeButtonStyle}>
//             <span style={{ fontWeight: "bold", fontSize: "20px" }}><DownOutlined /></span>
//           </button>
//           <div style={dataCardContainer}>
//             <DataCard title="Total Area" value="3792 acres" />
//             <DataCard title="Field Area" value="2.1 acres" />
//             <DataCard title="Orchards" value="15.3 acres" />
//             <DataCard title="Constructed Area" value="0 acres" />
//             <DataCard title="Non-Constructed Area" value="177.4 acres" />
//             <DataCard title="Yield Area" value="177.4 acres" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };





// const DataCard = ({ title, value }) => (
//   <div style={dataCardStyle}>
//     <h4 style={dataTitleStyle}>{title}</h4>
//     <p style={dataValueStyle}>{value}</p>
//   </div>
// );

// // Styles
// const filterContainerStyle = {
//   position: "absolute",
//   top: "7%",
//   left: "50%",
//   transform: "translateX(-50%)",
//   zIndex: 1000,
//   background: "rgba(255, 255, 255, 0.6)",
//   padding: "10px",
//   borderRadius: "5px",
//   boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
//   display: "flex",
//   alignItems: "center",
//   gap: "10px",
//   maxWidth: "90%",
//   overflow: "hidden",
// };

// const selectStyle = {
//   padding: "8px",
//   borderRadius: "4px",
//   border: "1px solid rgba(0, 0, 0, 0.6)",
//   background: "white",
//   color: "black",
//   boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//   fontSize: "14px",
//   cursor: "pointer",
//   maxWidth: "150px",
//   flexGrow: 1,
//   transition: "border 0.3s",
// };

// const buttonStyle = {
//   padding: "8px 16px",
//   borderRadius: "4px",
//   border: "none",
//   backgroundColor: "#007BFF",
//   color: "white",
//   fontSize: "14px",
//   cursor: "pointer",
//   transition: "background-color 0.3s",
// };

// const roundButtonStyle = {
//   position: "absolute",
//   bottom: "20px",
//   left: "50%",
//   transform: "translateX(-50%)",
//   width: "40px",
//   height: "40px",
//   backgroundColor: "rgba(255, 255, 255, 0.8)",
//   borderRadius: "50%",
//   border: "1px solid rgba(0, 0, 0, 0.3)",
//   fontSize: "18px",
//   fontWeight: "bold",
//   cursor: "pointer",
//   boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
//   zIndex: 1000,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const panelStyle = {
//   position: "fixed",
//   bottom: 0,
//   left: 0,
//   right: 0,
//   height: "37%",
//   backgroundColor: "#F2F3F2",
//   boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
//   borderTopLeftRadius: "15px",
//   borderTopRightRadius: "15px",
//   transition: "transform 0.3s ease-in-out",
//   zIndex: 1500,
// };

// const panelContentStyle = {
//   padding: "20px",
//   display: "flex",
//   flexDirection: "column",
//   gap: "15px",
//   overflowY: "auto",
// };

// const closeButtonStyle = {
//   fontSize: "24px",
//   background: "white", // Set the background to white
//   border: "1px solid rgba(0, 0, 0, 0.3)", // Optional: Add a light border for better visibility
//   borderRadius: "50%", // Ensure it is circular
//   color: "#888",
//   cursor: "pointer",
//   alignSelf: "center", // Center the close button horizontally
//   width: "35px", // Set a fixed width
//   height: "35px", // Set the height equal to the width for a circular shape
//   padding: "0", // Remove padding to keep the button circular
//   display: "flex", // Use flexbox for centering the icon
//   alignItems: "center", // Center the icon vertically
//   justifyContent: "center", // Center the icon horizontally
//   boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // Optional: Add a subtle shadow
// };

// const dataCardContainer = {
//   display: "flex",
//   flexWrap: "wrap",
//   gap: "10px",
// };

// const dataCardStyle = {
//   flex: "1 1 calc(30% - 10px)",
//   padding: "15px",
//   borderRadius: "8px",
//   backgroundColor: "#fff",
//   boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//   textAlign: "center",
// };

// const dataTitleStyle = {
//   fontSize: "16px",
//   color: "#555",
//   margin: "0 0 8px",
// };

// const dataValueStyle = {
//   fontSize: "15px",
//   color: "#777",
//   margin: 0,
// };

// export default MapComponent;










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
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  // Extract unique values for dropdowns
  const divisions = [...new Set(newJSON.features.map(feature => feature.properties.Division))];
  const districts = [...new Set(newJSON.features.map(feature => feature.properties.District))];
  const tehsils = [...new Set(newJSON.features.map(feature => feature.properties.Tehsil))];
  const mouzas = [...new Set(newJSON.features.map(feature => feature.properties.Mouza))];

  useEffect(() => {
    mapRefInstance.current = L.map(mapRef.current).setView([30.3753, 69.3451], 11);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    ).addTo(mapRefInstance.current);

    // const bounds = [
    //   [23.6345, 60.8724],
    //   [37.0841, 77.8375],
    // ];

    const bounds = [
      [29.3950, 71.6830]
    ];
    mapRefInstance.current.fitBounds(bounds);

    const interactiveLayer = L.geoJSON(newJSON, {
      onEachFeature: (feature, layer) => {
        layer.on("click", () => {
          if (selectedLayerRef.current) {
            interactiveLayer.resetStyle(selectedLayerRef.current);
          }

          selectedLayerRef.current = layer;
          layer.setStyle({
            color: "red",
            weight: 3,
          });

          mapRefInstance.current.fitBounds(layer.getBounds());
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

    const filteredFeatures = newJSON.features.filter(feature => (
      feature.properties.Division === selectedDivision &&
      feature.properties.District === selectedDistrict &&
      feature.properties.Tehsil === selectedTehsil &&
      feature.properties.Mouza === selectedMouza
    ));

    if (filteredFeatures.length > 0) {
      const bounds = L.geoJSON(filteredFeatures).getBounds();
      mapRefInstance.current.fitBounds(bounds);
      setIsPanelVisible(true); // Open the sliding panel when features are found
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
        <button onClick={handleFilter} style={buttonStyle}>Filter</button>
      </div>

      {/* Circular button to open sliding panel */}
      <button onClick={togglePanel} style={roundButtonStyle}>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}><UpOutlined /></span>
      </button>

      {/* Sliding panel */}
      <div style={{ ...panelStyle, transform: isPanelVisible ? "translateY(0)" : "translateY(100%)" }}>
        <div style={panelContentStyle}>
          {/* Close button at the top center */}
          <button onClick={togglePanel} style={closeButtonStyle}>
            <span style={{ fontWeight: "bold", fontSize: "20px" }}><DownOutlined /></span>
          </button>
          <div style={dataCardContainer}>
            <DataCard title="Total Area:" value="3792 acres" />
            <DataCard title="Field Area:" value="2.1 acres" />
            <DataCard title="Orchards:" value="15.3 acres" />
            <DataCard title="Constructed Area:" value="0 acres" />
            <DataCard title="Non-Constructed Area:" value="177.4 acres" />
            <DataCard title="Yield Area:" value="177.4 acres" />
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
  backgroundColor: "#007BFF",
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
  height: "33%",
  backgroundColor: "#F2F3F2",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
  transition: "transform 0.3s ease-in-out",
  zIndex: 1500,
};

const panelContentStyle = {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  overflowY: "auto",
};

const closeButtonStyle = {
  fontSize: "24px",
  background: "white", // Set the background to white
  border: "1px solid rgba(0, 0, 0, 0.3)", // Optional: Add a light border for better visibility
  borderRadius: "50%", // Ensure it is circular
  color: "#888",
  cursor: "pointer",
  alignSelf: "center", // Center the close button horizontally
  width: "35px", // Set a fixed width
  height: "35px", // Set the height equal to the width for a circular shape
  padding: "0", // Remove padding to keep the button circular
  display: "flex", // Use flexbox for centering the icon
  alignItems: "center", // Center the icon vertically
  justifyContent: "center", // Center the icon horizontally
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // Optional: Add a subtle shadow
};

const dataCardContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "space-between"

};

const dataCardStyle = {
  // flex: "1 1 calc(25% - 10px)",
  width: "30%", // Adjusted to decrease width
  padding: "15px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  textAlign: "center",

  overflow: "hidden", // Ensure text does not overflow
};

const dataTitleStyle = {
  fontSize: "16px",
  background: "linear-gradient(90deg, #FF5733, #FFC300)", // Gradient background
  WebkitBackgroundClip: "text",
  color: "transparent", // Make text transparent to show gradient
  margin: "0 0 8px",
};

const dataValueStyle = {
  fontSize: "15px",
  background: "linear-gradient(90deg, #33FF57, #33C3FF)", // Different gradient for values
  WebkitBackgroundClip: "text",
  color: "transparent", // Make text transparent to show gradient
  margin: 0,
};

export default MapComponent;
