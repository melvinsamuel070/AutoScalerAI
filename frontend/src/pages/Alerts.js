import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  BellRing, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Settings,
  Volume2,
  VolumeX,
  Clock,
  X,
  RefreshCw,
  Zap,
  Server
} from "lucide-react";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [alertRules, setAlertRules] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [isLoading, setIsLoading] = useState(true);
  const [muted, setMuted] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [newAlertRule, setNewAlertRule] = useState({
    name: "",
    severity: "warning",
    condition: "cpu_usage",
    threshold: 80,
    duration: "5m"
  });

  // Format duration helper function
  const formatDuration = (startTime, endTime = null) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const diff = end - start;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  // Load alerts and rules
  useEffect(() => {
    loadAlertData();
    const interval = setInterval(loadAlertData, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const loadAlertData = async () => {
    setIsLoading(true);
    
    // Simulate API calls
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock alerts data
    const mockAlerts = [
      {
        id: "alert-1",
        name: "HighCPUUsage",
        severity: "critical",
        status: "firing",
        description: "CPU usage is above 90% for more than 5 minutes",
        summary: "Node k8s-worker-03 CPU at 92%",
        startsAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        endsAt: null,
        labels: {
          cluster: "production",
          node: "k8s-worker-03",
          severity: "critical"
        },
        annotations: {
          description: "Consider scaling up or redistributing workloads",
          runbook: "https://wiki.company.com/runbook/high-cpu"
        },
        silenced: false
      },
      {
        id: "alert-2",
        name: "MemoryPressure",
        severity: "warning",
        status: "firing",
        description: "Memory usage is above 80%",
        summary: "Node k8s-worker-01 memory at 88%",
        startsAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        endsAt: null,
        labels: {
          cluster: "production",
          node: "k8s-worker-01",
          severity: "warning"
        },
        annotations: {
          description: "Monitor memory usage and consider optimization",
          runbook: "https://wiki.company.com/runbook/memory-pressure"
        },
        silenced: false
      },
      {
        id: "alert-3",
        name: "PodCrashLooping",
        severity: "critical",
        status: "firing",
        description: "Pod backend-6d5f8c23e-def456 is crash looping",
        summary: "Backend pod restarting frequently",
        startsAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        endsAt: null,
        labels: {
          cluster: "production",
          namespace: "default",
          pod: "backend-6d5f8c23e-def456",
          severity: "critical"
        },
        annotations: {
          description: "Check application logs and resource limits",
          runbook: "https://wiki.company.com/runbook/crash-loop"
        },
        silenced: false
      },
      {
        id: "alert-4",
        name: "NodeNotReady",
        severity: "critical",
        status: "resolved",
        description: "Node k8s-worker-02 was not ready",
        summary: "Node connectivity restored",
        startsAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        endsAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        labels: {
          cluster: "production",
          node: "k8s-worker-02",
          severity: "critical"
        },
        annotations: {
          description: "Network connectivity issue resolved",
          runbook: "https://wiki.company.com/runbook/node-not-ready"
        },
        silenced: false
      },
      {
        id: "alert-5",
        name: "DiskPressure",
        severity: "warning",
        status: "firing",
        description: "Disk usage above 85% on node k8s-master-01",
        summary: "Low disk space on master node",
        startsAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        endsAt: null,
        labels: {
          cluster: "production",
          node: "k8s-master-01",
          severity: "warning"
        },
        annotations: {
          description: "Consider cleaning up logs or expanding storage",
          runbook: "https://wiki.company.com/runbook/disk-pressure"
        },
        silenced: true
      }
    ];

    // Mock alert rules
    const mockRules = [
      {
        id: "rule-1",
        name: "HighCPUUsage",
        severity: "critical",
        condition: "cpu_usage > 90",
        duration: "5m",
        enabled: true,
        description: "Trigger when CPU usage exceeds 90% for 5 minutes",
        targets: ["slack#alerts", "pagerduty"]
      },
      {
        id: "rule-2",
        name: "MemoryPressure",
        severity: "warning", 
        condition: "memory_usage > 80",
        duration: "3m",
        enabled: true,
        description: "Trigger when memory usage exceeds 80% for 3 minutes",
        targets: ["slack#alerts"]
      },
      {
        id: "rule-3",
        name: "PodCrashLoop",
        severity: "critical",
        condition: "pod_restarts > 5",
        duration: "2m",
        enabled: true,
        description: "Trigger when pod restarts more than 5 times in 2 minutes",
        targets: ["slack#alerts", "pagerduty", "email"]
      },
      {
        id: "rule-4",
        name: "NodeNotReady",
        severity: "critical",
        condition: "node_status != ready",
        duration: "1m",
        enabled: true,
        description: "Trigger when node is not ready for 1 minute",
        targets: ["pagerduty", "sms"]
      },
      {
        id: "rule-5",
        name: "DiskPressure", 
        severity: "warning",
        condition: "disk_usage > 85",
        duration: "10m",
        enabled: false,
        description: "Trigger when disk usage exceeds 85% for 10 minutes",
        targets: ["slack#alerts"]
      }
    ];

    setAlerts(mockAlerts);
    setAlertRules(mockRules);
    setIsLoading(false);
  };

  // Alert actions
  const silenceAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, silenced: !alert.silenced } : alert
    ));
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: "resolved", endsAt: new Date().toISOString() }
        : alert
    ));
  };

  const deleteAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const createAlertRule = () => {
    const newRule = {
      id: `rule-${Date.now()}`,
      ...newAlertRule,
      enabled: true,
      targets: ["slack#alerts"]
    };
    setAlertRules(prev => [...prev, newRule]);
    setNewAlertRule({
      name: "",
      severity: "warning",
      condition: "cpu_usage",
      threshold: 80,
      duration: "5m"
    });
  };

  const toggleRule = (ruleId) => {
    setAlertRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  // Filter alerts based on active tab
  const filteredAlerts = alerts.filter(alert => {
    switch (activeTab) {
      case "active":
        return alert.status === "firing";
      case "resolved":
        return alert.status === "resolved";
      case "silenced":
        return alert.silenced;
      default:
        return true;
    }
  });

  // Status helpers
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical": return <AlertCircle className="text-red-400" size={20} />;
      case "warning": return <AlertTriangle className="text-yellow-400" size={20} />;
      case "info": return <Info className="text-blue-400" size={20} />;
      default: return <Bell className="text-gray-400" size={20} />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500";
      case "warning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
      case "info": return "bg-blue-500/20 text-blue-400 border-blue-500";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500";
    }
  };

  const getStatusColor = (status) => {
    return status === "firing" ? "bg-red-500" : "bg-green-500";
  };

  // Alert Card Component
  const AlertCard = ({ alert }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gray-900 rounded-2xl p-4 border-l-4 ${
        alert.severity === "critical" ? "border-red-500" :
        alert.severity === "warning" ? "border-yellow-500" : "border-blue-500"
      } ${alert.silenced ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0">
            {getSeverityIcon(alert.severity)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="text-white font-semibold text-lg">{alert.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(alert.severity)}`}>
                {alert.severity}
              </span>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(alert.status)}`} />
              {alert.silenced && (
                <VolumeX size={14} className="text-gray-400" />
              )}
            </div>
            <p className="text-gray-300 text-sm mb-2">{alert.summary}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <span className="flex items-center space-x-1">
                <Clock size={12} />
                <span>{formatDuration(alert.startsAt, alert.endsAt)}</span>
              </span>
              {alert.labels.node && (
                <span className="flex items-center space-x-1">
                  <Server size={12} />
                  <span>{alert.labels.node}</span>
                </span>
              )}
              {alert.labels.pod && (
                <span>Pod: {alert.labels.pod}</span>
              )}
            </div>
            {alert.annotations.description && (
              <p className="text-gray-400 text-sm mt-2">{alert.annotations.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {alert.status === "firing" && (
            <>
              <button
                onClick={() => silenceAlert(alert.id)}
                className={`p-2 rounded-lg transition ${
                  alert.silenced 
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" 
                    : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                }`}
                title={alert.silenced ? "Unsilence Alert" : "Silence Alert"}
              >
                {alert.silenced ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button
                onClick={() => resolveAlert(alert.id)}
                className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition"
                title="Resolve Alert"
              >
                <CheckCircle2 size={16} />
              </button>
            </>
          )}
          <button
            onClick={() => setSelectedAlert(alert)}
            className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition"
            title="View Details"
          >
            <Info size={16} />
          </button>
          <button
            onClick={() => deleteAlert(alert.id)}
            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
            title="Delete Alert"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Alert Rule Card Component
  const AlertRuleCard = ({ rule }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-2xl p-4 border border-gray-700"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center space-x-2">
              <Zap size={16} className={rule.enabled ? "text-cyan-400" : "text-gray-400"} />
              <h4 className="text-white font-semibold">{rule.name}</h4>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(rule.severity)}`}>
              {rule.severity}
            </span>
            <div className={`w-2 h-2 rounded-full ${rule.enabled ? "bg-green-500" : "bg-gray-500"}`} />
          </div>
          <p className="text-gray-300 text-sm mb-3">{rule.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Condition:</span>
              <span className="text-white ml-2 font-mono">{rule.condition} {rule.threshold}%</span>
            </div>
            <div>
              <span className="text-gray-400">Duration:</span>
              <span className="text-white ml-2">{rule.duration}</span>
            </div>
            <div>
              <span className="text-gray-400">Targets:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {rule.targets.map((target, index) => (
                  <span key={index} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                    {target}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => toggleRule(rule.id)}
            className={`p-2 rounded-lg transition ${
              rule.enabled 
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" 
                : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
            }`}
          >
            <BellRing size={16} />
          </button>
          <button className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Statistics
  const stats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === "firing").length,
    critical: alerts.filter(a => a.severity === "critical" && a.status === "firing").length,
    silenced: alerts.filter(a => a.silenced).length
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading alert data...</p>
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
      <div className="bg-gradient-to-r from-orange-900 to-red-900 p-6 rounded-2xl shadow-xl border border-orange-500">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🚨 Alert Manager</h1>
            <p className="text-orange-200">Real-time monitoring and alert management with AutoScaler AI</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMuted(!muted)}
              className={`p-3 rounded-2xl transition ${
                muted 
                  ? "bg-gray-500/20 text-gray-400" 
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <button
              onClick={loadAlertData}
              className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-3 rounded-2xl hover:bg-cyan-600 transition"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-6 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-orange-300 text-sm">Total Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{stats.active}</div>
            <div className="text-orange-300 text-sm">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.critical}</div>
            <div className="text-orange-300 text-sm">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">{stats.silenced}</div>
            <div className="text-orange-300 text-sm">Silenced</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 rounded-2xl p-2 border border-gray-700">
        <div className="flex space-x-1">
          {[
            { id: "active", label: "Active Alerts", icon: BellRing, count: stats.active },
            { id: "resolved", label: "Resolved", icon: CheckCircle2 },
            { id: "silenced", label: "Silenced", icon: VolumeX, count: stats.silenced },
            { id: "rules", label: "Alert Rules", icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all relative ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === "rules" ? (
          <>
            {/* Create New Rule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Create New Alert Rule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="Rule Name"
                  value={newAlertRule.name}
                  onChange={(e) => setNewAlertRule(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
                <select
                  value={newAlertRule.severity}
                  onChange={(e) => setNewAlertRule(prev => ({ ...prev, severity: e.target.value }))}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
                <select
                  value={newAlertRule.condition}
                  onChange={(e) => setNewAlertRule(prev => ({ ...prev, condition: e.target.value }))}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="cpu_usage">CPU Usage</option>
                  <option value="memory_usage">Memory Usage</option>
                  <option value="disk_usage">Disk Usage</option>
                  <option value="pod_restarts">Pod Restarts</option>
                  <option value="node_status">Node Status</option>
                </select>
                <input
                  type="number"
                  placeholder="Threshold %"
                  value={newAlertRule.threshold}
                  onChange={(e) => setNewAlertRule(prev => ({ ...prev, threshold: e.target.value }))}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={createAlertRule}
                  disabled={!newAlertRule.name}
                  className="bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Rule
                </button>
              </div>
            </motion.div>

            {/* Alert Rules List */}
            <div className="grid grid-cols-1 gap-4">
              {alertRules.map((rule) => (
                <AlertRuleCard key={rule.id} rule={rule} />
              ))}
            </div>
          </>
        ) : (
          /* Alerts List */
          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-2xl border border-gray-700">
                <CheckCircle2 size={48} className="mx-auto mb-4 text-green-400" />
                <h3 className="text-xl font-semibold text-white mb-2">No {activeTab} alerts</h3>
                <p className="text-gray-400">All clear! No {activeTab} alerts to display.</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))
            )}
          </div>
        )}
      </div>

      {/* Alert Details Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <AlertDetailsModal 
            alert={selectedAlert} 
            onClose={() => setSelectedAlert(null)}
            onSilence={() => silenceAlert(selectedAlert.id)}
            onResolve={() => resolveAlert(selectedAlert.id)}
            formatDuration={formatDuration}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Alert Details Modal Component
const AlertDetailsModal = ({ alert, onClose, onSilence, onResolve, formatDuration }) => (
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
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-cyan-400">{alert.name}</h3>
          <p className="text-gray-400">{alert.summary}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Information */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Alert Information</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Severity:</span>
              <span className={`font-medium ${
                alert.severity === 'critical' ? 'text-red-400' : 
                alert.severity === 'warning' ? 'text-yellow-400' : 'text-blue-400'
              }`}>
                {alert.severity.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className={`font-medium ${
                alert.status === 'firing' ? 'text-red-400' : 'text-green-400'
              }`}>
                {alert.status.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Started:</span>
              <span className="text-white">{new Date(alert.startsAt).toLocaleString()}</span>
            </div>
            {alert.endsAt && (
              <div className="flex justify-between">
                <span className="text-gray-400">Resolved:</span>
                <span className="text-white">{new Date(alert.endsAt).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white">
                {formatDuration(alert.startsAt, alert.endsAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Labels & Annotations */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Details</h4>
          <div className="space-y-3">
            <div>
              <span className="text-gray-400 text-sm">Description:</span>
              <p className="text-white mt-1">{alert.description}</p>
            </div>
            {alert.annotations.runbook && (
              <div>
                <span className="text-gray-400 text-sm">Runbook:</span>
                <a 
                  href={alert.annotations.runbook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 block mt-1"
                >
                  {alert.annotations.runbook}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Labels Grid */}
      <div className="mt-6">
        <h4 className="text-white font-semibold mb-3">Labels</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(alert.labels).map(([key, value]) => (
            <div key={key} className="bg-gray-800 rounded-lg p-2">
              <div className="text-cyan-400 text-sm font-mono">{key}</div>
              <div className="text-white text-sm">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      {alert.status === "firing" && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <h4 className="text-white font-semibold mb-4">Actions</h4>
          <div className="flex space-x-3">
            <button
              onClick={onSilence}
              className={`px-4 py-2 rounded-lg transition ${
                alert.silenced 
                  ? "bg-green-500 text-white hover:bg-green-600" 
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              {alert.silenced ? "Unsilence Alert" : "Silence Alert"}
            </button>
            <button
              onClick={onResolve}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Resolve Alert
            </button>
            {alert.annotations.runbook && (
              <a
                href={alert.annotations.runbook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View Runbook
              </a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  </motion.div>
);

export default Alerts;