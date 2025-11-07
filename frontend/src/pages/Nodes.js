// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { 
//   Server, 
//   Cpu, 
//   MemoryStick, 
//   Activity,
//   AlertTriangle,
//   CheckCircle2,
//   XCircle,
//   Clock
// } from "lucide-react";

// const Nodes = () => {
//   const [nodes, setNodes] = useState([]);
//   const [pods, setPods] = useState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Mock data - replace with actual Kubernetes API calls
//   useEffect(() => {
//     const fetchClusterData = async () => {
//       setIsLoading(true);
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock nodes data
//       const mockNodes = [
//         {
//           id: "node-1",
//           name: "k8s-master-01",
//           status: "running",
//           cpu: { used: 45, total: 100 },
//           memory: { used: 6.2, total: 16 },
//           pods: { running: 8, total: 10 },
//           ip: "192.168.1.101",
//           os: "Ubuntu 20.04",
//           kubelet: "v1.28.2",
//           lastHeartbeat: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
//         },
//         {
//           id: "node-2",
//           name: "k8s-worker-01",
//           status: "running",
//           cpu: { used: 78, total: 100 },
//           memory: { used: 12.8, total: 16 },
//           pods: { running: 12, total: 15 },
//           ip: "192.168.1.102",
//           os: "Ubuntu 20.04",
//           kubelet: "v1.28.2",
//           lastHeartbeat: new Date(Date.now() - 30 * 1000).toISOString(),
//         },
//         {
//           id: "node-3",
//           name: "k8s-worker-02",
//           status: "running",
//           cpu: { used: 32, total: 100 },
//           memory: { used: 4.5, total: 16 },
//           pods: { running: 6, total: 10 },
//           ip: "192.168.1.103",
//           os: "Ubuntu 20.04",
//           kubelet: "v1.28.2",
//           lastHeartbeat: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
//         },
//         {
//           id: "node-4",
//           name: "k8s-worker-03",
//           status: "warning",
//           cpu: { used: 92, total: 100 },
//           memory: { used: 14.2, total: 16 },
//           pods: { running: 14, total: 15 },
//           ip: "192.168.1.104",
//           os: "Ubuntu 20.04",
//           kubelet: "v1.28.2",
//           lastHeartbeat: new Date(Date.now() - 10 * 1000).toISOString(),
//         }
//       ];

//       // Mock pods data
//       const mockPods = [
//         { id: "pod-1", name: "frontend-7c8b5d94f-abc123", node: "node-1", status: "running", cpu: "45m", memory: "128Mi", restarts: 0, age: "2d" },
//         { id: "pod-2", name: "backend-6d5f8c23e-def456", node: "node-1", status: "running", cpu: "120m", memory: "256Mi", restarts: 2, age: "1d" },
//         { id: "pod-3", name: "prometheus-8g7h9j0k-ghi789", node: "node-2", status: "running", cpu: "210m", memory: "512Mi", restarts: 0, age: "5d" },
//         { id: "pod-4", name: "grafana-5t4r3e2w-jkl012", node: "node-2", status: "running", cpu: "85m", memory: "196Mi", restarts: 1, age: "3d" },
//         { id: "pod-5", name: "redis-1q2w3e4r-mno345", node: "node-3", status: "running", cpu: "65m", memory: "64Mi", restarts: 0, age: "7d" },
//         { id: "pod-6", name: "mongodb-9i8u7y6t-pqr678", node: "node-3", status: "running", cpu: "180m", memory: "384Mi", restarts: 0, age: "4d" },
//         { id: "pod-7", name: "nginx-0p9o8i7u-stu901", node: "node-4", status: "running", cpu: "25m", memory: "32Mi", restarts: 0, age: "1d" },
//         { id: "pod-8", name: "autoscaler-6y5t4r3e-vwx234", node: "node-4", status: "pending", cpu: "0m", memory: "0Mi", restarts: 0, age: "5m" },
//       ];

//       setNodes(mockNodes);
//       setPods(mockPods);
//       setIsLoading(false);
//     };

//     fetchClusterData();
    
