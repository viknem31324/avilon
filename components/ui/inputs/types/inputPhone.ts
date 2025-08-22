import type { IBaseInput } from './input';

type PhoneLocaleType = 'ru' | 'by';

export interface IPhoneData {
  locale: PhoneLocaleType;
  label?: string;
  mask: string;
  placeholder?: string;
}

export interface BaseInputProps extends IBaseInput {
  locale?: PhoneLocaleType;
  localesPhone?: IPhoneData[];
}

export type BaseInputPhoneEmits = {
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
  'update:modelValue': [value: string];
};
