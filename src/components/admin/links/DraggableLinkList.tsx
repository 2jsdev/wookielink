'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import LinkCard from './cards/LinkCard';
import { Link } from '@/interfaces/Link';
import { reorderUserLinks } from '@/actions/reorderUserLinks';
import useLinkStore from '@/store/linkStore';
import { Link as LinkIcon } from 'lucide-react';

export default function DraggableLinkList() {
  const { links, setLinks } = useLinkStore();
  const [orderedLinks, setOrderedLinks] = useState<Link[]>(links);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setOrderedLinks(links);
  }, [links]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = async ({
    active,
    over,
  }: {
    active: any;
    over: any;
  }) => {
    setIsDragging(false);

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = orderedLinks.findIndex((item) => item.id === active.id);
      const newIndex = orderedLinks.findIndex((item) => item.id === over.id);
      const newOrderedLinks = arrayMove(orderedLinks, oldIndex, newIndex);

      const newOrderLinks = newOrderedLinks.map((link, index) => ({
        ...link,
        position: index,
      }));

      const linksBackup = [...links];

      setLinks(newOrderedLinks);

      try {
        await reorderUserLinks(newOrderLinks);
      } catch (error) {
        console.error('Error reordering links:', error);
        setLinks(linksBackup);
      }
    }
  };

  if (!links || links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-muted-foreground mt-32">
        <LinkIcon className="w-20 h-20" />

        <p className="text-center text-md mt-8 font-medium">
          Show the world who you are.
          <br />
          Add a link to get started.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={links} strategy={verticalListSortingStrategy}>
        {links.map((link) => (
          <SortableItem key={link.id} id={link.id}>
            <LinkCard link={link} isDragging={isDragging} />
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id,
      animateLayoutChanges: () => false,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${isDragging ? 1.05 : 1})`
      : undefined,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {React.isValidElement(children)
        ? React.cloneElement(children, { isDragging, listeners } as any)
        : children}
    </div>
  );
};