//     // Set up real-time updates
//     const interval = setInterval(fetchClusterData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "running": return <CheckCircle2 className="text-green-400" size={16} />;
//       case "warning": return <AlertTriangle className="text-yellow-400" size={16} />;
//       case "error": return <XCircle className="text-red-400" size={16} />;
//       default: return <Clock className="text-gray-400" size={16} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "running": return "text-green-400";
//       case "warning": return "text-yellow-400";
//       case "error": return "text-red-400";
//       default: return "text-gray-400";
//     }
//   };

//   const getPodStatusColor = (status) => {
//     switch (status) {
//       case "running": return "bg-green-500";
//       case "pending": return "bg-yellow-500";
//       case "failed": return "bg-red-500";
//       default: return "bg-gray-500";
//     }
//   };

//   const NodeCard = ({ node }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`bg-gray-900 rounded-2xl p-6 border-2 cursor-pointer transition-all hover:scale-105 ${
//         selectedNode?.id === node.id 
//           ? "border-cyan-500 shadow-2xl shadow-cyan-500/20" 
//           : "border-gray-700 hover:border-cyan-400"
//       }`}
//       onClick={() => setSelectedNode(node)}
//     >
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-3">
//           <Server className="text-cyan-400" size={24} />
//           <div>
//             <h3 className="text-white font-semibold text-lg">{node.name}</h3>
//             <p className="text-gray-400 text-sm">{node.ip}</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           {getStatusIcon(node.status)}
//           <span className={`text-sm font-medium ${getStatusColor(node.status)}`}>
//             {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
//           </span>
//         </div>
//       </div>

//       {/* Resource Usage */}
//       <div className="space-y-4">
//         {/* CPU Usage */}
//         <div>
//           <div className="flex justify-between text-sm text-gray-300 mb-1">
//             <span className="flex items-center space-x-1">
//               <Cpu size={14} />
//               <span>CPU</span>
//             </span>
//             <span>{node.cpu.used}%</span>
//           </div>
//           <div className="w-full bg-gray-700 rounded-full h-2">
//             <div 
//               className={`h-2 rounded-full ${
//                 node.cpu.used > 80 ? "bg-red-500" : 
//                 node.cpu.used > 60 ? "bg-yellow-500" : "bg-green-500"
//               }`}
//               style={{ width: `${node.cpu.used}%` }}
//             />
//           </div>
//         </div>

//         {/* Memory Usage */}
//         <div>
//           <div className="flex justify-between text-sm text-gray-300 mb-1">
//             <span className="flex items-center space-x-1">
//               <MemoryStick size={14} />
//               <span>Memory</span>
//             </span>
//             <span>{node.memory.used}GB / {node.memory.total}GB</span>
//           </div>
//           <div className="w-full bg-gray-700 rounded-full h-2">
//             <div 
//               className={`h-2 rounded-full ${
//                 (node.memory.used / node.memory.total) * 100 > 80 ? "bg-red-500" : 
//                 (node.memory.used / node.memory.total) * 100 > 60 ? "bg-yellow-500" : "bg-green-500"
//               }`}
//               style={{ width: `${(node.memory.used / node.memory.total) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Pods */}
//         <div className="flex justify-between items-center text-sm">
//           <span className="flex items-center space-x-1 text-gray-300">
//             <Activity size={14} />
//             <span>Pods</span>
//           </span>
//           <span className="text-cyan-400">
//             {node.pods.running}/{node.pods.total}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );

