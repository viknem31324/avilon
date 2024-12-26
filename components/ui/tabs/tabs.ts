import type { SizeDefault } from '~/assets/types/sizes';

export const TAB_GAP = 4;

export const TAB_MORE_SIZES_PADDING_X = 40;

export const TAB_SIZES_FONT_SIZE = {
  s: 14,
  m: 16,
  l: 20,
} as const;

export const TAB_SIZES_PADDING_X = {
  s: 24,
  m: 32,
  l: 32,
} as const;

export const TAB_COUNT_SIZES_PADDING_X = {
  s: 12,
  m: 16,
  l: 16,
} as const;

export interface IBaseTabItem {
  id: string | number;
  title: string;
  count?: string;
}

export interface IBaseTabsMore {
  activeItem?: IBaseTabItem;
  items?: IBaseTabItem[];
  label?: string;
  size?: SizeDefault;
}

export type IBaseTabsMoreEmits = {
  select: [value: number | string];
};

export interface IBaseTabs {
  id: string;
  items?: IBaseTabItem[];
  moreTabLabel?: string;
  size?: SizeDefault;
}

export type IBaseTabsEmits = {
  'update:id': [value: string | number];
};
