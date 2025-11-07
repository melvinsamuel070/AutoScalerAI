// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   CartesianGrid,
// } from "recharts";

// export default function Metrics() {
//   const [data, setData] = useState([]);
//   const [status, setStatus] = useState("Fetching metrics...");
//   const [scaleDecision, setScaleDecision] = useState("Analyzing...");
//   const [lastAction, setLastAction] = useState("Waiting for data...");

//   useEffect(() => {
//     const fetchMetrics = async () => {
//       try {
//         const res = await axios.get("http://localhost:3500/metrics");

//         // Parse metrics safely
//         const cpu = parseFloat(res.data.match(/process_cpu_user_seconds_total\s+([\d.]+)/)?.[1] || 0);
//         const memory =
//           parseFloat(
//             res.data.match(/nodejs_heap_used_bytes\s+([\d.]+)/)?.[1] ||
//               res.data.match(/process_resident_memory_bytes\s+([\d.]+)/)?.[1] ||
//               0
//           ) / 1024 / 1024; // MB
//         const requests = parseInt(res.data.match(/http_requests_total\s+([\d.]+)/)?.[1] || 0);
//         const errors = parseInt(res.data.match(/http_errors_total\s+([\d.]+)/)?.[1] || 0);

//         const time = new Date().toLocaleTimeString();

//         // Keep last 20 data points
//         setData((prev) => [...prev.slice(-19), { time, cpu, memory, requests, errors }]);
//         setStatus("✅ Metrics live and updating...");

//         // AutoScaler logic
//         let decision = "Stable ✅";
//         let reason = "System performance balanced.";

//         if (cpu > 1 || memory > 250 || requests > 100) {
//           decision = "Scale Up 🚀";
//           reason = "High resource utilization detected.";
//         } else if (cpu < 0.1 && memory < 80 && requests < 10) {
//           decision = "Scale Down 💤";
//           reason = "Resources underutilized.";
//         }

//         setScaleDecision(decision);
//         setLastAction(`${decision} — ${reason}`);
//       } catch (err) {
//         console.error("Error fetching metrics:", err);
//         setStatus("⚠️ Unable to fetch metrics.");
//         setScaleDecision("No Data ❌");
//         setLastAction("Check server or metrics endpoint.");
//       }
//     };

//     fetchMetrics();
//     const interval = setInterval(fetchMetrics, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="p-6 text-gray-200"
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-cyan-400 text-3xl font-bold">
//           📊 Real-Time Metrics + AutoScaler AI
//         </h2>
//         <span className="text-sm text-gray-400">{status}</span>
//       </div>

//       {/* 🧠 AutoScaler Decision */}
//       <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
//         <h3 className="text-cyan-300 text-xl font-semibold mb-2">
//           🧠 AI-Powered AutoScaler Simulation
//         </h3>
//         <div className="flex items-center justify-between mt-4">
//           <div>
//             <p className="text-gray-400 text-sm mb-1">Current Decision:</p>
//             <p
//               className={`text-2xl font-bold ${
//                 scaleDecision.includes("Up")
//                   ? "text-green-400"
//                   : scaleDecision.includes("Down")
//                   ? "text-yellow-400"
//                   : "text-cyan-400"
//               }`}
//             >
//               {scaleDecision}
//             </p>
//           </div>
//           <motion.div
//             key={scaleDecision}
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-gray-800 px-6 py-3 rounded-xl border border-gray-700 text-gray-300"
//           >
//             <p className="text-sm">Last Action:</p>
//             <p className="font-semibold text-gray-100">{lastAction}</p>
//           </motion.div>
//         </div>
//       </div>

//       {/* Combined Metrics Chart */}
//       <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800">
//         <h3 className="text-cyan-300 mb-2 font-semibold">Cluster Metrics Overview</h3>
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//             <XAxis dataKey="time" stroke="#9ca3af" />
//             <YAxis stroke="#9ca3af" />
//             <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none" }} />
//             <Legend />
//             <Line type="monotone" dataKey="cpu" stroke="#06b6d4" strokeWidth={2} name="CPU (s)" dot={false} />
//             <Line type="monotone" dataKey="memory" stroke="#a855f7" strokeWidth={2} name="Memory (MB)" dot={false} />
//             <Line type="monotone" dataKey="requests" stroke="#22c55e" strokeWidth={2} name="Requests" dot={false} />
//             <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} name="Errors" dot={false} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </motion.div>
//   );
// }







import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend
} from "recharts";
import { fetchMetrics } from "../services/metricsService";

export default function MetricsChart() {
  const [data, setData] = useState([]);
  const [decision, setDecision] = useState("🧠 Analyzing...");
  const [status, setStatus] = useState("Fetching metrics...");

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const metrics = await fetchMetrics();
        setStatus("✅ Metrics fetched successfully");

        // AI Decision Logic
        let newDecision = "⚖️ Stable";
        if (metrics.cpu > 70 || metrics.requests > 800) {
          newDecision = "🚀 Scale Up";
        } else if (metrics.cpu < 20 && metrics.requests < 100) {
          newDecision = "💤 Scale Down";
        } else if (metrics.errors > 5) {
          newDecision = "⚠️ High Errors";
        }

        setDecision(newDecision);

        // Add new data point
        const newDataPoint = {
          time: new Date().toLocaleTimeString(),
          requests: metrics.requests,
          errors: metrics.errors,
          cpu: metrics.cpu,
          memory: metrics.memory,
          latency: metrics.latency
        };

        setData((prev) => {
          const newData = [...prev.slice(-19), newDataPoint];
          return newData;
        });

      } catch (err) {
        setStatus("❌ Unable to fetch metrics");
        setDecision("🧠 Analyzing...");
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-teal-400">
        📊 Real-Time Metrics + AutoScaler AI
      </h2>

      <p className={`text-sm mb-2 ${
        status.includes("✅") ? "text-green-400" : "text-red-400"
      }`}>
        {status}
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF" 
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#22D3EE' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="requests" 
            stroke="#22D3EE" 
            strokeWidth={2}
            name="Requests"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="errors" 
            stroke="#EF4444" 
            strokeWidth={2}
            name="Errors" 
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="cpu" 
            stroke="#10B981" 
            strokeWidth={2}
            name="CPU %"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* AI Decision Display */}
      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
        <p className="text-gray-400 text-sm mb-1">🧠 AI-Powered AutoScaler Simulation</p>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Current Decision:</span>
          <span className={
            decision.includes("Up") ? "text-green-400 font-bold text-lg" :
            decision.includes("Down") ? "text-blue-400 font-bold text-lg" :
            decision.includes("⚠️") ? "text-yellow-400 font-bold text-lg" :
            "text-gray-400 font-bold text-lg"
          }>
            {decision}
          </span>
        </div>
      </div>
    </div>
  );
}