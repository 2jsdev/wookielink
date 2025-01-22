import { UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <UserX className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        User Not Found
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        We couldn&apos;t find the user you&apos;re looking for. They may have
        changed their username or the profile might not exist.
      </p>
      <Button
        onClick={() => window.history.back()}
        variant="outline"
        className="flex items-center"
      >
        Go Back
      </Button>
    </div>
  );
}
