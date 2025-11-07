import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon,
  User,
  Shield,
  Database,
  Bell,
  Download,
  Upload,
  Trash2,
  Key,
  Cpu,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Server,
  Zap
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    clusterName: "AutoScaler AI Production",
    timezone: "UTC",
    refreshInterval: 30,
    theme: "dark",
    language: "en"
  });

  const [authSettings, setAuthSettings] = useState({
    enabled: true,
    sessionTimeout: 60,
    requireMFA: false,
    maxLoginAttempts: 5
  });

  const [userProfile, setUserProfile] = useState({
    username: "admin",
    email: "admin@autoscaler.ai",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    slackAlerts: false,
    pushNotifications: true,
    criticalOnly: false,
    alertFrequency: "realtime"
  });

  const [systemSettings, setSystemSettings] = useState({
    logRetention: 30,
    maxLogSize: "100MB",
    backupEnabled: true,
    backupFrequency: "daily",
    autoUpdate: true
  });

  const [apiSettings, setApiSettings] = useState({
    enabled: true,
    rateLimit: 1000,
    corsOrigins: ["https://autoscaler.ai"],
    apiKey: "ask_****************",
    showApiKey: false
  });

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const saveSettings = async (settingsType) => {
    setIsLoading(true);
    setSaveStatus("saving");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaveStatus("saved");
    setIsLoading(false);
    
    // Clear success status after 3 seconds
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const exportSettings = () => {
    const settings = {
      general: generalSettings,
      auth: authSettings,
      notifications: notificationSettings,
      system: systemSettings,
      api: apiSettings
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `autoscaler-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target.result);
          // Validate and set settings
          if (settings.general) setGeneralSettings(settings.general);
          if (settings.auth) setAuthSettings(settings.auth);
          if (settings.notifications) setNotificationSettings(settings.notifications);
          if (settings.system) setSystemSettings(settings.system);
          if (settings.api) setApiSettings(settings.api);
          
          setSaveStatus("imported");
          setTimeout(() => setSaveStatus(null), 3000);
        } catch (error) {
          setSaveStatus("error");
          setTimeout(() => setSaveStatus(null), 3000);
        }
      };
      reader.readAsText(file);
    }
  };

  const resetSettings = () => {
    if (window.confirm("Are you sure you want to reset all settings to default? This action cannot be undone.")) {
      // Reset to default values
      setGeneralSettings({
        clusterName: "AutoScaler AI Production",
        timezone: "UTC",
        refreshInterval: 30,
        theme: "dark",
        language: "en"
      });
      
      setSaveStatus("reset");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // System Information (mock data)
  const systemInfo = {
    version: "v2.1.0",
    build: "2024.01.15-rc1",
    uptime: "15 days, 8 hours",
    cluster: {
      nodes: 4,
      pods: 28,
      services: 12
    },
    resources: {
      cpu: "45% avg",
      memory: "68% used",
      storage: "1.2TB / 2TB",
      network: "2.4 Gbps"
    }
  };

  // Tab configuration
  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "authentication", label: "Authentication", icon: Shield },
    { id: "profile", label: "User Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "system", label: "System", icon: Database },
    { id: "api", label: "API", icon: Key },
    { id: "about", label: "About", icon: Server }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings 
          settings={generalSettings} 
          onChange={setGeneralSettings}
          onSave={() => saveSettings("general")}
        />;
      case "authentication":
        return <AuthenticationSettings 
          settings={authSettings} 
          onChange={setAuthSettings}
          onSave={() => saveSettings("authentication")}
        />;
      case "profile":
        return <UserProfileSettings 
          profile={userProfile} 
          onChange={setUserProfile}
          onSave={() => saveSettings("profile")}
        />;
      case "notifications":
        return <NotificationSettings 
          settings={notificationSettings} 
          onChange={setNotificationSettings}
          onSave={() => saveSettings("notifications")}
        />;
      case "system":
        return <SystemSettings 
          settings={systemSettings} 
          onChange={setSystemSettings}
          onSave={() => saveSettings("system")}
        />;
      case "api":
        return <ApiSettings 
          settings={apiSettings} 
          onChange={setApiSettings}
          onSave={() => saveSettings("api")}
        />;
      case "about":
        return <AboutSystem systemInfo={systemInfo} />;
      default:
        return null;
    }
  };

  if (isLoading && activeTab !== "about") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading settings...</p>
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
      <div className="bg-gradient-to-r from-gray-900 to-cyan-900 p-6 rounded-2xl shadow-xl border border-cyan-500">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">⚙️ Settings</h1>
            <p className="text-cyan-200">Configure your AutoScaler AI platform and preferences</p>
          </div>
          <div className="flex items-center space-x-3">
            {saveStatus && (
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                saveStatus === "saved" || saveStatus === "imported" || saveStatus === "reset" 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-red-500/20 text-red-400"
              }`}>
                {saveStatus === "saved" && <CheckCircle2 size={16} />}
                {saveStatus === "error" && <AlertCircle size={16} />}
                <span className="text-sm capitalize">{saveStatus}</span>
              </div>
            )}
            <button
              onClick={exportSettings}
              className="flex items-center space-x-2 bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/30 transition"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
            <label className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition cursor-pointer">
              <Upload size={16} />
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={importSettings}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-700">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Danger Zone */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <button
                onClick={resetSettings}
                className="flex items-center space-x-3 w-full px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition"
              >
                <Trash2 size={18} />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// General Settings Component
