<template>
  <BaseInput
    v-bind="bindData"
    :model-value="modelValue"
    :label="label"
    :mask="mask"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    @input="onInput"
  />
</template>

<script lang="ts" setup>
import type { BaseInputProps } from './types/inputPhone';

const props = withDefaults(defineProps<BaseInputProps>(), {
  required: false,
  mask: '+7 (###) ###-##-##',
  placeholder: '+7',
  locale: 'ru',
});

const modelValue = ref('');

const bindData = computed(() => props.itemsPhone.find(item => item.locale === props.locale));

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
