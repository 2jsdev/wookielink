import { Link, LinkLayout } from '@/interfaces/Link';
import ClassicLinkItem from '@/components/admin/preview/ClassicLinkItem';
import FeaturedLinkItem from '@/components/admin/preview/FeaturedLinkItem';

export default function LinkList({ links }: { links: Link[] }) {
  return (
    <div className="space-y-3 w-full">
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
