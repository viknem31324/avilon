<template>
  <BaseRouteLink :class="classes" :href="href">
    <slot>
      {{ label }}
    </slot>
  </BaseRouteLink>
</template>

<script lang="ts" setup>
import type { IBaseLink } from './BaseLink.ts';

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
  color: var(--ds-link-color);
  text-decoration: none;

  @include transition("color");

  &::after {
    content: "";

    position: absolute;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 1px;

    opacity: 0;
    background-color: currentcolor;

    @include transition("opacity");
  }

  &:hover {
    color: color("green-30");
    text-decoration: none;

    &::after {
      opacity: 1;
    }
  }

  &--size {
    &-s {
      @include text-styles('s');
    }

    &-m {
      @include text-styles('m');
    }

    &-l {
      @include text-styles('l');
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
