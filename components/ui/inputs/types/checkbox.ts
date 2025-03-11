import type { RuleExpression } from 'vee-validate';
import type { SizeDefault } from '~/assets/types/sizes';

export interface IBaseCheckbox {
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue?: Array<any> | string | boolean;
  name: string;
  rules?: RuleExpression<string | boolean | unknown[]>;
  size?: SizeDefault;
  value: string | boolean;
}

export type BaseCheckboxEmits = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'update:modelValue': [value: Array<any> | string | boolean];
};

export interface IBaseCheckboxGroup {
  disabled?: boolean;
  items: Omit<IBaseCheckbox, 'name' | 'modelValue'>[];
  modelValue: string[];
  name: string;
  size?: SizeDefault;
};

export type BaseCheckboxGroupEmits = {
  'update:modelValue': [value: string[]];
};
