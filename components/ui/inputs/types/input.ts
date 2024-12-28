import type { IBaseFormPartialsProps } from '../helpers/partialProps';
import type { SizeDefault } from '~/assets/types/sizes';

export const INPUT_TYPES = [
  'text',
  'password',
  'tel',
] as const;

export type InputTypes = typeof INPUT_TYPES[number];

export interface IBaseInput extends IBaseFormPartialsProps {
  type?: InputTypes;
  size?: SizeDefault;
  mask?: string;
  maxLength?: number;
  errorText?: string;
}

export type BaseInputEmits = {
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
  'update:modelValue': [value: string];
};
