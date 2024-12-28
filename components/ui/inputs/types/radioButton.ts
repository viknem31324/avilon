import type { SizeDefault } from '~/assets/types/sizes';

export interface IBaseRadioButton {
  label?: string;
  name: string;
  value: string;
  modelValue?: string;
  size?: SizeDefault;
  disabled?: boolean;
}

export type BaseRadioButtonEmits = {
  'update:modelValue': [value: string | undefined];
};

export interface IBaseRadioGroup {
  disabled?: boolean;
  items: Omit<IBaseRadioButton, 'name' | 'modelValue'>[];
  modelValue?: string;
  name: string;
}

export type BaseRadioGroupEmits = {
  'update:modelValue': [value: string | undefined];
};
