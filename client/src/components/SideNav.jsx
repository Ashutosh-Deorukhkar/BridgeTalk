import { NavLink } from "react-router-dom";
import workByPhone from "../icons/workByPhone.png";
import "./Layout.css";

export default function SideNav() {
  return (
    <aside className="sidenav">
      {/* Logo + brand at top */}
      <div className="sidenav__brand">
        <img src={workByPhone} alt="StarTalk logo" className="sidenav__logo" />
        <span className="sidenav__brand-text">BridgeTalk</span>
      </div>

      {/* Navigation sections */}
      <nav className="sidenav__section">
        <div className="sidenav__label">Menu</div>
        <NavLink to="/conversation" className="sidenav__link">
          <span>★ Bridge to talk</span>
        </NavLink>
        <NavLink end to="/" className="sidenav__link">
          <span>Overview</span>
        </NavLink>
        <NavLink to="/planning" className="sidenav__link">
          <span>Planning</span>
        </NavLink>
        <NavLink to="/statistics" className="sidenav__link">
          <span>Statistics</span>
        </NavLink>
      </nav>

      <nav className="sidenav__section">
        <div className="sidenav__label">Account</div>
        <NavLink to="/messages" className="sidenav__link">
          Messages
        </NavLink>
        <NavLink to="/settings" className="sidenav__link">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
