export interface IBaseChipItem {
  id: number;
  label: string;
  isActive: boolean;
}

export interface IBaseChips {
  items: IBaseChipItem[];
}

export type BaseChipsEmits = {
  click: [ids: string[] | number[]];
};
