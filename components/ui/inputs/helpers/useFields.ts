/* eslint-disable @typescript-eslint/no-explicit-any */
import { toRef } from 'vue';
import { useField, type RuleExpression } from 'vee-validate';

interface Props {
  [key: string]: any;
  name: string;
  modelValue?: any;
  rules?: RuleExpression<any>;
}

interface Context {
  [key: string]: any;
  emits: (evt: any, ...args: any) => void;
}

export default (
  props: Props,
  context: Context,
  initialValue: any = undefined,
  rules: RuleExpression<any> = undefined,
) => {
  if (!props || !context) {
    throw new Error('useFields accepts two required attributes "props" and "context"');
  }

  if (!props.name) {
    throw new Error('Props "name" is required');
  }

  const {
    errorMessage,
    value,
    handleChange,
    handleBlur,
  } = useField(toRef(props, 'name'), rules ?? props.rules, {
    initialValue: initialValue || props.modelValue,
  });

  const onBlur = (evt: Event | any) => {
    handleBlur(evt);
    context.emits('blur', evt);
  };

  const onChange = (evt: Event | any) => {
    handleChange(evt);
    context.emits('update:modelValue', value.value);
  };

  return {
    errorMessage,
    value,
    onChange,
    onBlur,
  };
};
