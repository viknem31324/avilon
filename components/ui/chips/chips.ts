export interface IBaseChipItem {
  id: number;
  label: string;
  isActive: boolean;
}

export interface IBaseChips {
  items: IBaseChipItem[];
}

export type BaseChipsEmits = {
  'update:items': [value: IBaseChipItem[]];
  'click': [id: string | number];
};
