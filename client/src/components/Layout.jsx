import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <TopNav />
      <SideNav />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}