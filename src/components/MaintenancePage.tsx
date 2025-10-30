import React from "react";
import { Card, Typography, Divider, Space, Button } from "antd";
import CountdownTimer from "./CountdownTimer";
import { MaintenanceData } from "@/types/maintenance";
import { ArrowLeft, Lock, RefreshCw } from "lucide-react";
import { maintenanceConfig } from "@/config/maintenance.config";

const { Title, Text } = Typography;

interface MaintenancePageProps {
  data: MaintenanceData;
  estimatedDuration: number | null;
  onRefresh: () => void;
}

const MaintenancePage: React.FC<MaintenancePageProps> = ({
  data,
  estimatedDuration,
  onRefresh,
}) => {
  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.close();
  };

  const handleAdminLogin = () => {
    window.open(maintenanceConfig.adminLoginUrl, "_blank");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-100 p-6">
      <Card className="shadow-2xl rounded-2xl w-full max-w-xl">
        <div className="text-center p-4">
          <Title level={3}>{data.title}</Title>
          <Text>{data.description}</Text>
        </div>

        <CountdownTimer
          endTime={data.endTime}
          isActive={data.isActive}
          estimatedDuration={estimatedDuration}
        />

        <Divider />

        <div className="flex gap-2 justify-center">
          <Button
            color="primary"
            variant="outlined"
            icon={<RefreshCw className="relative top-[3px]" />}
            size="large"
            onClick={onRefresh}
          >
            Kiểm tra lại
          </Button>

          <Button
            danger
            icon={<ArrowLeft className="relative top-[3px]" />}
            size="large"
            onClick={handleBack}
          >
            Đóng trang
          </Button>
        </div>

        <Divider />

        <Space direction="vertical" align="center" className="w-full">
          <Button
            icon={<Lock />}
            type="dashed"
            size="large"
            onClick={handleAdminLogin}
          >
            Đăng nhập Admin
          </Button>
          <Text type="secondary" className="text-sm text-center">
            Lưu ý: Admin có thể truy cập hệ thống trong thời gian bảo trì
          </Text>
        </Space>

        <Divider />

        <Space
          direction="vertical"
          align="center"
          className="text-center w-full"
        >
          <Text type="secondary">
            🔄 Trang này sẽ tự động làm mới mỗi 30 giây
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default MaintenancePage;
