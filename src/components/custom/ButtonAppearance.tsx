import { Card } from '@/components/ui/card';
import { ButtonTypeSelector } from './Customizer/ButtonCustomizer/ButtonTypeSelector';

export default function ButtonAppearance() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Buttons</h1>
      <div className="w-full space-y-8">
        <Card className="w-full gap-4 p-5">
          <ButtonTypeSelector />
        </Card>
      </div>
    </div>
  );
}
