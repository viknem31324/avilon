<template>
  <BaseRouteLink :class="classes" :href="href">
    <slot>
      {{ label }}
    </slot>
  </BaseRouteLink>
</template>

<script lang="ts" setup>
import type { IBaseLink } from './link';

const props = withDefaults(defineProps<IBaseLink>(), {
  label: '',
  size: '',
  variant: 'green',
});

const classes = computed(() => ({
  [`ds-link ds-link--variant-${props.variant}`]: true,
  [`ds-link--size-${props.size}`]: props.size !== '',
}));
</script>

<style lang="scss">
.ds-link {
  position: relative;

  display: inline-block;

  font-size: inherit;
  line-height: inherit;
  text-decoration: none;
  color: var(--ds-link-color);

  @include transition("color");

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 1px;
    background-color: currentcolor;

    opacity: 0;
    content: "";

    @include transition("opacity");
  }

  &:hover {
    text-decoration: none;
    color: color("green-30");

    &::after {
      opacity: 1;
    }
  }

  &--size {
    &-s {
      @include text-styles("s");
    }

    &-m {
      @include text-styles("m");
    }

    &-l {
      @include text-styles("l");
    }
  }

  &--variant {
    &-green {
      --ds-link-color: #{color("smart-green")};
    }

    &-black {
      --ds-link-color: #{color("total-black")};
    }
  }
}
</style>
