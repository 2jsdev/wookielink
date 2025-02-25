// import ThemeSelector from '@/components/custom/Customizer/ThemeSelector';
import CustomAppearance from '@/components/custom/CustomAppearance';
import ButtonAppearance from '@/components/custom/ButtonAppearance';
import FontAppearance from '@/components/custom/FontAppearance';

export default function AppearancePage() {
  return (
    <>
      {/* <ThemeSelector /> */}
      <CustomAppearance />
      <ButtonAppearance />
      <FontAppearance />
    </>
  );
}
