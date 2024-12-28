import type { FormActions, GenericObject } from 'vee-validate';
import type { IBaseButtonLightweight } from '~/components/ui/button/button';

export const FORM_POSITION = {
  CENTER: 'center',
  RIGHT: 'right',
} as const;

export const FORM_POSITION_VAL = Object.values(FORM_POSITION);

export interface IBaseFormDescription {
  description?: string;
  title?: string;
}

export type Position = typeof FORM_POSITION_VAL[number];

export interface IBaseForm {
  backgroundColor?: string;
  backgroundImg?: string;
  buttonDisable?: boolean;
  button?: Omit<IBaseButtonLightweight, 'type'>;
  description?: string;
  id?: string;
  position?: Position;
  submitMessage?: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: Record<string, any>;
}

type Values = Record<string, string | number>;
type Actions = FormActions<GenericObject>;

export type BaseFormEmits = {
  submit: [{
    values: Values;
    action: Actions;
  }];
};
