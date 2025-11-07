import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";
import MetricsChart from "../components/MetricsChart"; // ✅ import our live metrics chart

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-950 text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 grid grid-cols-3 gap-6 overflow-y-auto"
        >
          {/* === Left Section: Real-Time Metrics === */}
          <div className="col-span-2 bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
            <h3 className="text-cyan-400 font-semibold mb-3">
              Cluster Performance
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Real-time CPU, memory, and traffic utilization overview.
            </p>
            <MetricsChart /> {/* ✅ Live Prometheus data visualization */}
          </div>

          {/* === Right Section: Container Status === */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
            <h3 className="text-cyan-400 font-semibold mb-3">
              Active Containers
            </h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>Frontend - Running ✅</li>
              <li>Backend - Running ✅</li>
              <li>Prometheus - Running ✅</li>
              <li>Grafana - Running ✅</li>
            </ul>

            {/* Status Summary */}
            <div className="mt-6 p-3 rounded-xl bg-gray-800 text-center">
              <p className="text-gray-400 text-sm">Autoscaler Status</p>
              <p className="text-green-400 text-xl font-semibold mt-1">
                Active
              </p>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-gray-800 text-center">
              <p className="text-gray-400 text-sm">Last Scaling Decision</p>
              <p className="text-blue-400 text-xl font-semibold mt-1">
                Scale Up 🚀
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