//   const PodTable = () => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-gray-900 rounded-2xl p-6 border border-gray-700"
//     >
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-semibold text-cyan-400">Cluster Pods</h3>
//         <div className="text-sm text-gray-400">
//           Total: {pods.length} pods
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-gray-700">
//               <th className="text-left py-3 text-gray-300 font-semibold">Pod Name</th>
//               <th className="text-left py-3 text-gray-300 font-semibold">Node</th>
//               <th className="text-left py-3 text-gray-300 font-semibold">Status</th>
//               <th className="text-left py-3 text-gray-300 font-semibold">CPU</th>
//               <th className="text-left py-3 text-gray-300 font-semibold">Memory</th>
//               <th className="text-left py-3 text-gray-300 font-semibold">Restarts</th>
//               <th className="text-left py-3 text-gray-300 font-semibold">Age</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pods.map((pod) => (
//               <tr key={pod.id} className="border-b border-gray-800 hover:bg-gray-800/50">
//                 <td className="py-3 text-white font-mono text-sm">{pod.name}</td>
//                 <td className="py-3 text-cyan-400 text-sm">{pod.node}</td>
//                 <td className="py-3">
//                   <div className="flex items-center space-x-2">
//                     <div className={`w-2 h-2 rounded-full ${getPodStatusColor(pod.status)}`} />
//                     <span className="text-white text-sm capitalize">{pod.status}</span>
//                   </div>
//                 </td>
//                 <td className="py-3 text-green-400 text-sm">{pod.cpu}</td>
//                 <td className="py-3 text-blue-400 text-sm">{pod.memory}</td>
//                 <td className="py-3">
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     pod.restarts > 0 ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
//                   }`}>
//                     {pod.restarts}
//                   </span>
//                 </td>
//                 <td className="py-3 text-gray-400 text-sm">{pod.age}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );

//   if (isLoading) {
//     return (
//       <div className="flex h-full items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
//           <p className="text-gray-400 mt-4">Loading cluster data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="p-6 space-y-6"
//     >
//       {/* Header */}
//       <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 rounded-2xl shadow-xl border border-purple-500">
//         <h1 className="text-3xl font-bold text-white mb-2">🖥️ Kubernetes Cluster</h1>
//         <p className="text-purple-200">Real-time node and pod monitoring with AutoScaler AI</p>
//         <div className="flex space-x-6 mt-4">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-white">{nodes.length}</div>
//             <div className="text-purple-300 text-sm">Nodes</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-white">{pods.length}</div>
//             <div className="text-purple-300 text-sm">Pods</div>
//           </div>
//           <div className="text-center">
//             <div className="text-2xl font-bold text-green-400">
//               {nodes.filter(n => n.status === 'running').length}
//             </div>
//             <div className="text-purple-300 text-sm">Healthy</div>
//           </div>
//         </div>
//       </div>

//       {/* Nodes Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {nodes.map((node) => (
//           <NodeCard key={node.id} node={node} />
//         ))}
//       </div>

//       {/* Pods Table */}
//       <PodTable />

//       {/* Node Details Modal */}
//       {selectedNode && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
//           onClick={() => setSelectedNode(null)}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full border border-cyan-500"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-cyan-400">{selectedNode.name}</h3>
//               <button 
//                 onClick={() => setSelectedNode(null)}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <XCircle size={24} />
//               </button>
//             </div>
            
//             <div className="grid grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <h4 className="text-white font-semibold">Node Information</h4>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">IP Address:</span>
//                     <span className="text-white">{selectedNode.ip}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">Operating System:</span>
//                     <span className="text-white">{selectedNode.os}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">Kubelet Version:</span>
//                     <span className="text-white">{selectedNode.kubelet}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <h4 className="text-white font-semibold">Resource Usage</h4>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">CPU Usage:</span>
//                     <span className="text-white">{selectedNode.cpu.used}%</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">Memory Usage:</span>
//                     <span className="text-white">{selectedNode.memory.used}GB / {selectedNode.memory.total}GB</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">Active Pods:</span>
//                     <span className="text-cyan-400">{selectedNode.pods.running}/{selectedNode.pods.total}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default Nodes;


































import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Cpu, MemoryStick, Activity, AlertTriangle, CheckCircle2, 
  XCircle, Clock, Trash2, Logs, Zap, Filter, Download,
  RefreshCw, AlertCircle, BarChart3, Gauge
} from "lucide-react";
import { kubernetesService } from "../services/kubernetesService";

