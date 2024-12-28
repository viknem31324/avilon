import type { IBaseFormPartialsProps } from '../helpers/partialProps';
import type { SizeDefault } from '~/assets/types/sizes';

export interface IBaseOption {
  id: string;
  title: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: string | number | boolean | any;
}

export interface IBaseSelect extends Omit<IBaseFormPartialsProps, 'modelValue'> {
  allowEmpty?: boolean;
  errorText?: string;
  items?: IBaseOption[];
  hideButton?: boolean;
  outerSearch?: boolean;
  multiselect?: boolean;
  modelValue?: string | string[];
  searchable?: boolean;
  size?: SizeDefault;
}

export type BaseSelectEmits = {
  'close': [value: IBaseOption | IBaseOption[] | undefined];
  'open': [];
  'update:modelValue': [value: string | string[]];
  'searchChange': [value: string];
  'select': [id: string];
};
