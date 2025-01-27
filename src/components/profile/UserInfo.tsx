import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRound } from 'lucide-react';

export default function UserInfo({ userProfile }: { userProfile: any }) {
  return (
    <div className="flex flex-col items-center space-y-4 mb-8">
      <Avatar className="w-24 h-24">
        <AvatarImage src={userProfile?.image} alt="Profile photo" />
        <AvatarFallback>
          <UserRound className="w-2/3 h-2/3 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-semibold">@{userProfile.username}</h2>
    </div>
  );
}
