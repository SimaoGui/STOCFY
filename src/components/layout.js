import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar.js";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "1rem" }}>

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
