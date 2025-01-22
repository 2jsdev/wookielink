'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCreateLinkMutation } from '@/lib/api/linksApi';
import { selectLinks } from '@/lib/store/slices/linksSlice';
import { X } from 'lucide-react';

interface CreateLinkFormProps {
  onClose: () => void;
}

const CreateLinkForm: React.FC<CreateLinkFormProps> = ({ onClose }) => {
  const [createLink] = useCreateLinkMutation();

  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');

  const links = useSelector(selectLinks);
  const order = links.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createLink({
        label,
        url,
        visible: false,
        archived: false,
        order,
      }).unwrap();

      setLabel('');
      setUrl('');
      onClose();
    } catch (error) {
      console.error('Failed to create link:', error);
    }
  };

  return (
    <Card className="mb-6 w-full transition-all duration-300 ease-in-out transform">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Add link</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
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
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
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
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="w-[48%]"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-[48%]">
              + Add link
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateLinkForm;
