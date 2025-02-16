import { Link, LinkLayout } from '@/interfaces/Link';
import ClassicLinkItem from './ClassicLinkItem';
import FeaturedLinkItem from './FeaturedLinkItem';

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
