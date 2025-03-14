'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface DevicesChartProps {
  devices: {
    deviceType: string;
    views: number;
    clicks: number;
    clickRate: number;
  }[];
}

export function DevicesChart({ devices }: DevicesChartProps) {
  const viewsData = devices.map((device) => ({
    name: device.deviceType,
    value: device.views,
    percentage: (
      (device.views / devices.reduce((sum, d) => sum + d.views, 0)) *
      100
    ).toFixed(1),
  }));

  const clicksData = devices.map((device) => ({
    name: device.deviceType,
    value: device.clicks,
    percentage: (
      (device.clicks / devices.reduce((sum, d) => sum + d.clicks, 0)) *
      100
    ).toFixed(1),
  }));

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
  ];

  return (
    <div className="w-full space-y-8">
      <div className="w-full">
        <ChartContainer
          config={{
            views: {
              label: 'Views by Device',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={viewsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {viewsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="w-full">
        <h3 className="text-lg font-medium mb-4">Device Performance Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {devices.map((device, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h4 className="font-medium text-lg">{device.deviceType}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-muted-foreground">
                  Views:{' '}
                  <span className="font-medium text-foreground">
                    {device.views.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Clicks:{' '}
                  <span className="font-medium text-foreground">
                    {device.clicks.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Click Rate:{' '}
                  <span className="font-medium text-foreground">
                    {device.clickRate.toFixed(1)}%
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border rounded-md shadow-sm">
        <p className="font-medium">{`${payload[0].name}`}</p>
        <p className="text-sm">{`${payload[0].value.toLocaleString()} (${payload[0].payload.percentage}%)`}</p>
      </div>
    );
  }

  return null;
}
