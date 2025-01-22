import LinkItem from './LinkItem';

export default function LinkList({ links }: { links: any[] }) {
  return (
    <div className="space-y-3 w-full">
      {links.map((link) => (
        <LinkItem key={link.url} link={link} />
      ))}
    </div>
  );
}
