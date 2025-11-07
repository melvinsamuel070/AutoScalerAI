// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import axios from "axios";
// import { motion } from "framer-motion";

// export default function MetricsChart() {
//   const [data, setData] = useState([]);
//   const [decision, setDecision] = useState("🧠 Initializing AI...");
//   const [status, setStatus] = useState("Fetching cluster metrics...");
//   const [loading, setLoading] = useState(true);

//   const parseMetrics = (text) => {
//     const getValue = (pattern) => {
//       const match = text.match(pattern);
//       return match ? parseFloat(match[1]) : 0;
//     };

//     return {
//       requests: getValue(/http_requests_total\s+(\d+)/),
//       errors: getValue(/http_errors_total\s+(\d+)/),
//       cpu: Math.round(getValue(/process_cpu_seconds_total\s+([\d.]+)/) * 100),
//       memory: Math.round(getValue(/process_resident_memory_bytes\s+(\d+)/) / 1024 / 1024),
//     };
//   };

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const res = await axios.get("http://localhost:3500/metrics");
//         setStatus("✅ Metrics fetched successfully");
//         setLoading(false);

//         const metrics = parseMetrics(res.data);
//         const { requests, errors, cpu, memory } = metrics;

//         let newDecision = "⚖️ Stable Load";
//         if (cpu > 70 || requests > 500) {
//           newDecision = "🚀 Scale Up — High Demand Detected";
//         } else if (cpu < 20 && requests < 50) {
//           newDecision = "💤 Scale Down — Low Utilization";
//         }

//         setDecision(newDecision);
//         setData((prev) => [
//           ...prev.slice(-20),
//           {
//             time: new Date().toLocaleTimeString(),
//             requests,
//             errors,
//             cpu,
//             memory,
//           },
//         ]);
//       } catch (err) {
//         console.error("Metrics fetch failed:", err.message);
//         setStatus("❌ Unable to connect to metrics endpoint");
//         setDecision("🧠 Analyzing...");
//         setLoading(true);
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 text-gray-100">
//       <h2 className="text-xl font-semibold mb-4 text-teal-400">
//         📊 Real-Time Cluster Metrics + AutoScaler AI
//       </h2>
//       <p className="text-sm text-gray-400 mb-2">{status}</p>

//       {loading ? (
//         <div className="flex flex-col items-center justify-center h-56 relative">
//           {/* Pulse Ring */}
//           <motion.div
//             className="absolute w-24 h-24 rounded-full border-4 border-teal-500 opacity-30"
//             animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
//             transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
//           />

//           {/* Glowing Brain */}
//           <motion.div
//             animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
//             transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
//             className="text-6xl text-teal-300 drop-shadow-[0_0_10px_#14b8a6]"
//           >
//             🧠
//           </motion.div>

//           {/* Text Below */}
//           <motion.p
//             animate={{ opacity: [0.4, 1, 0.4] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="text-teal-400 font-medium mt-4 text-lg"
//           >
//             Analyzing cluster metrics...
//           </motion.p>
//         </div>
//       ) : (
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={data}>
//             <XAxis dataKey="time" stroke="#888" />
//             <YAxis stroke="#888" />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#111",
//                 border: "1px solid #333",
//                 color: "#fff",
//               }}
//               labelStyle={{ color: "#22d3ee" }}
//             />
//             <Line
//               type="monotone"
//               dataKey="requests"
//               stroke="#22d3ee"
//               name="Requests"
//               dot={false}
//             />
//             <Line
//               type="monotone"
//               dataKey="errors"
//               stroke="#ef4444"
//               name="Errors"
//               dot={false}
//             />
//             <Line
//               type="monotone"
//               dataKey="cpu"
//               stroke="#84cc16"
//               name="CPU (%)"
//               dot={false}
//             />
//             <Line
//               type="monotone"
//               dataKey="memory"
//               stroke="#f59e0b"
//               name="Memory (MB)"
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       )}

//       <div className="mt-4 text-center text-lg font-medium">
//         <span
//           className={
//             decision.includes("Up")
//               ? "text-green-400"
//               : decision.includes("Down")
//               ? "text-red-400"
//               : "text-yellow-400"
//           }
//         >
//           {decision}
//         </span>
//       </div>
//     </div>
//   );
// }







import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MetricsChart() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Fetching metrics...");
  const [decision, setDecision] = useState("🧠 Initializing AI...");
  const [loading, setLoading] = useState(true);

  const parseMetrics = (text) => {
    const getValue = (pattern, factor = 1) => {
      const match = text.match(pattern);
      return match ? parseFloat(match[1]) * factor : 0;
    };

    return {
      requests: getValue(/http_requests_total\s+(\d+)/),
      errors: getValue(/http_errors_total\s+(\d+)/),
      cpu: getValue(/process_cpu_user_seconds_total\s+([\d.]+)/),
      memory: getValue(/process_resident_memory_bytes\s+(\d+)/, 1 / 1024 / 1024),
    };
  };

  const fetchMetrics = async () => {
    try {
      const res = await axios.get("http://localhost:3500/metrics");
      setStatus("✅ Metrics fetched successfully");
      setLoading(false);

      const { requests, errors, cpu, memory } = parseMetrics(res.data);

      let newDecision = "⚖️ Stable Load";
      if (cpu > 1 || requests > 100) newDecision = "🚀 Scale Up — High Demand Detected";
      else if (cpu < 0.1 && requests < 10) newDecision = "💤 Scale Down — Low Activity";

      setDecision(newDecision);
      setData((prev) => [
        ...prev.slice(-20),
        { time: new Date().toLocaleTimeString(), requests, errors, cpu, memory },
      ]);
    } catch (err) {
      console.error("Error fetching metrics:", err.message);
      setStatus("❌ Unable to fetch metrics");
      setDecision("🧠 Analyzing...");
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-800 text-gray-100">
      <h2 className="text-xl font-semibold text-teal-400 mb-4">
        📊 Real-Time Cluster Metrics + AutoScaler AI
      </h2>
      <p className="text-sm text-gray-400 mb-2">{status}</p>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-56 relative">
          <motion.div
            className="absolute w-24 h-24 rounded-full border-4 border-teal-500 opacity-30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl text-teal-300 drop-shadow-[0_0_10px_#14b8a6]"
          >
            🧠
          </motion.div>
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-teal-400 font-medium mt-4 text-lg"
          >
            Analyzing cluster metrics...
          </motion.p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{ backgroundColor: "#111", border: "1px solid #333" }}
              labelStyle={{ color: "#22d3ee" }}
            />
            <Line type="monotone" dataKey="requests" stroke="#22d3ee" name="Requests" dot={false} />
            <Line type="monotone" dataKey="errors" stroke="#ef4444" name="Errors" dot={false} />
            <Line type="monotone" dataKey="cpu" stroke="#84cc16" name="CPU (seconds)" dot={false} />
            <Line type="monotone" dataKey="memory" stroke="#f59e0b" name="Memory (MB)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}

      <div className="mt-4 text-center text-lg font-medium">
        <span
          className={
            decision.includes("Up")
              ? "text-green-400"
              : decision.includes("Down")
              ? "text-red-400"
              : "text-yellow-400"
          }
        >
          {decision}
        </span>
      </div>
    </div>
  );
}
