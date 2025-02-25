import { Link, LinkLayout } from '@/interfaces/link';
import ClassicLinkItem from '@/components/admin/preview/classic-link-item';
import FeaturedLinkItem from '@/components/admin/preview/featured-link-item';

export default function LinkList({ links }: { links: Link[] }) {
  return (
    <div className="space-y-4 w-full">
      {links.map((link) =>
        link.layout === LinkLayout.Classic ? (
          <ClassicLinkItem key={link.id} link={link} />
        ) : (
          <FeaturedLinkItem key={link.id} link={link} />
        )
      )}
    </div>
  );
}
