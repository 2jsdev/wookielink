import UserProfile from '@/components/admin/links/UserProfile';
import AddLink from '@/components/admin/links/AddLink';
import LinkList from '@/components/admin/links/LinkList';

export default function AdminLinksPage() {
  return (
    <>
      <UserProfile />
      <AddLink />
      <LinkList />
    </>
  );
}
