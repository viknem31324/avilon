import type { SizeDefault } from '~/assets/types/sizes';

export const CHIPS_VARIANTS = ['green', 'red'] as const;

export type VariantChips = (typeof CHIPS_VARIANTS)[number];

export interface IBaseChipItem {
  id: number;
  label: string;
  isActive: boolean;
  variant?: VariantChips;
}

export interface IBaseChips {
  items: IBaseChipItem[];
  variant?: VariantChips;
  size?: SizeDefault;
}

export type BaseChipsEmits = {
  click: [ids: string[] | number[]];
};
