export interface MaintenanceData {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: string;
  type: string;
  isActive: boolean;
  autoAdjusted: boolean;
  createdAt: string;
  updatedAt: string;
}



export interface MaintenanceResponse {
  success: boolean;
  message: string;
  data: {
    isUnderMaintenance: boolean;
    maintenance: MaintenanceData;
    estimatedDuration: number | null;
  };
}

export interface MaintenanceConfig {
  backendUrl: string;
  adminLoginUrl: string;
  mainAppUrl: string;
  redirectDelay: number;
}

export interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}
