import LinkItem from './LinkItem';

export default function LinkList({
  links,
  userProfile,
}: {
  links: any[];
  userProfile: any;
}) {
  console.log('links', links);
  return (
    <div className="space-y-3 w-full">
      {links.map((link) => (
        <LinkItem key={link.url} user={userProfile} link={link} />
      ))}
    </div>
  );
}
