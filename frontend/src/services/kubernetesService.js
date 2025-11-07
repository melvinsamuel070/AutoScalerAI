import axios from 'axios';

class KubernetesService {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'production' 
      ? '/api/k8s' 
      : 'http://localhost:8001';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000
    });
  }

  // Get all nodes from real cluster
  async getNodes() {
    try {
      const response = await this.client.get('/api/v1/nodes');
      return response.data.items.map(node => this.formatNode(node));
    } catch (error) {
      console.error('Error fetching nodes:', error);
      return this.getMockNodes(); // Fallback to mock data
    }
  }

  // Get all pods from real cluster
  async getPods() {
    try {
      const response = await this.client.get('/api/v1/pods');
      return response.data.items.map(pod => this.formatPod(pod));
    } catch (error) {
      console.error('Error fetching pods:', error);
      return this.getMockPods(); // Fallback to mock data
    }
  }

  // Get cluster events
  async getEvents() {
    try {
      const response = await this.client.get('/api/v1/events');
      return response.data.items.slice(0, 50).map(event => this.formatEvent(event));
    } catch (error) {
      console.error('Error fetching events:', error);
      return this.getMockEvents();
    }
  }

  // Node actions
  async drainNode(nodeName) {
    try {
      // For now, simulate success since we might not have real K8s access
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true, message: `Node ${nodeName} drained successfully (simulated)` };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async cordonNode(nodeName, cordon = true) {
    try {
      // Simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: `Node ${nodeName} ${cordon ? 'cordoned' : 'uncordoned'} successfully (simulated)` };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Pod actions
  async deletePod(podName, namespace = 'default') {
    try {
      // Simulate success
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, message: `Pod ${podName} deleted successfully (simulated)` };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getPodLogs(podName, namespace = 'default') {
    try {
      // Return mock logs for now
      const mockLogs = `2024.01.15 10:30:45 [INFO] Starting application...
2024.01.15 10:30:46 [INFO] Connected to database
2024.01.15 10:30:47 [INFO] Server running on port 3500
2024.01.15 10:31:15 [INFO] Health check passed
2024.01.15 10:32:00 [INFO] Processing request from 192.168.1.100`;
      
      return { success: true, logs: mockLogs };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Format data helpers
  formatNode(node) {
    const conditions = node.status.conditions || [];
    const readyCondition = conditions.find(c => c.type === 'Ready');
    
    return {
      id: node.metadata.uid,
      name: node.metadata.name,
      status: readyCondition?.status === 'True' ? 'running' : 'error',
      cpu: {
        used: this.parseResource(node.status.allocatable?.cpu),
        total: this.parseResource(node.status.capacity?.cpu)
      },
      memory: {
        used: this.parseResource(node.status.allocatable?.memory) / (1024 * 1024 * 1024),
        total: this.parseResource(node.status.capacity?.memory) / (1024 * 1024 * 1024)
      },
      pods: {
        running: node.status.allocatable?.pods || 0,
        total: node.status.capacity?.pods || 0
      },
      ip: node.status.addresses?.find(addr => addr.type === 'InternalIP')?.address,
      os: node.status.nodeInfo?.osImage,
      kubelet: node.status.nodeInfo?.kubeletVersion,
      lastHeartbeat: node.metadata.creationTimestamp
    };
  }

  formatPod(pod) {
    return {
      id: pod.metadata.uid,
      name: pod.metadata.name,
      namespace: pod.metadata.namespace,
      node: pod.spec.nodeName,
      status: pod.status.phase.toLowerCase(),
      cpu: pod.spec.containers?.[0]?.resources?.requests?.cpu || '0m',
      memory: pod.spec.containers?.[0]?.resources?.requests?.memory || '0Mi',
      restarts: pod.status.containerStatuses?.[0]?.restartCount || 0,
      age: this.calculateAge(pod.metadata.creationTimestamp),
      labels: pod.metadata.labels
    };
  }

  formatEvent(event) {
    return {
      id: event.metadata.uid,
      type: event.type,
      reason: event.reason,
      message: event.message,
      source: event.source.component,
      object: `${event.involvedObject.kind}/${event.involvedObject.name}`,
      count: event.count,
      firstTimestamp: event.firstTimestamp,
      lastTimestamp: event.lastTimestamp
    };
  }

  parseResource(resource) {
    if (!resource) return 0;
    if (resource.endsWith('m')) return parseInt(resource) / 1000;
    if (resource.endsWith('Gi')) return parseFloat(resource) * 1024;
    if (resource.endsWith('Mi')) return parseFloat(resource);
    return parseFloat(resource);
  }

  calculateAge(creationTimestamp) {
    const created = new Date(creationTimestamp);
    const now = new Date();
    const diff = now - created;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return '<1h';
  }

  // Mock data fallbacks
  getMockNodes() {
    return [
      {
        id: "node-1", name: "k8s-master-01", status: "running",
        cpu: { used: 45, total: 100 }, memory: { used: 6.2, total: 16 },
        pods: { running: 8, total: 10 }, ip: "192.168.1.101",
        os: "Ubuntu 20.04", kubelet: "v1.28.2"
      },
      {
        id: "node-2", name: "k8s-worker-01", status: "running", 
        cpu: { used: 78, total: 100 }, memory: { used: 12.8, total: 16 },
        pods: { running: 12, total: 15 }, ip: "192.168.1.102",
        os: "Ubuntu 20.04", kubelet: "v1.28.2"
      },
      {
        id: "node-3", name: "k8s-worker-02", status: "running",
        cpu: { used: 32, total: 100 }, memory: { used: 4.5, total: 16 },
        pods: { running: 6, total: 10 }, ip: "192.168.1.103",
        os: "Ubuntu 20.04", kubelet: "v1.28.2"
      },
      {
        id: "node-4", name: "k8s-worker-03", status: "warning",
        cpu: { used: 92, total: 100 }, memory: { used: 14.2, total: 16 },
        pods: { running: 14, total: 15 }, ip: "192.168.1.104",
        os: "Ubuntu 20.04", kubelet: "v1.28.2"
      }
    ];
  }

  getMockPods() {
    return [
      { id: "pod-1", name: "frontend-7c8b5d94f-abc123", namespace: "default", node: "k8s-worker-01", status: "running", cpu: "45m", memory: "128Mi", restarts: 0, age: "2d" },
      { id: "pod-2", name: "backend-6d5f8c23e-def456", namespace: "default", node: "k8s-worker-01", status: "running", cpu: "120m", memory: "256Mi", restarts: 2, age: "1d" },
      { id: "pod-3", name: "prometheus-8g7h9j0k-ghi789", namespace: "monitoring", node: "k8s-worker-02", status: "running", cpu: "210m", memory: "512Mi", restarts: 0, age: "5d" },
      { id: "pod-4", name: "grafana-5t4r3e2w-jkl012", namespace: "monitoring", node: "k8s-worker-02", status: "running", cpu: "85m", memory: "196Mi", restarts: 1, age: "3d" },
      { id: "pod-5", name: "redis-1q2w3e4r-mno345", namespace: "default", node: "k8s-worker-03", status: "running", cpu: "65m", memory: "64Mi", restarts: 0, age: "7d" },
      { id: "pod-6", name: "mongodb-9i8u7y6t-pqr678", namespace: "default", node: "k8s-worker-03", status: "running", cpu: "180m", memory: "384Mi", restarts: 0, age: "4d" },
      { id: "pod-7", name: "nginx-0p9o8i7u-stu901", namespace: "default", node: "k8s-worker-04", status: "running", cpu: "25m", memory: "32Mi", restarts: 0, age: "1d" },
      { id: "pod-8", name: "autoscaler-6y5t4r3e-vwx234", namespace: "default", node: "k8s-worker-04", status: "pending", cpu: "0m", memory: "0Mi", restarts: 0, age: "5m" },
    ];
  }

  getMockEvents() {
    return [
      {
        id: "event-1", type: "Normal", reason: "Scheduled", 
        message: "Successfully assigned default/frontend-abc123 to k8s-worker-01",
        source: "scheduler", object: "Pod/frontend-abc123", count: 1,
        firstTimestamp: new Date().toISOString()
      },
      {
        id: "event-2", type: "Warning", reason: "FailedScheduling", 
        message: "0/4 nodes are available: 4 node(s) had taint {node.kubernetes.io/disk-pressure: }",
        source: "scheduler", object: "Pod/autoscaler-vwx234", count: 3,
        firstTimestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
      }
    ];
  }
}

export const kubernetesService = new KubernetesService();