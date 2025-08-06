type PhoneLocaleType = 'ru' | 'be';

interface IPhoneData {
  locale: PhoneLocaleType;
  label: string;
  mask: string;
}

export interface BaseInputProps {
  required?: boolean;
  locale: PhoneLocaleType;
  mask: string;
  label: string;
  modelValue?: string;
  name: string;
  placeholder: string;
  itemsPhone: IPhoneData[];
}
