import { Eye, Link2, Percent } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getUserLifetimeMetrics } from '@/actions/get-user-lifetime-metrics';

export default async function LifetimeMetricsCard() {
  const metrics = await getUserLifetimeMetrics();

  const stats = [
    {
      icon: <Eye className="w-4 h-4" />,
      value: metrics.views.toLocaleString() ?? '-',
      label: 'Views',
      tooltip: 'Total number of views',
    },
    {
      icon: <Link2 className="w-4 h-4" />,
      value: metrics.clicks.toLocaleString() ?? '-',
      label: 'Clicks',
      tooltip: 'Total number of clicks',
    },
    {
      icon: <Percent className="w-4 h-4" />,
      value: metrics.clickRate
        ? `${(metrics.clickRate * 100).toFixed(2)}%`
        : '-',
      label: 'Click rate',
      tooltip: 'Percentage of views that resulted in clicks',
    },
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Lifetime</h2>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {stats.map((stat, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger className="cursor-help">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="bg-background rounded-md p-2 shadow-sm">
                        {stat.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-lg sm:text-2xl font-semibold">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stat.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
