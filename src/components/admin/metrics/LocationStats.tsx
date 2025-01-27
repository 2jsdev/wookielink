/* eslint-disable @next/next/no-img-element */
'use client';

import { useGetAnalyticsByTabQuery } from '@/lib/api/userApi';
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const PAGE_SIZE = 5;

export default function LocationStats() {
  const [tab, setTab] = useState<'country' | 'city'>('country');
  const [currentPage, setCurrentPage] = useState(1);

  const { data = [], isLoading, isError } = useGetAnalyticsByTabQuery({ tab });
  const totalPages = Math.ceil(data?.length / PAGE_SIZE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const paginatedStats = data?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Card className="w-full max-w-7xl mx-auto bg-card text-card-foreground">
      <CardHeader className="mb-4">
        <h2 className="text-lg font-bold">Locations</h2>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <ComposableMap projection="geoEqualEarth" width={800} height={400}>
            <Geographies geography="/data/world.geojson">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryStat = data.find(
                    ({ country }) => country === geo.properties.code
                  );

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="hsl(var(--primary))"
                      fillOpacity={
                        countryStat
                          ? Math.min(
                              0.2 + (countryStat.pageViews / 1000) * 0.8,
                              1
                            )
                          : 0.1
                      }
                      style={{
                        default: {
                          outline: 'none',
                          transition: 'fill-opacity 0.3s ease, fill 0.3s ease',
                        },
                        hover: {
                          fill: 'hsl(var(--secondary))',
                          fillOpacity: 1,
                          outline: 'none',
                        },
                        pressed: {
                          fill: 'hsl(var(--primary-foreground))',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-2">
          <Button
            variant={tab === 'country' ? 'default' : 'outline'}
            onClick={() => {
              setTab('country');
              setCurrentPage(1);
            }}
          >
            Country
          </Button>
          <Button
            variant={tab === 'city' ? 'default' : 'outline'}
            onClick={() => {
              setTab('city');
              setCurrentPage(1);
            }}
          >
            City
          </Button>
        </div>

        <ul className="space-y-4">
          {paginatedStats.map(
            ({ country, city, pageViews, clicks, clickRate }, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 bg-muted/10 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://flagcdn.com/w40/${(country || 'unknown').toLowerCase()}.png`}
                    alt={`${country || city} flag`}
                    className="w-10 h-6 rounded-md"
                  />
                  <div>
                    <p className="font-medium text-sm">{country || city}</p>
                    <p className="text-xs text-muted-foreground">
                      {pageViews} Views · {clicks} Clicks
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-primary">
                  {clickRate}
                </p>
              </li>
            )
          )}
        </ul>

        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            className="disabled:opacity-50"
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
