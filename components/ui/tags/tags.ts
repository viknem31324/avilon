import type { Icon } from '~/components/ui/icon/icon';

export interface IBaseTags {
  id?: string;
  items: IBaseTagItem[];
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
}

export type BaseTagItemEmits = {
  click: [evt: MouseEvent];
  delete: [evt: MouseEvent];
};
