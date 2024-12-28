import type { RuleExpression } from 'vee-validate';

export interface IBaseFormPartialsProps {
  id?: string;
  disabled?: boolean;
  label?: string;
  modelValue?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rules?: RuleExpression<string | boolean | unknown[]>;
}

export const formPartialDefaults = {
  id: '',
  disabled: false,
  label: '',
  modelValue: '',
  placeholder: '',
  required: false,
  rules: undefined,
} as const;