const GeneralSettings = ({ settings, onChange, onSave }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-cyan-400">General Settings</h2>
      <button
        onClick={onSave}
        className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Cluster Name
        </label>
        <input
          type="text"
          value={settings.clusterName}
          onChange={(e) => onChange({ ...settings, clusterName: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Timezone
        </label>
        <select
          value={settings.timezone}
          onChange={(e) => onChange({ ...settings, timezone: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="UTC">UTC</option>
          <option value="EST">Eastern Time</option>
          <option value="PST">Pacific Time</option>
          <option value="CET">Central European</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Refresh Interval (seconds)
        </label>
        <input
          type="number"
          value={settings.refreshInterval}
          onChange={(e) => onChange({ ...settings, refreshInterval: parseInt(e.target.value) })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
          min="5"
          max="300"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Theme
        </label>
        <select
          value={settings.theme}
          onChange={(e) => onChange({ ...settings, theme: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Language
        </label>
        <select
          value={settings.language}
          onChange={(e) => onChange({ ...settings, language: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
    </div>
  </div>
);

// Authentication Settings Component
const AuthenticationSettings = ({ settings, onChange, onSave }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-cyan-400">Authentication</h2>
      <button
        onClick={onSave}
        className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>

    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div>
          <h3 className="text-white font-medium">Enable Authentication</h3>
          <p className="text-gray-400 text-sm">Require login to access the dashboard</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => onChange({ ...settings, enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => onChange({ ...settings, sessionTimeout: parseInt(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            min="5"
            max="480"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Max Login Attempts
          </label>
          <input
            type="number"
            value={settings.maxLoginAttempts}
            onChange={(e) => onChange({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            min="1"
            max="10"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div>
          <h3 className="text-white font-medium">Require Multi-Factor Authentication</h3>
          <p className="text-gray-400 text-sm">Add an extra layer of security with MFA</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.requireMFA}
            onChange={(e) => onChange({ ...settings, requireMFA: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
        </label>
      </div>
    </div>
  </div>
);

// User Profile Settings Component
const UserProfileSettings = ({ profile, onChange, onSave }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-cyan-400">User Profile</h2>
      <button
        onClick={onSave}
        className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          value={profile.username}
          onChange={(e) => onChange({ ...profile, username: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => onChange({ ...profile, email: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={profile.showPassword ? "text" : "password"}
            value={profile.currentPassword}
            onChange={(e) => onChange({ ...profile, currentPassword: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 pr-10"
          />
          <button
            type="button"
            onClick={() => onChange({ ...profile, showPassword: !profile.showPassword })}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
          >
            {profile.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={profile.showPassword ? "text" : "password"}
            value={profile.newPassword}
            onChange={(e) => onChange({ ...profile, newPassword: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 pr-10"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={profile.showPassword ? "text" : "password"}
            value={profile.confirmPassword}
            onChange={(e) => onChange({ ...profile, confirmPassword: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 pr-10"
          />
        </div>
      </div>
    </div>

    <div className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
      <div className="flex items-center space-x-2 text-yellow-400">
        <AlertCircle size={16} />
        <span className="text-sm font-medium">Password Requirements</span>
      </div>
      <ul className="text-yellow-300 text-sm mt-2 space-y-1">
        <li>• Minimum 8 characters</li>
        <li>• At least one uppercase letter</li>
        <li>• At least one number</li>
        <li>• At least one special character</li>
      </ul>
    </div>
  </div>
);

// Notification Settings Component
const NotificationSettings = ({ settings, onChange, onSave }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-cyan-400">Notifications</h2>
      <button
        onClick={onSave}
        className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>

    <div className="space-y-4">
      {[
        { key: 'emailAlerts', label: 'Email Alerts', description: 'Receive alert notifications via email' },
        { key: 'slackAlerts', label: 'Slack Alerts', description: 'Send alerts to Slack channels' },
        { key: 'pushNotifications', label: 'Push Notifications', description: 'Mobile push notifications for critical alerts' },
        { key: 'criticalOnly', label: 'Critical Alerts Only', description: 'Only receive notifications for critical severity alerts' }
      ].map((item) => (
        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <h3 className="text-white font-medium">{item.label}</h3>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings[item.key]}
              onChange={(e) => onChange({ ...settings, [item.key]: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>
      ))}

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Alert Frequency
        </label>
        <select
          value={settings.alertFrequency}
          onChange={(e) => onChange({ ...settings, alertFrequency: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="realtime">Real-time</option>
          <option value="hourly">Hourly Digest</option>
          <option value="daily">Daily Summary</option>
        </select>
      </div>
    </div>
  </div>
);

// System Settings Component
const SystemSettings = ({ settings, onChange, onSave }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-cyan-400">System Settings</h2>
      <button
        onClick={onSave}
        className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Log Retention (days)
        </label>
        <input
          type="number"
          value={settings.logRetention}
          onChange={(e) => onChange({ ...settings, logRetention: parseInt(e.target.value) })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
          min="1"
          max="365"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Max Log Size
        </label>
        <select
          value={settings.maxLogSize}
          onChange={(e) => onChange({ ...settings, maxLogSize: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="50MB">50 MB</option>
          <option value="100MB">100 MB</option>
          <option value="500MB">500 MB</option>
          <option value="1GB">1 GB</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Backup Frequency
        </label>
        <select
          value={settings.backupFrequency}
          onChange={(e) => onChange({ ...settings, backupFrequency: e.target.value })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>

    <div className="space-y-4">
      {[
        { key: 'backupEnabled', label: 'Enable Automatic Backups', description: 'Automatically backup configuration and data' },
        { key: 'autoUpdate', label: 'Automatic Updates', description: 'Automatically install security updates' }
      ].map((item) => (
        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div>
            <h3 className="text-white font-medium">{item.label}</h3>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings[item.key]}
              onChange={(e) => onChange({ ...settings, [item.key]: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>
      ))}
    </div>
  </div>
);

// API Settings Component
const ApiSettings = ({ settings, onChange, onSave }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-cyan-400">API Settings</h2>
      <button
        onClick={onSave}
        className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
      >
        <Save size={16} />
        <span>Save Changes</span>
      </button>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div>
          <h3 className="text-white font-medium">Enable API Access</h3>
          <p className="text-gray-400 text-sm">Allow external applications to access AutoScaler AI API</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(e) => onChange({ ...settings, enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Rate Limit (requests/hour)
          </label>
          <input
            type="number"
            value={settings.rateLimit}
            onChange={(e) => onChange({ ...settings, rateLimit: parseInt(e.target.value) })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            min="100"
            max="10000"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            API Key
          </label>
          <div className="relative">
            <input
              type={settings.showApiKey ? "text" : "password"}
              value={settings.apiKey}
              readOnly
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 pr-20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={() => onChange({ ...settings, showApiKey: !settings.showApiKey })}
                className="text-gray-400 hover:text-gray-300 mr-2"
              >
                {settings.showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(settings.apiKey)}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          CORS Origins
        </label>
        <textarea
          value={settings.corsOrigins.join('\n')}
          onChange={(e) => onChange({ ...settings, corsOrigins: e.target.value.split('\n') })}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 h-24"
          placeholder="https://example.com&#10;https://app.example.com"
        />
        <p className="text-gray-400 text-sm mt-1">Enter one origin per line</p>
      </div>
    </div>
  </div>
);

// About System Component
const AboutSystem = ({ systemInfo }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-cyan-400">About AutoScaler AI</h2>
    
    {/* Version Info */}
    <div className="bg-gray-800 rounded-2xl p-6 border border-cyan-500">
      <div className="flex items-center space-x-3 mb-4">
        <Zap className="text-cyan-400" size={32} />
        <div>
          <h3 className="text-2xl font-bold text-white">AutoScaler AI</h3>
          <p className="text-cyan-400">Intelligent Kubernetes Cluster Management</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-cyan-400 text-sm">Version</div>
          <div className="text-white font-semibold">{systemInfo.version}</div>
        </div>
        <div className="text-center">
          <div className="text-cyan-400 text-sm">Build</div>
          <div className="text-white font-semibold">{systemInfo.build}</div>
        </div>
        <div className="text-center">
          <div className="text-cyan-400 text-sm">Uptime</div>
          <div className="text-white font-semibold">{systemInfo.uptime}</div>
        </div>
        <div className="text-center">
          <div className="text-cyan-400 text-sm">Status</div>
          <div className="text-green-400 font-semibold">Operational</div>
        </div>
      </div>
    </div>

    {/* Cluster Overview */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Server size={20} />
          <span>Cluster Overview</span>
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Nodes</span>
            <span className="text-white font-semibold">{systemInfo.cluster.nodes}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Pods</span>
            <span className="text-white font-semibold">{systemInfo.cluster.pods}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Services</span>
            <span className="text-white font-semibold">{systemInfo.cluster.services}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Cpu size={20} />
          <span>Resource Usage</span>
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">CPU</span>
            <span className="text-green-400 font-semibold">{systemInfo.resources.cpu}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Memory</span>
            <span className="text-yellow-400 font-semibold">{systemInfo.resources.memory}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Storage</span>
            <span className="text-blue-400 font-semibold">{systemInfo.resources.storage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network</span>
            <span className="text-purple-400 font-semibold">{systemInfo.resources.network}</span>
          </div>
        </div>
      </div>
    </div>

    {/* System Information */}
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">System Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-cyan-400 font-medium mb-2">Features</h4>
          <ul className="text-gray-300 space-y-1">
            <li>• AI-Powered Auto Scaling</li>
            <li>• Real-time Monitoring</li>
            <li>• Alert Management</li>
            <li>• Multi-cluster Support</li>
            <li>• REST API</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cyan-400 font-medium mb-2">Support</h4>
          <ul className="text-gray-300 space-y-1">
            <li>• Documentation: docs.autoscaler.ai</li>
            <li>• Support: support@autoscaler.ai</li>
            <li>• Community: community.autoscaler.ai</li>
            <li>• Status: status.autoscaler.ai</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;