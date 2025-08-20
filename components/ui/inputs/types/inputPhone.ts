import type { IBaseInput } from './input';

type PhoneLocaleType = 'ru' | 'be';

interface IPhoneData {
  locale: PhoneLocaleType;
  label?: string;
  mask: string;
  placeholder?: string;
}

export interface BaseInputProps extends IBaseInput {
  locale?: PhoneLocaleType;
  itemsPhone?: IPhoneData[];
}