const Nodes = () => {
  const [nodes, setNodes] = useState([]);
  const [pods, setPods] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedPod, setSelectedPod] = useState(null);
  const [podLogs, setPodLogs] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("nodes");
  const [scalingRecommendations, setScalingRecommendations] = useState([]);
  const [actionLoading, setActionLoading] = useState({});

  // Load all cluster data
  const loadClusterData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [nodesData, podsData, eventsData] = await Promise.all([
        kubernetesService.getNodes(),
        kubernetesService.getPods(),
        kubernetesService.getEvents()
      ]);
      
      setNodes(nodesData);
      setPods(podsData);
      setEvents(eventsData);
      analyzeScaling(nodesData, podsData);
    } catch (error) {
      console.error("Error loading cluster data:", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadClusterData();
    const interval = setInterval(loadClusterData, 30000);
    return () => clearInterval(interval);
  }, [loadClusterData]);

  // AI Scaling Analysis
  const analyzeScaling = (nodes, pods) => {
    const recommendations = [];
    
    nodes.forEach(node => {
      const nodePods = pods.filter(p => p.node === node.name);
      const cpuUsage = node.cpu.used;
      const memoryUsage = (node.memory.used / node.memory.total) * 100;

      if (cpuUsage > 85 || memoryUsage > 85) {
        recommendations.push({
          type: "SCALE_UP",
          node: node.name,
          reason: `High resource usage (CPU: ${cpuUsage}%, Memory: ${memoryUsage.toFixed(1)}%)`,
          severity: "high",
          action: "Add more worker nodes or scale deployments"
        });
      } else if (cpuUsage < 20 && memoryUsage < 30 && nodePods.length < 5) {
        recommendations.push({
          type: "SCALE_DOWN",
          node: node.name,
          reason: `Low utilization (CPU: ${cpuUsage}%, Memory: ${memoryUsage.toFixed(1)}%)`,
          severity: "low",
          action: "Consider removing node from pool"
        });
      }
    });

    setScalingRecommendations(recommendations);
  };

  // Node Actions
  const handleNodeAction = async (action, nodeName) => {
    setActionLoading(prev => ({ ...prev, [nodeName]: true }));
    
    let result;
    switch (action) {
      case 'drain':
        result = await kubernetesService.drainNode(nodeName);
        break;
      case 'cordon':
        result = await kubernetesService.cordonNode(nodeName, true);
        break;
      case 'uncordon':
        result = await kubernetesService.cordonNode(nodeName, false);
        break;
      default:
        break;
    }
    
    if (result?.success) {
      alert(`✅ ${result.message}`);
      loadClusterData();
    } else if (result?.message) {
      alert(`❌ ${result.message}`);
    }
    
    setActionLoading(prev => ({ ...prev, [nodeName]: false }));
  };

  // Pod Actions
  const handlePodAction = async (action, pod) => {
    setActionLoading(prev => ({ ...prev, [pod.name]: true }));
    
    let result;
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete pod ${pod.name}?`)) {
          result = await kubernetesService.deletePod(pod.name, pod.namespace);
        }
        break;
      case 'logs':
        result = await kubernetesService.getPodLogs(pod.name, pod.namespace);
        if (result.success) {
          setPodLogs(result.logs);
          setSelectedPod(pod);
        }
        break;
      case 'restart':
        // Delete and let deployment recreate
        result = await kubernetesService.deletePod(pod.name, pod.namespace);
        break;
      default:
        break;
    }
    
    if (result?.success) {
      alert(`✅ ${result.message}`);
      loadClusterData();
    } else if (result?.message) {
      alert(`❌ ${result.message}`);
    }
    
    setActionLoading(prev => ({ ...prev, [pod.name]: false }));
  };

  // Status helpers
  const getStatusIcon = (status) => {
    switch (status) {
      case "running": return <CheckCircle2 className="text-green-400" size={16} />;
      case "warning": return <AlertTriangle className="text-yellow-400" size={16} />;
      case "error": return <XCircle className="text-red-400" size={16} />;
      default: return <Clock className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "running": return "text-green-400";
      case "warning": return "text-yellow-400";
      case "error": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getPodStatusColor = (status) => {
    switch (status) {
      case "running": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "failed": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  // Node Card Component
  const NodeCard = ({ node }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-900 rounded-2xl p-6 border-2 cursor-pointer transition-all hover:scale-105 ${
        selectedNode?.id === node.id 
          ? "border-cyan-500 shadow-2xl shadow-cyan-500/20" 
          : "border-gray-700 hover:border-cyan-400"
      }`}
      onClick={() => setSelectedNode(node)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Server className="text-cyan-400" size={24} />
          <div>
            <h3 className="text-white font-semibold text-lg">{node.name}</h3>
            <p className="text-gray-400 text-sm">{node.ip}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(node.status)}
          <span className={`text-sm font-medium ${getStatusColor(node.status)}`}>
            {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Resource Usage */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span className="flex items-center space-x-1">
              <Cpu size={14} />
              <span>CPU</span>
            </span>
            <span>{node.cpu.used}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                node.cpu.used > 80 ? "bg-red-500" : 
                node.cpu.used > 60 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${node.cpu.used}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span className="flex items-center space-x-1">
              <MemoryStick size={14} />
              <span>Memory</span>
            </span>
            <span>{node.memory.used}GB / {node.memory.total}GB</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                (node.memory.used / node.memory.total) * 100 > 80 ? "bg-red-500" : 
                (node.memory.used / node.memory.total) * 100 > 60 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${(node.memory.used / node.memory.total) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center space-x-1 text-gray-300">
            <Activity size={14} />
            <span>Pods</span>
          </span>
          <span className="text-cyan-400">
            {node.pods.running}/{node.pods.total}
          </span>
        </div>
      </div>

      {/* Node Actions */}
      <div className="flex space-x-2 mt-4">
        <button
          onClick={(e) => { e.stopPropagation(); handleNodeAction('cordon', node.name); }}
          className="flex-1 bg-yellow-500/20 text-yellow-400 py-1 px-2 rounded text-xs hover:bg-yellow-500/30 transition"
          disabled={actionLoading[node.name]}
        >
          {actionLoading[node.name] ? "..." : "Cordon"}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNodeAction('drain', node.name); }}
          className="flex-1 bg-red-500/20 text-red-400 py-1 px-2 rounded text-xs hover:bg-red-500/30 transition"
          disabled={actionLoading[node.name]}
        >
          {actionLoading[node.name] ? "..." : "Drain"}
        </button>
      </div>
    </motion.div>
  );

  // Pods Table Component
  const PodsTable = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-2xl p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-cyan-400">Cluster Pods ({pods.length})</h3>
        <button
          onClick={loadClusterData}
          className="flex items-center space-x-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/30 transition"
        >
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 text-gray-300 font-semibold">Pod Name</th>
              <th className="text-left py-3 text-gray-300 font-semibold">Namespace</th>
              <th className="text-left py-3 text-gray-300 font-semibold">Node</th>
              <th className="text-left py-3 text-gray-300 font-semibold">Status</th>
              <th className="text-left py-3 text-gray-300 font-semibold">CPU</th>
              <th className="text-left py-3 text-gray-300 font-semibold">Memory</th>
              <th className="text-left py-3 text-gray-300 font-semibold">Restarts</th>
              <th className="text-left py-3 text-gray-300 font-semibold">Age</th>
              <th className="text-left py-3 text-gray-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pods.map((pod) => (
              <tr key={pod.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="py-3 text-white font-mono text-sm">{pod.name}</td>
                <td className="py-3 text-gray-400 text-sm">{pod.namespace}</td>
                <td className="py-3 text-cyan-400 text-sm">{pod.node}</td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getPodStatusColor(pod.status)}`} />
                    <span className="text-white text-sm capitalize">{pod.status}</span>
                  </div>
                </td>
                <td className="py-3 text-green-400 text-sm">{pod.cpu}</td>
                <td className="py-3 text-blue-400 text-sm">{pod.memory}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pod.restarts > 0 ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                  }`}>
                    {pod.restarts}
                  </span>
                </td>
                <td className="py-3 text-gray-400 text-sm">{pod.age}</td>
                <td className="py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePodAction('logs', pod)}
                      className="text-cyan-400 hover:text-cyan-300 transition"
                      title="View Logs"
                    >
                      <Logs size={14} />
                    </button>
                    <button
                      onClick={() => handlePodAction('restart', pod)}
                      className="text-yellow-400 hover:text-yellow-300 transition"
                      title="Restart"
                    >
                      <RefreshCw size={14} />
                    </button>
                    <button
                      onClick={() => handlePodAction('delete', pod)}
                      className="text-red-400 hover:text-red-300 transition"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  // Events Table Component
  const EventsTable = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-2xl p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-cyan-400">Cluster Events</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Filter size={16} />
            <span className="text-gray-400">Filter events...</span>
          </div>
          <button
            onClick={loadClusterData}
            className="flex items-center space-x-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/30 transition"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-800 rounded-lg p-4 border-l-4 border-cyan-500">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs ${
                    event.type === 'Normal' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {event.type}
                  </span>
                  <span className="text-white font-medium">{event.reason}</span>
                </div>
                <p className="text-gray-300 text-sm">{event.message}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                  <span>Source: {event.source}</span>
                  <span>Object: {event.object}</span>
                  <span>Count: {event.count}</span>
                </div>
              </div>
              <span className="text-gray-500 text-sm">
                {new Date(event.firstTimestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Scaling Recommendations Component
  const ScalingRecommendations = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-2xl p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-cyan-400">
          🧠 AutoScaler AI Recommendations
        </h3>
        <div className="flex items-center space-x-2 text-yellow-400">
          <Zap size={20} />
          <span className="text-sm">AI-Powered Analysis</span>
        </div>
      </div>

      <div className="space-y-4">
        {scalingRecommendations.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <CheckCircle2 size={48} className="mx-auto mb-4 text-green-400" />
            <p>No scaling actions recommended at this time.</p>
            <p className="text-sm">Cluster is optimally scaled.</p>
          </div>
        ) : (
          scalingRecommendations.map((rec, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              rec.severity === 'high' 
                ? 'bg-red-500/10 border-red-500' 
                : 'bg-yellow-500/10 border-yellow-500'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-lg ${
                      rec.type === 'SCALE_UP' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {rec.type === 'SCALE_UP' ? '🚀 Scale Up' : '💤 Scale Down'}
                    </span>
                    <span className="text-white font-semibold">{rec.node}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{rec.reason}</p>
                  <p className="text-cyan-400 text-sm">💡 {rec.action}</p>
                </div>
                <button className="bg-cyan-500 text-white px-4 py-2 rounded text-sm hover:bg-cyan-600 transition">
                  Apply
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );

  // Resource Quotas Component
  const ResourceQuotas = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-2xl p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-cyan-400">Resource Quotas & Limits</h3>
        <Gauge className="text-cyan-400" size={24} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nodes.map((node) => (
          <div key={node.id} className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">{node.name}</h4>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>CPU Allocation</span>
                  <span>{node.cpu.used}% of {node.cpu.total} cores</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-cyan-500"
                    style={{ width: `${node.cpu.used}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Memory Allocation</span>
                  <span>{node.memory.used}GB of {node.memory.total}GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${(node.memory.used / node.memory.total) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Pod Capacity</span>
                  <span>{node.pods.running} of {node.pods.total} pods</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(node.pods.running / node.pods.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Tabs Content
  const renderTabContent = () => {
    switch (activeTab) {
      case "nodes":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {nodes.map((node) => (
              <NodeCard key={node.id} node={node} />
            ))}
          </div>
        );
      
      case "pods":
        return <PodsTable />;
      
      case "events":
        return <EventsTable />;
      
      case "scaling":
        return <ScalingRecommendations />;
      
      case "quotas":
        return <ResourceQuotas />;
      
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading cluster data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 rounded-2xl shadow-xl border border-purple-500">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🖥️ Kubernetes Cluster</h1>
            <p className="text-purple-200">Enterprise cluster management with AutoScaler AI</p>
          </div>
          <button
            onClick={loadClusterData}
            className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
        
        <div className="flex space-x-6 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{nodes.length}</div>
            <div className="text-purple-300 text-sm">Nodes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{pods.length}</div>
            <div className="text-purple-300 text-sm">Pods</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {nodes.filter(n => n.status === 'running').length}
            </div>
            <div className="text-purple-300 text-sm">Healthy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {scalingRecommendations.length}
            </div>
            <div className="text-purple-300 text-sm">AI Recommendations</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 rounded-2xl p-2 border border-gray-700">
        <div className="flex space-x-1">
          {[
            { id: "nodes", label: "Nodes", icon: Server },
            { id: "pods", label: "Pods", icon: Activity },
            { id: "events", label: "Events", icon: AlertCircle },
            { id: "scaling", label: "AI Scaling", icon: Zap },
            { id: "quotas", label: "Resource Quotas", icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Node Details Modal */}
      <AnimatePresence>
        {selectedNode && (
          <NodeDetailsModal 
            node={selectedNode} 
            onClose={() => setSelectedNode(null)} 
            onAction={handleNodeAction}
            actionLoading={actionLoading}
          />
        )}
      </AnimatePresence>

      {/* Pod Logs Modal */}
      <AnimatePresence>
        {selectedPod && (
          <PodLogsModal 
            pod={selectedPod} 
            logs={podLogs}
            onClose={() => setSelectedPod(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Node Details Modal Component
const NodeDetailsModal = ({ node, onClose, onAction, actionLoading }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-gray-900 rounded-2xl p-6 max-w-4xl w-full border border-cyan-500 max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-cyan-400">{node.name}</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition"
        >
          <XCircle size={24} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Node Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">IP Address:</span>
              <span className="text-white">{node.ip}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Operating System:</span>
              <span className="text-white">{node.os}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Kubelet Version:</span>
              <span className="text-white">{node.kubelet}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className={`font-medium ${
                node.status === 'running' ? 'text-green-400' : 
                node.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Resource Usage</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">CPU Usage:</span>
              <span className="text-white">{node.cpu.used}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Memory Usage:</span>
              <span className="text-white">{node.memory.used}GB / {node.memory.total}GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Active Pods:</span>
              <span className="text-cyan-400">{node.pods.running}/{node.pods.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Actions */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h4 className="text-white font-semibold mb-4">Node Management</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => onAction('cordon', node.name)}
            disabled={actionLoading[node.name]}
            className="bg-yellow-500/20 text-yellow-400 py-2 px-4 rounded-lg hover:bg-yellow-500/30 transition disabled:opacity-50"
          >
            {actionLoading[node.name] ? "Processing..." : "🛑 Cordon Node"}
          </button>
          <button
            onClick={() => onAction('uncordon', node.name)}
            disabled={actionLoading[node.name]}
            className="bg-green-500/20 text-green-400 py-2 px-4 rounded-lg hover:bg-green-500/30 transition disabled:opacity-50"
          >
            {actionLoading[node.name] ? "Processing..." : "✅ Uncordon Node"}
          </button>
          <button
            onClick={() => onAction('drain', node.name)}
            disabled={actionLoading[node.name]}
            className="bg-red-500/20 text-red-400 py-2 px-4 rounded-lg hover:bg-red-500/30 transition disabled:opacity-50"
          >
            {actionLoading[node.name] ? "Processing..." : "💧 Drain Node"}
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Cordon: Prevent new pods • Drain: Safely remove all pods
        </p>
      </div>
    </motion.div>
  </motion.div>
);

// Pod Logs Modal Component
const PodLogsModal = ({ pod, logs, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-gray-900 rounded-2xl p-6 max-w-6xl w-full border border-cyan-500 max-h-[90vh] flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-cyan-400">Pod Logs</h3>
          <p className="text-gray-400 text-sm">{pod.name}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigator.clipboard.writeText(logs)}
            className="flex items-center space-x-2 bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded text-sm hover:bg-cyan-500/30 transition"
          >
            <Download size={14} />
            <span>Copy</span>
          </button>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <XCircle size={24} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-black rounded-lg p-4 font-mono text-sm text-green-400 overflow-auto">
        <pre>{logs || "No logs available"}</pre>
      </div>
    </motion.div>
  </motion.div>
);

export default Nodes;