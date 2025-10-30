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

  const fetchMaintenanceData = useCallback(async () => {
    setIsLoading(true);
    setRefreshData(false);
    try {
      const response = await axios.get<MaintenanceResponse>(
        `${maintenanceConfig.backendUrl}/maintenance/current-status`,
        { timeout: 10000 }
      );

      if (response.data.success) {
        const { isUnderMaintenance, maintenance, estimatedDuration } =
          response.data.data;

        if (isUnderMaintenance && maintenance && estimatedDuration) {
          setIsSystemOperational(false);
          setMaintenanceData(maintenance);
          setEstimatedDuration(estimatedDuration);

          const endTime = new Date(maintenance.endTime).getTime();
          const now = Date.now();
          const msUntilEnd = endTime - now;

          if (msUntilEnd > 0) {
            setTimeout(() => {
              window.location.href = maintenanceConfig.mainAppUrl;
            }, msUntilEnd);
          } else {
            window.location.href = maintenanceConfig.mainAppUrl;
          }
        } else {
          setIsSystemOperational(true);
          setMaintenanceData(null);
          setEstimatedDuration(null);

          setTimeout(() => {
            window.location.href = maintenanceConfig.mainAppUrl;
          }, maintenanceConfig.redirectDelay);
        }
      }
    } catch (err) {
      setIsSystemOperational(false);
      setMaintenanceData(maintenanceFallbackData);
      setEstimatedDuration(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaintenanceData();

    return () => {
      if (endTimeoutRef.current) clearTimeout(endTimeoutRef.current);
    };
  }, [fetchMaintenanceData, refreshData]);

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
