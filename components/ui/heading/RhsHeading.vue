<template>
  <component
    :is="props.tag"
    v-if="slots"
    :class="`ds-heading ds-heading--level-${level}`"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { IBaseHeading } from './heading';

const props = withDefaults(defineProps<IBaseHeading>(), {
  level: '2',
  tag: 'h2',
});

const slots = useSlots();
</script>

<style lang="scss">
.ds-heading {
  font-weight: $font-weight-bold;

  &--level {
    &-1 {
      @include text-styles("h1");
    }

    &-2 {
      @include text-styles("h2");
    }

    &-3 {
      @include text-styles("h3");
    }

    &-4 {
      @include text-styles("h4");
    }

    &-5 {
      @include text-styles("h5");
    }

    &-6 {
      @include text-styles("h6");
    }
  }
}
</style>
