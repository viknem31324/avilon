<template>
  <component
    :is="props.tag"
    v-if="slots"
    :class="classes"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { IBaseHeading } from './heading';

const props = withDefaults(defineProps<IBaseHeading>(), {
  level: '2',
  tag: 'h2',
  weight: 'medium',
});

const slots = useSlots();

const classes = computed(() => ({
  [`ds-heading ds-heading--level-${props.level} ds-heading--weight-${props.weight}`]: true,
}));
</script>

<style lang="scss">
.ds-heading {
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

  &--weight {
    &-light {
      font-weight: $font-weight-light;
    }

    &-medium {
      font-weight: $font-weight-medium;
    }

    &-bold {
      font-weight: $font-weight-bold;
    }
  }
}
</style>
