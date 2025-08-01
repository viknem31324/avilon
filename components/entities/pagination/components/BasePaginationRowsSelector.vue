<template>
  <div class="base-pagination__rows-selector base-rows-selector">
    <span v-if="title">
      {{ title }}
    </span>

    <button
      v-for="(option, index) in options"
      :key="index"
      class="base-rows-selector__button"
      :class="{ 'base-rows-selector__button--active': option === current }"
      :disabled="isButtonDisabled"
      @click="changeCurrent(option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { BasePaginationRowsSelectorEmits, IBasePaginationRowsSelector } from '../pagination';

const props = withDefaults(defineProps<IBasePaginationRowsSelector>(), {
  title: '',
  modelValue: 10,
  disabled: false,
});

const emits = defineEmits<BasePaginationRowsSelectorEmits>();

const isButtonDisabled = computed(() => props.disabled);

const current = ref(props.modelValue);

const changeCurrent = (num: number) => {
  if (current.value === num) {
    return;
  }

  current.value = num;
  emits('update:modelValue', current.value);
};

watch(() => props.modelValue, (newValue) => {
  current.value = newValue;
});
</script>

<style lang="scss">
.base-rows-selector {
  display: flex;
  gap: 6px;
  align-items: center;

  @include media-min('tablet') {
    gap: 8px;
  }

  &__button {
    display: flex;

    width: var(--base-pagination-button-size);
    height: var(--base-pagination-button-size);
    padding: 0;
    justify-content: center;
    align-items: center;

    font-weight: $font-weight-medium;
    color: var(--base-pagination-button-color);

    background-color: var(--base-pagination-button-bg);
    border: 1px solid var(--base-pagination-button-border-color);
    cursor: pointer;

    @include transition('background-color, border-color, color');

    &:hover {
      color: var(--base-pagination-button-hover-color);
      background-color: var(--base-pagination-button-hover-bg);
      border-color: var(--base-pagination-button-hover-border-color);
    }

    &:disabled {
      color: var(--base-pagination-button-disabled-color);
      background-color: var(--base-pagination-button-disabled-bg);
      pointer-events:none;
      border-color: var(--base-pagination-button-disabled-border-color);
    }

    &--active {
      color: var(--base-pagination-active-button-color);
      background-color: var(--base-pagination-active-button-bg);
      border-color: var(--base-pagination-active-button-border-color);

      &:hover {
        color: var(--base-pagination-active-button-hover-color);
        background-color: var(--base-pagination-active-button-hover-bg);
        border-color: var(--base-pagination-active-button-hover-border-color);
      }

      &:disabled {
        color: var(--base-pagination-active-button-disabled-color);
        background-color: var(--base-pagination-active-button-disabled-bg);
        border-color: var(--base-pagination-active-button-disabled-border-color);
      }
    }
  }
}
</style>
