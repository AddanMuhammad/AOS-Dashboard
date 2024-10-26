import React from "react";
import { FireFilled } from "@ant-design/icons";

const Logo = ({ collapsed }) => {
  return (
    <div className={`logo-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo-icon">
        <FireFilled />
      </div>
      {!collapsed && <span className="logo-text">Zar’at Dost</span>}
    </div>
  );
};

export default Logo;
