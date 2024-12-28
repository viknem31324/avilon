<template>
  <div>
    <div class="ds-checkbox-group">
      <BaseCheckbox
        v-for="(item, index) in items"
        v-bind="item"
        :key="`${name}_${index}`"
        v-model="checkboxValue"
        :disabled="disabled || item.disabled"
        :name="name"
        :size="size || item.size"
      />
    </div>
    <BaseFormHelpMessage
      v-if="!disabled && errorMessage"
      :error-message="errorMessage"
    />
  </div>
</template>

<script lang="ts" setup>
import type { BaseCheckboxGroupEmits, IBaseCheckboxGroup } from './types/checkbox';

const props = withDefaults(defineProps<IBaseCheckboxGroup>(), {
  disabled: false,
  modelValue: undefined,
});

const emits = defineEmits<BaseCheckboxGroupEmits>();

const errorMessage = useFieldError(toRef(props, 'name'));

const checkboxValue = computed({
  get: () => props.modelValue,
  set: value => emits('update:modelValue', value),
});
</script>

<style lang="scss">
.ds-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
}
</style>
