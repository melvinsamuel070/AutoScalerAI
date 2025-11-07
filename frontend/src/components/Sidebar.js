import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Server, Activity, Bell, Settings } from "lucide-react";

const menuItems = [
  { icon: <Home size={20} />, label: "Dashboard", path: "/" },
  { icon: <Server size={20} />, label: "Nodes", path: "/nodes" },
  { icon: <Activity size={20} />, label: "Metrics", path: "/metrics" },
  { icon: <Bell size={20} />, label: "Alerts", path: "/alerts" },
  { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-gray-900 text-gray-300 w-64 h-screen p-5 flex flex-col border-r border-gray-700">
      <h1 className="text-xl font-bold text-cyan-400 mb-10 text-center">
        AutoScaler.AI
      </h1>
      <ul className="flex flex-col gap-3">
        {menuItems.map((item, i) => {
          const active = location.pathname === item.path;
          return (
            <li key={i}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-md transition-all ${
                  active
                    ? "bg-cyan-500 text-white"
                    : "hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto text-sm text-gray-500 text-center">
        v1.0 | Powered by AI
      </div>
    </div>
  );
}
