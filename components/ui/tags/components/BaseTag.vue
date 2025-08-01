<template>
  <li :class="classes">
    <component :is="link ? BaseRouteLink : 'div'" :href="link" class="ds-tag__inner">
      <span class="ds-tag__label">
        {{ label }}
      </span>

      <div v-if="icon" class="ds-tag__icon">
        <BaseIcon :icon="icon" />
      </div>
    </component>
  </li>
</template>

<script lang="ts" setup>
import type { IBaseTagItem } from '../tags';
import BaseRouteLink from '~/components/shared/BaseRouteLink.vue';

const props = defineProps<IBaseTagItem>();

const classes = computed(() => ({
  [`ds-tag ds-tag--variant-${props.variant} ds-tag--size-${props.size}`]: true,
  'ds-tag--icon': props.icon,
  'ds-tag--active': props.active,
}));
</script>

<style lang="scss">
.ds-tag {
  $self: &;
  $content: #{$self}__inner;
  font-weight: $font-weight-medium;
  color: var(--ds-tag-color);
  background-color: var(--ds-tag-bg);
  @include transition('background-color');

  &__inner {
    position: relative;

    display: flex;

    height: 100%;
    padding: 5px 12px;
    align-items: center;

    border: 1px solid var(--ds-tag-border-color);
    cursor: pointer;
    @include transition('border-color');
  }

  &--variant {
    &-green {
      --ds-tag-bg: #{rgba(color('smart-green'), 0.08)};
      --ds-tag-hover-bg: #{rgba(color('smart-green'), 0.12)};
      --ds-tag-color: #{color('smart-green')};
      --ds-tag-border-color: #{color('smart-green')};
      --ds-tag-hover-color: #{color('green-30')};
      --ds-tag-hover-border-color: #{color('green-30')};

      &#{$self}--active {
        --ds-tag-bg: #{color('smart-green')};
        --ds-tag-color: #{color('total-white')};
        --ds-tag-hover-color: #{color('total-white')};
        --ds-tag-hover-bg: #{color('green-30')};
        --ds-tag-hover-border-color: #{color('mart-green')};
      }
    }

    &-red {
      --ds-tag-bg: #{rgba(color('active-red'), 0.08)};
      --ds-tag-hover-bg: #{rgba(color('active-red'), 0.12)};
      --ds-tag-color: #{color('red-30')};
      --ds-tag-border-color: #{color('red-30')};
      --ds-tag-hover-color: #{color('red-50')};
      --ds-tag-hover-border-color: #{color('red-50')};

      &#{$self}--active {
        --ds-tag-bg: #{color('red-30')};
        --ds-tag-color: #{color('total-white')};
        --ds-tag-hover-color: #{color('total-white')};
        --ds-tag-hover-bg: #{color('red-50')};
      }
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

  &--icon #{$content} {
    padding: 0 0 0 12px;
  }

  &__icon {
    display: flex;

    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    @include transition('color');
  }

  &__label {
    @include transition('color');
  }

  @include has-hover {
    &:hover {
      color: var(--ds-tag-hover-color);
      background-color: var(--ds-tag-hover-bg);
      border-color: var(--ds-tag-hover-border-color);
    }
  }

  a {
    color: currentcolor;
  }
}
</style>
