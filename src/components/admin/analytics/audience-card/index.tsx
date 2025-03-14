'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LocationsTable } from './locations-table';
import { LocationsMap } from './locations-map';
import { DevicesChart } from './devices-chart';
import { AudienceMetricsData } from '@/actions/get-audience-metrics';

interface AudienceCardProps {
  metrics: AudienceMetricsData | null;
}

export default function AudienceCard({ metrics }: AudienceCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-3xl">Audience Metrics</CardTitle>
        <CardDescription>
          Comprehensive overview of your audience engagement and performance
          metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Locations</CardTitle>
            <CardDescription>
              View performance metrics by geographic location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">
                Geographic Distribution
              </h3>

              <LocationsMap locations={metrics?.locations || []} />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">
                Detailed Location Data
              </h3>
              <LocationsTable locations={metrics?.locations || []} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Devices</CardTitle>
            <CardDescription>
              View performance metrics by device type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DevicesChart devices={metrics?.devices || []} />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
