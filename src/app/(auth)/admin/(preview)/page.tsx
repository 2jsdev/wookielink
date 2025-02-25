import UserProfile from '@/components/admin/links/user-profile';
import AddLink from '@/components/admin/links/add-link';
import LinkList from '@/components/admin/links/link-list';

export default function AdminLinksPage() {
  return (
    <>
      <UserProfile />
      <AddLink />
      <LinkList />
    </>
  );
}
