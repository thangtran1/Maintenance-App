import { MaintenanceConfig, MaintenanceData } from "@/types/maintenance";

export const maintenanceConfig: MaintenanceConfig = {
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  adminLoginUrl: import.meta.env.VITE_ADMIN_LOGIN_URL,
  mainAppUrl: import.meta.env.VITE_MAIN_APP_URL,
  redirectDelay: 2000, 
};

export const maintenanceFallbackData: MaintenanceData = {
  _id: "1",
  title: "Hệ thống đang bảo trì",
  description: "Chúng tôi đang kiểm tra trạng thái hệ thống.",
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 300000).toISOString(), // default +5 phút
  status: "scheduled",
  type: "OTHER",
  isActive: true,
  autoAdjusted: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as MaintenanceData;