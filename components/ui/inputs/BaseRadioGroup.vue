<template>
  <div>
    <div class="ds-radio-group">
      <BaseRadioButton
        v-for="(item, index) in items"
        v-bind="item"
        :key="`${name}_${index}`"
        v-model="radioButtonValue"
        :disabled="disabled || item.disabled"
        :name="name"
      />
    </div>
    <BaseFormErrorMessage :name="name" />
  </div>
</template>

<script lang="ts" setup>
import type { BaseRadioGroupEmits, IBaseRadioGroup } from './types/radioButton';

const props = withDefaults(defineProps<IBaseRadioGroup>(), {
  disabled: false,
});

const emits = defineEmits<BaseRadioGroupEmits>();

const modelValueMutation = ref(props.modelValue);

const radioButtonValue = computed({
  get: () => modelValueMutation.value,
  set: (value) => {
    modelValueMutation.value = value;
    emits('update:modelValue', value);
  },
});
</script>

<style lang="scss">
.ds-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
}
</style>
