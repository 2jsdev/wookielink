import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { homeSections } from '@/config/homeSections';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';

const sectionComponents = {
  Hero,
  Features,
  Pricing,
  FAQ,
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {homeSections
          .filter((section) => section.showInPage)
          .map((section) => {
            const Component =
              sectionComponents[
                section.component as keyof typeof sectionComponents
              ];
            return <Component key={section.id} />;
          })}
      </main>
      <Footer />
    </div>
  );
}
