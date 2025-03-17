'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface LocationsTableProps {
  locations: {
    country: string;
    city: string;
    views: number;
    clicks: number;
    clickRate: number;
  }[];
}

type SortField = 'country' | 'city' | 'views' | 'clicks' | 'clickRate';
type SortDirection = 'asc' | 'desc';

export function LocationsTable({ locations }: LocationsTableProps) {
  const [sortField, setSortField] = useState<SortField>('views');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedLocations = [...locations].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortField === 'country' || sortField === 'city') {
      return sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    }

    return sortDirection === 'asc'
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[25%]">
            <Button
              variant="ghost"
              onClick={() => handleSort('country')}
              className="flex items-center gap-1 font-medium text-xs sm:text-sm"
            >
              Country
              <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </TableHead>
          <TableHead className="w-[25%]">
            <Button
              variant="ghost"
              onClick={() => handleSort('city')}
              className="flex items-center gap-1 font-medium text-xs sm:text-sm"
            >
              City
              <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">
            <Button
              variant="ghost"
              onClick={() => handleSort('views')}
              className="flex items-center gap-1 font-medium ml-auto text-xs sm:text-sm"
            >
              Views
              <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">
            <Button
              variant="ghost"
              onClick={() => handleSort('clicks')}
              className="flex items-center gap-1 font-medium ml-auto text-xs sm:text-sm"
            >
              Clicks
              <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </TableHead>
          <TableHead className="text-right">
            <Button
              variant="ghost"
              onClick={() => handleSort('clickRate')}
              className="flex items-center gap-1 font-medium ml-auto text-xs sm:text-sm"
            >
              Click Rate
              <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedLocations.map((location, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-xs sm:text-sm">
              {location.country}
            </TableCell>
            <TableCell className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              {location.city}
            </TableCell>
            <TableCell className="text-right text-xs sm:text-sm">
              {location.views.toLocaleString()}
            </TableCell>
            <TableCell className="text-right text-xs sm:text-sm">
              {location.clicks.toLocaleString()}
            </TableCell>
            <TableCell className="text-right text-xs sm:text-sm">
              {location.clickRate.toFixed(1)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
