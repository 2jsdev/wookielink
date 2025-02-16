'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { addUserLink } from '@/actions/addUserLink';
import useLinkStore from '@/store/linkStore';
import { useToast } from '@/hooks/use-toast';

interface CreateLinkFormProps {
  onClose: () => void;
}

const CreateLinkForm: React.FC<CreateLinkFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addLink } = useLinkStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await addUserLink({ title, url });

      if (!response.ok) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: response.message,
        });
        return;
      }

      if (response.data) {
        addLink(response.data);
        setTitle('');
        setUrl('');
        onClose();
      }
    } catch (error) {
      console.error('Failed to create link:', error);
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6 w-full transition-all duration-300 ease-in-out transform">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Add link</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          disabled={isLoading}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="label" className="text-sm font-medium">
              Label
            </Label>
            <Input
              id="label"
              placeholder="Enter label"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium">
              URL
            </Label>
            <Input
              id="url"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="w-[48%]"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-[48%]" disabled={isLoading}>
              {isLoading ? 'Adding...' : '+ Add link'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateLinkForm;
