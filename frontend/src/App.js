import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Nodes from "./pages/Nodes";
import Metrics from "./pages/Metrics";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";

import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-950 text-gray-200">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/nodes" element={<Nodes />} />
              <Route path="/metrics" element={<Metrics />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
