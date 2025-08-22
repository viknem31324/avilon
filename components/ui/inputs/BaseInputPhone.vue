<template>
  <BaseInput
    v-bind="bindData"
    v-model="modelValue"
    :name="name"
    :required="required"
    type="tel"
    @blur="onBlur"
    @focus="onFocus"
    @update:model-value="onChange"
    @input="onInput"
  />
</template>

<script lang="ts" setup>
import type { BaseInputPhoneEmits, BaseInputProps } from './types/inputPhone';

const emits = defineEmits<BaseInputPhoneEmits>();

const props = withDefaults(defineProps<BaseInputProps>(), {
  required: false,
  locale: 'ru',
  localesPhone: () => [
    {
      locale: 'ru',
      label: 'Телефон',
      mask: '+7(###) ### ## ##',
      placeholder: '+7',
    },
    {
      locale: 'by',
      label: 'Телефон',
      mask: '+375(##) ### ## ##',
      placeholder: '+375',
    },
  ],
});

const modelValue = ref(props.modelValue);

const bindData = computed(() => {
  const findLocale = props.localesPhone?.find(item => item.locale === props.locale);

  return {
    ...findLocale,
    name: props.name,
    required: props.required,
    size: props.size,
    errorText: props.errorText,
    rules: props.rules,
    disabled: props.disabled,
    id: props.id,
  };
});

const onFocus = (evt: FocusEvent) => {
  emits('focus', evt);
};

const onBlur = (evt: FocusEvent) => {
  emits('blur', evt);
};

const onChange = (evt: string) => {
  emits('update:modelValue', evt);
};

const onInput = (evt: InputEvent) => {
  const target = evt.target as HTMLInputElement;

  if (target.value === '+7 (8') {
    modelValue.value = '+7 (';
    return;
  }

  if (target.value === '+7 ') {
    modelValue.value = '';
    return;
  }

  if (target.value === '+375 ') {
    modelValue.value = '';
    return;
  }

  modelValue.value = target.value;
};
</script>
