import React from "react";
import { Card, Typography, Divider, Button } from "antd";
import { MaintenanceData } from "@/types/maintenance";
import { ArrowLeft, RefreshCw, Clock } from "lucide-react";

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

  const formatDuration = (minutes: number | null): string => {
    if (!minutes) return "khoảng vài giờ";
    const hours = minutes / 60;
    if (hours % 1 === 0) {
      return `${hours} giờ`;
    }
    const h = Math.floor(hours);
    const m = minutes % 60;
    if (h === 0) {
      return `${m} phút`;
    }
    return `${h} giờ ${m} phút`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <Card className="shadow-xl rounded-2xl w-full max-w-lg border border-slate-100 p-4">
        {/* Header Block */}
        <div className="text-center px-4">
          <Title level={3} className="!mb-2">
            {data.title || "Hệ thống đang bảo trì"}
          </Title>
          <Text type="secondary" className="text-[14px]">
            {data.description || "Chúng tôi đang tiến hành bảo trì hệ thống định kỳ."}
          </Text>
        </div>

        {/* Expected Duration Block */}
        <div className="my-6 p-5 bg-blue-50/50 border border-blue-100/50 rounded-xl text-center">
          <div className="text-blue-600 font-semibold text-xs flex justify-center items-center gap-1.5 mb-1.5 uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            Thời gian bảo trì dự kiến
          </div>
          <div className="text-xl font-bold text-slate-800">
            Trong vòng {formatDuration(estimatedDuration)}
          </div>
        </div>

        <Divider />

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            type="primary"
            icon={<RefreshCw className="w-4 h-4" />}
            size="large"
            onClick={onRefresh}
            className="flex items-center gap-1"
          >
            Kiểm tra lại
          </Button>

          <Button
            icon={<ArrowLeft className="w-4 h-4" />}
            size="large"
            onClick={handleBack}
            className="flex items-center gap-1"
          >
            Quay lại
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MaintenancePage;
