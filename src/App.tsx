import { useEffect } from "react";
import { useMaintenanceData } from "@/hooks/useMaintenanceData";
import MaintenancePage from "@/components/MaintenancePage";
import LoadingScreen from "@/components/LoadingScreen";
import { maintenanceConfig } from "@/config/maintenance.config";
import { MaintenanceData } from "./types/maintenance";

function App() {
  const {
    maintenanceData,
    isLoading,
    isSystemOperational,
    refreshData,
    estimatedDuration,
  } = useMaintenanceData();

  useEffect(() => {
    if (isSystemOperational) {
      const timer = setTimeout(() => {
        window.location.href = maintenanceConfig.mainAppUrl;
      }, maintenanceConfig.redirectDelay);

      return () => clearTimeout(timer);
    }
  }, [isSystemOperational]);

  if (isLoading) {
    return <LoadingScreen message="Đang kiểm tra trạng thái hệ thống..." />;
  }

  if (isSystemOperational) {
    return (
      <LoadingScreen message="Hệ thống đã hoạt động trở lại! Đang chuyển hướng..." />
    );
  }

  return (
    <MaintenancePage
      data={maintenanceData as MaintenanceData}
      onRefresh={refreshData}
      estimatedDuration={estimatedDuration}
    />
  );
}

export default App;
