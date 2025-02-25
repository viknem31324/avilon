import type { SizeDefault } from '~/assets/types/sizes';
import type { Icon } from '~/components/ui/icon/icon';

export const TAG_VARIANTS = ['green', 'red'] as const;

export type VariantTag = (typeof TAG_VARIANTS)[number];

export interface IBaseTags {
  id?: string;
  items: IBaseTagItem[];
  variant?: VariantTag;
  size?: SizeDefault;
}

export type BaseTagsEmits = {
  'update:items': [value: IBaseTagItem[]];
  'click': [id: string | number];
};

export interface IBaseTagItem {
  id: string | number;
  active?: boolean;
  icon?: Icon;
  label: string;
  link?: string;
  variant?: VariantTag;
  size?: SizeDefault;
}

export type BaseTagItemEmits = {
  click: [evt: MouseEvent];
};
