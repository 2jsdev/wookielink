'use client';

import { Card } from '@/components/ui/card';
import { ButtonTypeSelector } from './ButtonTypeSelector';

export function ButtonCustomizer() {
  return (
    <div className="w-full space-y-8">
      <h1 className="text-3xl font-bold mb-8">Buttons</h1>
      <div className="w-full space-y-8">
        <Card className="w-full gap-4 p-5">
          <ButtonTypeSelector />
        </Card>
      </div>
    </div>
  );
}
