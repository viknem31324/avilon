import type { SizeDefault } from '~/assets/types/sizes';

export const TOOLTIP_POSITION = [
  'top',
  'right',
  'bottom',
  'left',
  'auto',
] as const;

export type BaseTooltipPosition = typeof TOOLTIP_POSITION[number];

export interface IBaseTooltip {
  position?: BaseTooltipPosition;
  tooltipText?: string;
  size?: SizeDefault;
  showButton?: boolean;
}

export type BaseTooltipEmits = {
  open: [];
  close: [];
};
