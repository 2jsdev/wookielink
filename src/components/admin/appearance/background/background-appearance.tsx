import { BackgroundCustomizer } from '@/components/admin/appearance/background/background-customizer';

export default function BackgroundAppearance() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Custom appearance</h1>
      <p className="mb-6">
        Completely customize your Wookielink profile. Change your background
        with colors, gradients and images. Choose a button style, change the
        typeface and more.
      </p>

      <BackgroundCustomizer />
    </div>
  );
}
