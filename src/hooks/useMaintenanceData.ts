import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { MaintenanceData, MaintenanceResponse } from "@/types/maintenance";
import { maintenanceConfig, maintenanceFallbackData } from "@/config/maintenance.config";

export const useMaintenanceData = () => {
  const [maintenanceData, setMaintenanceData] =
    useState<MaintenanceData | null>(null);
  const [estimatedDuration, setEstimatedDuration] = useState<number | null>(
    null
  );
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSystemOperational, setIsSystemOperational] = useState(false);
  const endTimeoutRef = useRef<number | null>(null);

  const fetchMaintenanceData = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    try {
      const response = await axios.get<MaintenanceResponse>(
        `${maintenanceConfig.backendUrl}/maintenance/current-status`,
        { timeout: 10000 }
      );

      if (response.data.success) {
        const { isUnderMaintenance, maintenance, estimatedDuration } =
          response.data.data;

        if (isUnderMaintenance && maintenance) {
          setIsSystemOperational(false);
          setMaintenanceData(maintenance);
          setEstimatedDuration(estimatedDuration);
        } else {
          setIsSystemOperational(true);
          setMaintenanceData(null);
          setEstimatedDuration(null);
        }
      }
    } catch (err) {
      // Khi backend lỗi/sập, coi như đang bảo trì với dữ liệu fallback
      setIsSystemOperational(false);
      setMaintenanceData(maintenanceFallbackData);
      setEstimatedDuration(null);
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Gọi lần đầu
    fetchMaintenanceData(false);

    // Setup polling định kỳ mỗi 5 giây để kiểm tra khi nào bảo trì kết thúc
    const interval = setInterval(() => {
      fetchMaintenanceData(true);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchMaintenanceData]);

  return {
    refreshData: async () => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1000)); // delay 1 giây khi click kiểm tra lại
      await fetchMaintenanceData();
      setIsLoading(false); // tắt loading
    },
    maintenanceData,
    isLoading,
    isSystemOperational,
    estimatedDuration,
  };
};
