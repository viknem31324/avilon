<template>
  <BaseInput
    v-bind="bindData"
    v-model="modelValue"
    :name="name"
    :required="required"
    type="tel"
    @blur="onBlur"
    @focus="onFocus"
    @update:model-value="(event) => emits('update:modelValue', event)"
  />
</template>

<script lang="ts" setup>
import type { BaseInputPhoneEmits, BaseInputProps } from './types/inputPhone';

const emits = defineEmits<BaseInputPhoneEmits>();

const props = withDefaults(defineProps<BaseInputProps>(), {
  required: false,
  locale: 'ru',
});

const modelValue = ref(props.modelValue);

const bindData = computed(() => {
  const findLocale = props.localesPhone?.find(item => item.locale === props.locale);

  return {
    placeholder: props.placeholder,
    mask: props.mask,
    label: props.label,
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
</script>
