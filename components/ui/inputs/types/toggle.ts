import type { RuleExpression } from 'vee-validate';
import type { SizeDefault } from '~/assets/types/sizes';

export const TOGGLE_VARIANTS = [
  'green',
  'red',
] as const;

export type ToggleVariant = typeof TOGGLE_VARIANTS[number];

export interface IBaseToggle {
  disabled?: boolean;
  modelValue?: boolean;
  name: string;
  rules?: RuleExpression<boolean>;
  size?: SizeDefault;
  variant?: ToggleVariant;
};

export type BaseToggleEmits = {
  'update:modelValue': [value: boolean];
};
