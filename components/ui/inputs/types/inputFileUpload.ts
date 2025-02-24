import type { RuleExpression } from 'vee-validate';
import type { Icon } from '~/components/ui/icon/icon';

export interface IBaseInputFileUpload {
  accept?: string;
  name: string;
  title: string;
  formatsText: string;
  icon: Icon;
  buttonText: string;
  rules?: RuleExpression<string | boolean | unknown[]>;
  img?: string;
}

export type BaseInputFileUploadEmits = {
  change: [value: string | null];
};
