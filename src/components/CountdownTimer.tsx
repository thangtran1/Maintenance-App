import React from "react";
import { Progress, Typography, Space } from "antd";
import { useCountdown } from "@/hooks/useCountdown";
import { CheckCircle, Clock } from "lucide-react";

const { Text } = Typography;

interface CountdownTimerProps {
  endTime: string;
  isActive: boolean;
  estimatedDuration: number | null;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endTime,
  isActive,
  estimatedDuration,
}) => {
  const { getFormattedTime, getProgressPercentage, isExpired } =
    useCountdown(endTime);

  if (!isActive) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <Space direction="vertical" size="small" className="w-full text-center">
        <div className="flex justify-center items-center gap-2">
          <div className="text-gray-700 text-[20px]">
            Tổng thời gian bảo trì: <strong>{estimatedDuration}</strong> phút
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Clock className="text-blue-500 text-lg" />
          <Text strong className="text-gray-100">
            Thời gian dự kiến hoàn thành:
          </Text>
          <Text className="text-lg font-mono text-blue-600">
            {getFormattedTime()}
          </Text>
        </div>
        <div></div>

        {!isExpired && (
          <Progress
            percent={Math.round(getProgressPercentage())}
            strokeColor="#1677ff"
            trailColor="#e5e7eb"
            status="active"
            className="mt-3"
          />
        )}

        {isExpired && (
          <Space align="center" className="justify-center">
            <CheckCircle className="text-green-500 text-lg" />
            <Text type="success" className="font-medium">
              Bảo trì đã hoàn thành! Đang chuyển hướng...
            </Text>
          </Space>
        )}
      </Space>
    </div>
  );
};

export default CountdownTimer;
