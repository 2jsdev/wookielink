import LifetimeMetricsCard from '@/components/admin/analytics/lifetime-metrics-card';
import AudienceCard from '@/components/admin/analytics/audience-card';
import { getAudienceMetrics } from '@/actions/get-audience-metrics';

export default async function AnalyticsPage() {
  const metrics = await getAudienceMetrics();

  return (
    <div className="flex flex-col items-start gap-4 px-2 py-8">
      <LifetimeMetricsCard />
      <AudienceCard metrics={metrics} />
    </div>
  );
}
