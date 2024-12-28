import type { SizeDefault } from '~/assets/types/sizes';

export interface IBaseFormLabel {
  id?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  required?: boolean;
  size?: SizeDefault;
}

export interface IBaseFormHelpMessage {
  errorMessage?: string;
  successMessage?: string;
  valid?: boolean;
};

export interface IBaseFormErrorMessage {
  name: string;
}
