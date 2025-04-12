// Modify Sidebar.tsx to include logout functionality
import React from "react";
import { NavLink } from "react-router-dom";
import DashboardLogo from "../assets/img/element-1.svg"; // adjust path if needed
import QuickcheckLogo from "../assets/img/note.svg"; // adjust path if needed
import Logo from "../assets/img/trustchecklogo.svg"; // adjust path if needed
import LogoutLogo from "../assets/img/logout.svg"; // adjust path if needed
import "./Sidebar.css";

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <nav className="nav-menu">
        <NavLink to="/dashboard" className={"nav-link"}>
          <img src={DashboardLogo} alt="dashboard-logo" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/quick-check" className={"nav-link"}>
          <img src={QuickcheckLogo} alt="quickcheck-logo" />
          <span>Quick Check</span>
        </NavLink>
        
      </nav>
      <div className="logout nav-link" onClick={onLogout}>
        <img src={LogoutLogo} alt="logout-logo" />
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default Sidebar;
