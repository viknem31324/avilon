<template>
  <label :class="classes" :for="id || name">
    {{ label }}
    <span v-if="required">*</span>
  </label>
</template>

<script lang="ts" setup>
import type { IBaseFormLabel } from '../types/helperComponents';

const props = withDefaults(defineProps<IBaseFormLabel>(), {
  id: '',
  disabled: false,
  label: '',
  name: '',
  required: false,
  size: 'm',
});

const classes = computed(() => ({
  [`ds-label ds-label--${props.size}`]: true,
  'ds-label--disabled': props.disabled,
}));
</script>

<style lang="scss">
.ds-label {
  display: inline-block;

  margin: 0;

  font-size: var(--ds-label-font-size);
  font-weight: $font-weight-medium;
  line-height: var(--ds-label-line-height);
  color: color('black-90');

  &--s {
    padding-bottom: 4px;

    @include text-styles-variable('ds-label', 'xs');

    @include media-min('tablet') {
      padding-bottom: 6px;

      @include text-styles-variable('ds-label', 's');
    }
  }

  &--m {
    padding-bottom: 6px;

    @include text-styles-variable('ds-label', 's');
  }

  &--l {
    padding-bottom: 6px;

    @include text-styles-variable('ds-label', 's');

    @include media-min('desktop') {
      padding-bottom: 8px;

      @include text-styles-variable('ds-label', 'm');
    }
  }

  span {
    color: color('active-red');
  }

  &--disabled {
    cursor: not-allowed;
    user-select: none;

    span {
      color: inherit;
    }
  }
}
</style>
