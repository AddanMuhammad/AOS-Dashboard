import React, { useState } from "react";
import Card from './components/Card';
import LstJulyImg from './assets/lstJuly.jpeg';
import LstMarchImg from './assets/lstMarch.jpeg';
import LstMayImg from './assets/lstMay.jpeg';
import LstSeptemberImg from './assets/lstSeptember.jpeg';
import FieldMapDetail from './assets/fieldMapDetail.jpeg';
import { UpOutlined, DownOutlined, PicLeftOutlined, LeftOutlined, RightOutlined, DeploymentUnitOutlined, FunnelPlotOutlined, OneToOneOutlined, PartitionOutlined, ProfileOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

function LSTMap() {
  const location = useLocation();
  const selectedKey = location.pathname === '/map/fields-map' ? '1' : location.pathname === '/map/crop-yield-map' ? '2' : location.pathname === '/map/lst-map' ? '3' : location.pathname === '/map/soil-map' ? '4' : '5';

  const [isRightPanelVisible, setIsRightPanelVisible] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [panelData, setPanelData] = useState({
    title: "Default Data",
    data: [
      { title: "Total Area:", value: "3802 acres" },
      { title: "Field Area:", value: "1934 acres" },
      { title: "Orchards:", value: "1067 acres" },
      { title: "Nulla:", value: "57 acres" },
      { title: "Constructed Area:", value: "606 acres" },
      { title: "Non-Constructed Area:", value: "26 acres" },
    ],
  });

  const [currentImage, setCurrentImage] = useState(LstMarchImg);
  const [sliderColor, setSliderColor] = useState("#4CAF50");

  const handleSliderChange = (value) => {
    let newColor = "#4CAF50";
    switch (value) {
      case 0:
        setCurrentImage(LstMarchImg);
        newColor = "#4CAF50";
        break;
      case 1:
        setCurrentImage(LstMayImg);
        newColor = "#FF9800";
        break;
      case 2:
        setCurrentImage(LstJulyImg);
        newColor = "#FF5722";
        break;
      case 3:
        setCurrentImage(LstSeptemberImg);
        newColor = "#9C27B0";
        break;
      default:
        setCurrentImage(LstMarchImg);
    }
    setSliderColor(newColor);
  };

  const togglePanel = () => {
    setIsPanelVisible(prev => !prev);
  };

  const toggleRightPanel = () => {
    setIsRightPanelVisible(prev => !prev);
  };

  return (
    <Card>
      <h2>Soil Map</h2>

      {/* Card Container for Slider */}
      <div style={sliderCardContainerStyle}>
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          style={{ ...sliderStyle, background: sliderColor }}
        />

        {/* Centered Month Labels */}
        <div style={labelContainerStyle}>
          <span>March</span>
          <span>May</span>
          <span>July</span>
          <span>September</span>
        </div>
      </div>



      {/* Image that changes based on slider selection */}
      <img style={{
        width: '80%',
        height: 'auto',
        borderRadius: '8px',
        display: 'block',
        margin: '0 auto' // Centering the image
      }} src={currentImage} alt="SoilMapImg" />



      {/* <button onClick={togglePanel} style={roundButtonStyle}>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}><UpOutlined /></span>
      </button>

      <div style={{ ...panelStyle, transform: isPanelVisible ? "translateY(0)" : "translateY(100%)" }}>
        <div style={panelContentStyle}>
          <button onClick={togglePanel} style={closeButtonStyle}>
            <span style={{ fontWeight: "bold", fontSize: "20px" }}><DownOutlined /></span>
          </button>
          <div style={contentContainerStyle}>
            <div style={dataCardContainer}>
              {panelData.data.map((item, index) => (
                <DataCard key={index} title={item.title} value={item.value} />
              ))}
            </div>
            <img style={imageStyle} src={FieldMapDetail} alt="FieldMapDetail" />
          </div>
        </div>
      </div> */}

<div style={{ ...rightPanelStyle, transform: isRightPanelVisible ? "translateX(0)" : "translateX(100%)" }}>
        <button onClick={toggleRightPanel} style={closeRightPanelButtonStyle}>
          {isRightPanelVisible ? <RightOutlined /> : <LeftOutlined />}
        </button>

        <div selectedKeys={[selectedKey]}>
          <button key='1' className="action-btn edit-btn" title="Fields Map">
            <Link to="/map/fields-map"><DeploymentUnitOutlined style={{ color: 'white', fontSize: '15px' }}/></Link>
          </button>
          <button key='2' className="action-btn edit-btn" title="Mauza Crop Yield">
            <Link to="/map/mauza-crop-yield-map"><PicLeftOutlined style={{ color: 'white', fontSize: '15px' }}/></Link>
          </button>
          <button key='3' className="action-btn edit-btn" title="Crop Yield Map">
            <Link to="/map/crop-yield-map"><FunnelPlotOutlined style={{ color: 'white', fontSize: '15px' }}/></Link>
          </button>
          <button key='4' className="action-btn edit-btn" title="LST Map">
            <Link to="/map/lst-map"><OneToOneOutlined style={{ color: 'white', fontSize: '15px' }}/></Link>
          </button>
          <button key='5' className="action-btn edit-btn" title="Soil Map">
            <Link to="/map/soil-map"><PartitionOutlined style={{ color: 'white', fontSize: '15px' }}/></Link>
          </button>
          <button key='6' className="action-btn edit-btn" title="Solar Location">
            <Link to="/map/solar-location"><ProfileOutlined style={{ color: 'white', fontSize: '15px' }}/></Link>
          </button>
          <button key='7' className="action-btn edit-btn" title="Mauza Boundary">
            <Link to="/map"><AppstoreOutlined style={{ color: 'white', fontSize: '15px' }}/></Link>
          </button>
        </div>
      </div>
    </Card>
  );
}

const DataCard = ({ title, value }) => (
  <div style={dataCardStyle}>
    <h4 style={dataTitleStyle}>{title}</h4>
    <p style={dataValueStyle}>{value}</p>
  </div>
);

const dataCardStyle = {
  width: "30%", // Allows three cards per row
  padding: "10px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  textAlign: "center",
  marginBottom: "10px",
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
  color: "#333",
  fontWeight: "bold",
  margin: 0,
};

const panelStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: "40%",
  backgroundColor: "#F2F3F2",
  boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
  borderTopLeftRadius: "15px",
  borderTopRightRadius: "15px",
  transition: "transform 0.3s ease-in-out",
  zIndex: 1500,
};

const contentContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  height: "100%",
  justifyContent: "space-between",
  padding: "10px",
  overflowY: "auto",
};

const dataCardContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "3%",
  flex: 1,
};

const imageStyle = {
  flex: 1,
  maxWidth: "40%",
  height: "auto",
};

const closeButtonStyle = {
  fontSize: "20px",
  background: "white",
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

const panelContentStyle = {
  padding: "10px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
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

const rightPanelStyle = {
  position: "absolute",
  top: "35%",
  right: "0",
  height: "auto",
  borderRadius: "10px",
  width: "50px", 
  backgroundColor: "white",
  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  transition: "transform 0.3s ease",
  zIndex: 1000,
  textAlign: "center",
  padding: "10px 0px 0px 0px"
};


const closeRightPanelButtonStyle = {
  position: 'absolute',
  left: '-50px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: '#f4fdf4',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer'
};

const sliderCardContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  margin: "5px auto",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #ccc",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
};

const sliderStyle = {
  width: "100%",
  appearance: "none",
  height: "8px",
  borderRadius: "5px",
  outline: "none",
  cursor: "pointer",
  transition: "background 0.3s ease",
};

const labelContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  color: "#333",
  fontWeight: "bold",
  textAlign: "center",
  marginTop: "10px",
};

export default LSTMap