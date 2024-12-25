<template>
  <component :is="props.tag" :class="classes">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { IBaseText } from './text';

const props = withDefaults(defineProps<IBaseText>(), {
  fluid: false,
  size: 'm',
  tag: 'div',
  weight: 'medium',
});

const classes = computed(() => ({
  'rhs-text': true,
  [`rhs-text--weight-${props.weight}`]: props.weight !== 'medium',
  [`rhs-text--size-${props.size}`]: props.size,
  'rhs-text--fluid': props.fluid,
}));
</script>

<style lang="scss">
.rhs-text {
  $self: &;
  font-weight: $font-weight-medium;

  &--weight {
    &-light {
      font-weight: $font-weight-light;
    }

    &-bold {
      font-weight: $font-weight-bold;
    }
  }

  &--size {
    &-l {
      @include text-styles('l');
    }

    &-m {
      @include text-styles('m');
    }

    &-s {
      @include text-styles('s');
    }

    &-xs {
      @include text-styles('xs');
    }
  }

  &--fluid {
    &#{$self}--size {
      &-l {
        @include text-styles('lFluid');
      }

      &-m {
        @include text-styles('mFluid');
      }
    }

  }
}
</style>
