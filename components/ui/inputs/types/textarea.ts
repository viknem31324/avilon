import type { IBaseFormPartialsProps } from '../helpers/partialProps';
import type { SizeDefault } from '~/assets/types/sizes';

export interface IBaseTextarea extends IBaseFormPartialsProps {
  errorText?: string;
  size?: SizeDefault;
  maxLength: number;
}

export type BaseTextareaEmits = {
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
  'update:modelValue': [value: string];
};
