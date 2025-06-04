export interface IBaseInputCode {
  numberElements?: number;
  modelValue?: string;
  errorText?: string;
};

export type BaseInputCodeEmits = {
  'click': [event: MouseEvent];
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
  'keydown': [event: KeyboardEvent];
  'update:modelValue': [value: string];
};
