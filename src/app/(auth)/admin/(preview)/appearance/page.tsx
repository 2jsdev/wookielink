// import ThemeSelector from '@/components/custom/Customizer/ThemeSelector';
import BackgroundAppearance from '@/components/admin/appearance/background/background-appearance';
import ButtonAppearance from '@/components/admin/appearance/button/button-appearance';
import FontAppearance from '@/components/admin/appearance/font/font-appearance';

export default function AppearancePage() {
  return (
    <>
      {/* <ThemeSelector /> */}
      <BackgroundAppearance />
      <ButtonAppearance />
      <FontAppearance />
    </>
  );
}
