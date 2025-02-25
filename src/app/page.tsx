import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { homeSections } from '@/config/home-sections';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Pricing } from '@/components/pricing';
import { FAQ } from '@/components/faq';

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
