import { Card } from '@/components/ui/card';
import { FontSelector } from './Customizer/FontCustomizer/FontSelector';

export default function FontAppearance() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Fonts</h1>
      <div className="w-full space-y-8">
        <Card className="w-full gap-4 p-5">
          <FontSelector />
        </Card>
      </div>
    </div>
  );
}
