'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LayoutPanelLeft, Star, BarChart, Image, Trash } from 'lucide-react';
import useUiStore, { CURRENT_ACTION, CurrentAction } from '@/store/ui-store';
import { cn } from '@/lib/utils';
import { Link, LinkLayout } from '@/interfaces/link';

interface LinkActionsProps {
  link: Link;
}

export default function LinkActions({ link }: LinkActionsProps) {
  const { currentLinkId, setCurrentLinkId, currentAction, setCurrentAction } =
    useUiStore();

  const handleActionClick = (action: CurrentAction) => {
    if (currentLinkId === link.id && currentAction === action) {
      setCurrentLinkId(null);
      setCurrentAction(null);
    } else {
      setCurrentLinkId(link.id);
      setCurrentAction(action);
    }
  };

  const actions = [
    { icon: LayoutPanelLeft, label: 'Layout', action: CURRENT_ACTION.layout },
    { icon: Image, label: 'Thumbnail', action: CURRENT_ACTION.thumbnail },
    // { icon: Star, label: "Prioritize", action: CURRENT_ACTION.prioritize },
    // { icon: BarChart, label: "Analytics", action: CURRENT_ACTION.analytics },
  ];

  const checkIfActionIsSelected = (action: CurrentAction) => {
    return currentAction === action && currentLinkId === link.id;
  };

  const getButtonClass = (action: CurrentAction) => {
    const isSelected = checkIfActionIsSelected(action);

    const isFeatureLayout =
      action === CURRENT_ACTION.layout && link.layout === LinkLayout.Feature;
    const hasThumbnail =
      action === CURRENT_ACTION.thumbnail && !!link.thumbnail;

    return cn('h-8 w-8', {
      'text-primary': (isFeatureLayout || hasThumbnail) && !isSelected,
    });
  };

  return (
    <TooltipProvider>
      <div className="flex justify-between mt-2 w-full">
        <div className="flex gap-3">
          {actions.map(({ icon: Icon, label, action }) => {
            const isSelected = checkIfActionIsSelected(action);

            return (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isSelected ? 'default' : 'ghost'}
                    size="icon"
                    className={cn('h-8 w-8', getButtonClass(action))}
                    onClick={() => handleActionClick(action)}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <div className="flex justify-end w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={
                  checkIfActionIsSelected(CURRENT_ACTION.confirmation)
                    ? 'default'
                    : 'ghost'
                }
                size="icon"
                className="h-8 w-8"
                onClick={() => handleActionClick(CURRENT_ACTION.confirmation)}
              >
                <Trash className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
