<template>
  <label class="ds-pagination__page-jumper ds-page-jumper">
    <span
      v-if="title"
      class="ds-page-jumper__title"
    >
      {{ title }}
    </span>

    <input
      class="ds-page-jumper__input"
      type="number"
      min="0"
      placeholder="0"
      :disabled="disabled"
      onkeydown="return event.keyCode !== 69 && event.keyCode !== 189"
      @keyup.enter="onEnter"
    />
  </label>
</template>

<script lang="ts" setup>
import type { BasePaginationPageJumperEmits, IBasePaginationPageJumper } from '../pagination';

const props = withDefaults(defineProps<IBasePaginationPageJumper>(), {
  maxPages: undefined,
  disabled: false,
  title: 'Go to',
});

const emits = defineEmits<BasePaginationPageJumperEmits>();

const goToPage = (number: number) => {
  if (!props.maxPages || Number.isNaN(number) || number < 1) {
    return 1;
  } else if (number > props.maxPages) {
    return props.maxPages;
  } else {
    return number;
  }
};

const onEnter = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement;
  emits('go', goToPage(parseInt(target.value, 10)));
  target.value = '';
  target.blur();
};
</script>

<style lang="scss">
.ds-page-jumper {
  display: flex;
  gap: 8px;
  align-items: center;

  &__input {
    width: var(--ds-pagination-input-width);
    height: var(--ds-pagination-input-height);
    padding: 0 16px;

    color: var(--ds-pagination-input-color);

    background-color: var(--ds-pagination-input-bg);
    border: 1px solid var(--ds-pagination-input-border-color);
    border-radius: 0;
    outline: none;

    &::placeholder {
      color: var(--ds-pagination-input-placeholder-color);
    }

    &:focus {
      border-color: var(--ds-pagination-input-focus-border-color);
    }

    &:disabled {
      background-color: var(--ds-pagination-input-disabled-bg);
      border-color: var(--ds-pagination-input-disabled-border-color);

      &::placeholder {
        opacity: 0;
      }
    }

    &[type="number"] {
      appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        margin: 0;
        appearance: none;
      }
    }
  }
}
</style>
