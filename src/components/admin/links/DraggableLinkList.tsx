'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import LinkCard from './LinkCard';
import { useReorderLinksMutation } from '@/lib/api/linksApi';
import { reorderLinks } from '@/lib/store/slices/linksSlice';

interface DraggableLinkListProps {
  links: Array<{ id: string; order: number }>;
}

const DraggableLinkList: React.FC<DraggableLinkListProps> = ({ links }) => {
  const dispatch = useDispatch();
  const [reorderLinksMutation] = useReorderLinksMutation();

  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
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
      const oldIndex = links.findIndex((link) => link.id === active.id);
      const newIndex = links.findIndex((link) => link.id === over.id);

      const reorderedLinks = arrayMove([...links], oldIndex, newIndex);

      const orderedLinks = reorderedLinks.map((link, index) => ({
        ...link,
        order: index,
      }));

      dispatch(reorderLinks(orderedLinks));
      reorderLinksMutation({ orderedLinks });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={links} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {links.map((link) => (
            <SortableItem key={link.id} id={link.id}>
              <LinkCard id={link.id} isDragging={isDragging} />
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default DraggableLinkList;
