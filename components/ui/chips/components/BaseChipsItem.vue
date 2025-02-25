<template>
  <div :class="classes">
    {{ label }}
    <BaseIcon v-if="isActive" icon="close" />
  </div>
</template>

<script lang="ts" setup>
import type { IBaseChipItem } from '../chips';

const props = defineProps<IBaseChipItem>();

const classes = computed(() => ({
  'ds-chips-item': true,
  'ds-chips-item--active': props.isActive,
}));
</script>

<style lang="scss">
.ds-chips-item {
  --ds-chips-bg: transparent;
  --ds-chips-border-color: #{color('smart-green')};
  cursor: pointer;
  user-select: none;

  display: flex;
  gap: 8px;
  align-items: center;

  padding: 2px 5px;

  font-weight: $font-weight-medium;

  background-color: var(--ds-chips-bg);
  border: 1px solid var(--ds-chips-border-color);
  border-radius: 5px;
  @include text-styles('m');
  @include transition('background-color');

  &--active {
    --ds-chips-bg: #{color('smart-green')};
  }

  svg {
    --ds-icon-size: 16px;
  }
}
</style>
