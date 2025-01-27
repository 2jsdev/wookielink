import LifetimeMetricsCard from '@/components/admin/metrics/LifetimeMetricsCard';
import LocationStats from '@/components/admin/metrics/LocationStats';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <LifetimeMetricsCard />
      <LocationStats />
    </div>
  );
}
