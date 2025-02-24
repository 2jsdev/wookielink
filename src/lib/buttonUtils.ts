import { ButtonType, buttonTypes, Theme } from '@/interfaces/Theme';

export interface ButtonStyleProps {
  isOutline: boolean;
  isFill: boolean;
  isHardShadow: boolean;
  isSoftShadow: boolean;
  selectedColor: string;
  shadowColor: string;
  textColor: string;
}

export function getButtonStyleProps(theme?: Theme): ButtonStyleProps {
  const buttonType = theme?.buttonStyle?.type;

  const isOutline =
    buttonType === buttonTypes.OUTLINE ||
    buttonType === buttonTypes.OUTLINE_ROUNDED ||
    buttonType === buttonTypes.OUTLINE_CIRCULAR;

  const isFill =
    buttonType === buttonTypes.FILL ||
    buttonType === buttonTypes.FILL_ROUNDED ||
    buttonType === buttonTypes.FILL_CIRCULAR;

  const isHardShadow =
    buttonType === buttonTypes.HARDSHADOW ||
    buttonType === buttonTypes.HARDSHADOW_ROUNDED ||
    buttonType === buttonTypes.HARDSHADOW_CIRCULAR;

  const isSoftShadow =
    buttonType === buttonTypes.SOFTSHADOW ||
    buttonType === buttonTypes.SOFTSHADOW_ROUNDED ||
    buttonType === buttonTypes.SOFTSHADOW_CIRCULAR;

  const selectedColor = theme?.buttonStyle?.backgroundColor || '#000000';
  const shadowColor = theme?.buttonStyle?.shadowColor || 'rgba(0,0,0,0.15)';
  const textColor = theme?.buttonStyle?.textColor || '#000000';

  return {
    isOutline,
    isFill,
    isHardShadow,
    isSoftShadow,
    selectedColor,
    shadowColor,
    textColor,
  };
}

export function getClassicLinkPreviewClass(type?: ButtonType): string {
  switch (type) {
    case buttonTypes.FILL:
      return 'dark:bg-white';
    case buttonTypes.FILL_ROUNDED:
      return 'dark:bg-white rounded-md';
    case buttonTypes.FILL_CIRCULAR:
      return 'dark:bg-white rounded-full';

    case buttonTypes.OUTLINE:
      return 'border-2 dark:border-white';
    case buttonTypes.OUTLINE_ROUNDED:
      return 'border-2 dark:border-white rounded-md';
    case buttonTypes.OUTLINE_CIRCULAR:
      return 'border-2 dark:border-white rounded-full';

    case buttonTypes.SOFTSHADOW:
      return 'border-2 dark:border-white rounded-none';
    case buttonTypes.SOFTSHADOW_ROUNDED:
      return 'border-2 dark:border-white rounded-md';
    case buttonTypes.SOFTSHADOW_CIRCULAR:
      return 'border-2 dark:border-white rounded-full';

    case buttonTypes.HARDSHADOW:
      return 'border-2 dark:border-white rounded-none translate-y-[-2px]';
    case buttonTypes.HARDSHADOW_ROUNDED:
      return 'border-2 dark:border-white rounded-md translate-y-[-2px]';
    case buttonTypes.HARDSHADOW_CIRCULAR:
      return 'border-2 dark:border-white rounded-full translate-y-[-2px]';
    default:
      return '';
  }
}

export function getFeaturedLinkPreviewClass(type?: ButtonType): string {
  switch (type) {
    case buttonTypes.FILL:
      return 'dark:bg-white';
    case buttonTypes.FILL_ROUNDED:
      return 'dark:bg-white rounded-md';
    case buttonTypes.FILL_CIRCULAR:
      return 'dark:bg-white rounded-xl';
    case buttonTypes.OUTLINE:
      return 'border-2 dark:border-white';
    case buttonTypes.OUTLINE_ROUNDED:
      return 'border-2 dark:border-white rounded-md';
    case buttonTypes.OUTLINE_CIRCULAR:
      return 'border-2 dark:border-white rounded-xl';
    case buttonTypes.SOFTSHADOW:
      return 'border-2 dark:border-white rounded-none';
    case buttonTypes.SOFTSHADOW_ROUNDED:
      return 'border-2 dark:border-white rounded-md';
    case buttonTypes.SOFTSHADOW_CIRCULAR:
      return 'border-2 dark:border-white rounded-xl';
    case buttonTypes.HARDSHADOW:
      return 'border-2 dark:border-white rounded-none translate-y-[-2px]';
    case buttonTypes.HARDSHADOW_ROUNDED:
      return 'border-2 dark:border-white rounded-md translate-y-[-2px]';
    case buttonTypes.HARDSHADOW_CIRCULAR:
      return 'border-2 dark:border-white rounded-xl translate-y-[-2px]';
    default:
      return '';
  }
}
