import React from "react";
import { FireFilled } from "@ant-design/icons";

const Logo = ({ collapsed }) => {
  return (
    <div className={`logo-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo-icon">
        <FireFilled />
      </div>
      {!collapsed && <span className="logo-text">Zar’aat Dost</span>}
    </div>
  );
};

export default Logo;
