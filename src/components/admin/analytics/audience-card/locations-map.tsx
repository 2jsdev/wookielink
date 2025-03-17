'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

interface LocationsMapProps {
  locations: {
    country: string;
    city: string;
    views: number;
    clicks: number;
    clickRate: number;
  }[];
}

export function LocationsMap({ locations }: LocationsMapProps) {
  const countryData = locations.reduce(
    (acc, location) => {
      const countryCode = location.country;

      if (!acc[countryCode]) {
        acc[countryCode] = {
          country: location.country,
          code: countryCode,
          totalViews: 0,
          totalClicks: 0,
          cities: [],
        };
      }

      acc[countryCode].totalViews += location.views;
      acc[countryCode].totalClicks += location.clicks;
      acc[countryCode].cities.push({
        name: location.city,
        views: location.views,
        clicks: location.clicks,
        clickRate: location.clickRate,
      });

      return acc;
    },
    {} as Record<string, any>
  );

  const countries = Object.values(countryData);
  const scale = typeof window !== 'undefined' ? Math.min(window.innerWidth / 5, 150) : 120;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <TooltipProvider>
        <div className="w-full max-w-3xl mx-auto overflow-hidden">
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale }}
            className="w-full h-auto"
          >
            <Geographies geography="/data/world.geojson">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryStat = countries.find(
                    (c) => c.code === geo.properties.code
                  );

                  return (
                    <Tooltip key={geo.rsmKey}>
                      <TooltipTrigger asChild>
                        <Geography
                          geography={geo}
                          stroke="#D6D6DA"
                          strokeWidth={0.5}
                          fill="hsl(var(--primary))"
                          fillOpacity={
                            countryStat
                              ? Math.min(
                                0.2 + (countryStat.totalViews / 1000) * 0.8,
                                1
                              )
                              : 0.1
                          }
                          style={{
                            default: {
                              outline: 'none',
                              transition:
                                'fill-opacity 0.3s ease, fill 0.3s ease',
                            },
                            hover: {
                              fill: countryStat && 'hsl(var(--primary))',
                              fillOpacity: 1,
                              outline: 'none',
                            },
                            pressed: { outline: 'none' },
                          }}
                        />
                      </TooltipTrigger>
                      {countryStat && (
                        <TooltipContent>
                          <div className="p-2">
                            <h3 className="font-bold">{countryStat.country}</h3>
                            <p>
                              Views: {countryStat.totalViews.toLocaleString()}
                            </p>
                            <p>
                              Clicks: {countryStat.totalClicks.toLocaleString()}
                            </p>
                            <p>
                              Click Rate:{' '}
                              {(
                                (countryStat.totalClicks /
                                  countryStat.totalViews) *
                                100
                              ).toFixed(1)}
                              %
                            </p>
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </TooltipProvider>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Fewer views</span>
        <div className="flex h-2">
          <div className="w-5 h-full bg-primary/10"></div>
          <div className="w-5 h-full bg-primary/30"></div>
          <div className="w-5 h-full bg-primary/50"></div>
          <div className="w-5 h-full bg-primary/70"></div>
          <div className="w-5 h-full bg-primary/90"></div>
        </div>
        <span className="text-sm text-muted-foreground">More views</span>
      </div>
    </div>
  );
}
