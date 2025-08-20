<template>
  <BaseInput
    v-bind="bindData"
    v-model="modelValue"
    :name="name"
    :required="required"
    type="tel"
  />
</template>

<script lang="ts" setup>
import type { BaseInputProps } from './types/inputPhone';

const props = withDefaults(defineProps<BaseInputProps>(), {
  required: false,
  locale: 'ru',
});

const modelValue = ref(props.modelValue);

const bindData = computed(() => {
  const findLocale = props.itemsPhone?.find(item => item.locale === props.locale);

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
</script>
