<template>
  <component
    :is="isLink ? BaseRouteLink : tag"
    :class="classes"
    :href="isLink ? href : null"
    :type="isButton ? type : null"
    :disabled="isButton ? disabled : null"
    :download="isLink && download ? download : null"
  >
    {{ label }}
    <BaseIcon
      v-if="icon"
      :icon="icon"
    />
    <div v-if="loading" class="ds-button__loading-wrapper">
      <BaseLoading is-loading />
    </div>
  </component>
</template>

<script lang="ts" setup>
import { BUTTON_VARIANTS, type IBaseButton } from './button';
import BaseRouteLink from '~/components/shared/BaseRouteLink.vue';

const props = withDefaults(defineProps<IBaseButton>(), {
  disabled: false,
  download: false,
  href: '',
  icon: undefined,
  label: '',
  size: 'm',
  tag: 'button',
  type: 'button',
  variant: BUTTON_VARIANTS.PRIMARY,
  loading: false,
  isReverse: false,
});

const classes = computed(() => ({
  [`ds-button ds-button--variant-${props.variant} ds-button--size-${props.size}`]: true,
  'ds-button--has-icon': props.icon,
  'ds-button--loading': props.loading,
  'ds-button--reverse': props.isReverse,
}));

const isButton = computed(() => (
  props.tag === 'button'
));

const isLink = computed(() => (
  props.tag === 'a'
));
</script>

<style lang="scss">
.ds-button {
  $self: &;
  position: relative;

  display: inline-block;

  min-height: var(--ds-button-min-height);
  padding: var(--ds-button-padding-y) var(--ds-button-padding-x);

  font-weight: $font-weight-medium;
  text-align: center;
  text-decoration: none;
  color: var(--ds-button-color);

  background-color: var(--ds-button-bg);
  border: 1px solid var(--ds-button-border-color);
  border-radius: 8px;
  outline: none;
  cursor: pointer;

  @include transition('background-color, color, border-color');

  @include media-min('tablet') {
    @include has-hover {
      &:hover {
        text-decoration: none;
        color: var(--ds-button-hover-color);
        background-color: var(--ds-button-hover-bg);
        border-color: var(--ds-button-hover-border-color);
      }
    }

    &:active {
      color: var(--ds-button-active-color);
      background-color: var(--ds-button-active-bg);
      border-color: var(--ds-button-active-border-color);
    }
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px var(--ds-button-focus-color);
  }

  &:disabled {
    color: var(--ds-button-disabled-color);

    background-color: var(--ds-button-disabled-bg);
    cursor: not-allowed;
    user-select: none;
    border-color: var(--ds-button-disabled-border-color);
  }

  &--variant {
    &-primary {
      --ds-button-bg: #{color('main-orange')};
      --ds-button-color: #{color('main-gray')};
      --ds-button-border-color: transparent;
      --ds-button-hover-bg: #{color('main-purple')};
      --ds-button-hover-color: #{color('main-white')};
      --ds-button-hover-border-color: transparent;
      --ds-button-active-bg: #{color('main-orange')};
      --ds-button-active-color: #{color('main-white')};
      --ds-button-active-border-color: transparent;
      --ds-button-focus-color: #{color('main-orange')};
      --ds-button-disabled-bg: #{color('black-20')};
      --ds-button-disabled-color: #{color('main-white')};
      --ds-button-disabled-border-color: transparent;
    }

    &-secondary {
      --ds-button-bg: #{color('main-black')};
      --ds-button-border-color: #{color('main-black')};
      --ds-button-color: #{color('main-orange')};
      --ds-button-hover-bg: transparent;
      --ds-button-hover-color: #{color('main-white')};
      --ds-button-hover-border-color: #{color('main-white')};
      --ds-button-active-bg: transparent;
      --ds-button-active-color: #{color('main-black')};
      --ds-button-active-border-color: #{color('main-black')};
      --ds-button-focus-color: #{color('main-orange')};
      --ds-button-disabled-bg: #{color('main-black')};
      --ds-button-disabled-color: #{color('black-40')};
      --ds-button-disabled-border-color: #{color('main-black')};

      &:focus-visible {
        box-shadow: 0 0 0 1px var(--ds-button-focus-color);
      }
    }

    &-secondary-inverse {
      --ds-button-bg: #{color('total-white')};
      --ds-button-border-color: #{color('total-white')};
      --ds-button-color: #{color('total-black')};
      --ds-button-hover-bg: #{color('black-5')};
      --ds-button-hover-color: #{color('total-black')};
      --ds-button-hover-border-color: #{color('black-5')};
      --ds-button-active-bg: #{color('black-5')};
      --ds-button-active-color: #{color('total-black')};
      --ds-button-active-border-color: #{color('black-5')};
      --ds-button-focus-color: #{color('black-20')};
      --ds-button-disabled-bg: transparent;
      --ds-button-disabled-color: #{color('black-40')};
      --ds-button-disabled-border-color: #{color('black-20')};
    }

    &-accent {
      --ds-button-bg: #{color('main-purple')};
      --ds-button-color: #{color('main-white')};
      --ds-button-border-color: transparent;
      --ds-button-hover-bg: #{color('main-orange')};
      --ds-button-hover-color: #{color('main-white')};
      --ds-button-hover-border-color: transparent;
      --ds-button-active-bg: #{color('main-orange')};
      --ds-button-active-color: #{color('main-white')};
      --ds-button-active-border-color: transparent;
      --ds-button-focus-color: #{color('main-orange')};
      --ds-button-disabled-bg: #{color('black-20')};
      --ds-button-disabled-color: #{color('main-white')};
      --ds-button-disabled-border-color: transparent;
    }

    &-accent-inverse {
      --ds-button-bg: #{color('main-black')};
      --ds-button-color: #{color('purple-2')};
      --ds-button-border-color: transparent;
      --ds-button-hover-bg: #{color('main-orange')};
      --ds-button-hover-color: #{color('main-white')};
      --ds-button-hover-border-color: #{color('main-white')};
      --ds-button-active-bg: #{color('main-orange')};
      --ds-button-active-color: #{color('main-black')};
      --ds-button-active-border-color: #{color('main-black')};
      --ds-button-focus-color: #{color('main-orange')};
      --ds-button-disabled-bg: #{color('black-20')};
      --ds-button-disabled-color: #{color('main-white')};
      --ds-button-disabled-border-color: transparent;
    }

    &-danger {
      --ds-button-bg: #{color('active-red')};
      --ds-button-border-color: transparent;
      --ds-button-color: #{color('total-white')};
      --ds-button-hover-bg: #{color('red-30')};
      --ds-button-hover-color: #{color('total-white')};
      --ds-button-hover-border-color: transparent;
      --ds-button-active-bg: #{color('red-30')};
      --ds-button-active-color: #{color('total-white')};
      --ds-button-active-border-color: transparent;
      --ds-button-focus-color: #{color('red-30')};
      --ds-button-disabled-bg: #{color('black-20')};
      --ds-button-disabled-color: #{color('total-white')};
      --ds-button-disabled-border-color: transparent;
    }

    &-ghost {
      --ds-button-bg: transparent;
      --ds-button-border-color: transparent;
      --ds-button-color: #{color('total-black')};
      --ds-button-hover-bg: transparent;
      --ds-button-hover-color: #{color('green-30')};
      --ds-button-hover-border-color: transparent;
      --ds-button-active-bg: transparent;
      --ds-button-active-color: #{color('green-30')};
      --ds-button-active-border-color: transparent;
      --ds-button-focus-color: #{color('black-20')};
      --ds-button-disabled-bg: transparent;
      --ds-button-disabled-color: #{color('black-40')};
      --ds-button-disabled-border-color: transparent;
    }

    &-tertiary {
      --ds-button-padding-y: 0 !important;
      --ds-button-padding-x: 0 !important;
      --ds-button-bg: transparent;
      --ds-button-border-color: transparent;
      --ds-button-color: #{color('smart-green')};
      --ds-button-hover-bg: transparent;
      --ds-button-hover-color: #{color('green-30')};
      --ds-button-hover-border-color: transparent;
      --ds-button-active-bg: transparent;
      --ds-button-active-color: #{color('smart-green')};
      --ds-button-active-border-color: transparent;
      --ds-button-focus-color: #{color('green-30')};
      --ds-button-disabled-bg: transparent;
      --ds-button-disabled-color: #{color('black-40')};
      --ds-button-disabled-border-color: transparent;

      &:focus-visible {
        color: var(--ds-button-focus-color);
        box-shadow: none;
      }
    }
  }

  &--size {
    &-s {
      --ds-button-min-height: 32px;
      --ds-button-padding-y: 4px;
      --ds-button-padding-x: 31px;

      @include text-styles('s');

      --ds-button-icon-size: 16px;

      @include media-min('tablet') {
        --ds-button-min-height: 40px;
        --ds-button-padding-y: 7px;
        --ds-button-padding-x: 31px;
        --ds-button-icon-size: 20px;
      }

      @include media-min('desktop') {
        --ds-button-padding-y: 8px;
        --ds-button-padding-x: 31px;
      }
    }

    &-m {
      --ds-button-min-height: 40px;
      --ds-button-padding-y: 7px;
      --ds-button-padding-x: 31px;

      @include text-styles('m');

      --ds-button-icon-size: 16px;

      @include media-min('tablet') {
        --ds-button-min-height: 44px;
        --ds-button-padding-y: 9px;
        --ds-button-padding-x: 31px;
      }

      @include media-min('desktop') {
        --ds-button-min-height: 48px;
        --ds-button-padding-y: 11px;
        --ds-button-padding-x: 31px;
      }
    }

    &-l {
      --ds-button-min-height: 44px;
      --ds-button-padding-y: 9px;
      --ds-button-padding-x: 31px;

      @include text-styles('m');

      --ds-button-icon-size: 16px;

      @include media-min('tablet') {
        --ds-button-min-height: 48px;
        --ds-button-padding-y: 11px;
        --ds-button-padding-x: 31px;
      }

      @include media-min('desktop') {
        --ds-button-min-height: 56px;
        --ds-button-padding-y: 13px;
        --ds-button-padding-x: 47px;

        @include text-styles('l');

        --ds-button-icon-size: 20px;
      }
    }
  }

  &--has-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--ds-button-inner-gap);

    &#{$self}--size {
      &-s {
        --ds-button-inner-gap: 0;
        --ds-button-padding-x: 15px;

        @include media-min('tablet') {
          --ds-button-padding-x: 19px;
        }
      }

      &-m {
        --ds-button-inner-gap: 12px;
        --ds-button-padding-x: 19px;
      }

      &-l {
        --ds-button-inner-gap: 12px;
        --ds-button-padding-x: 19px;

        @include media-min('desktop') {
          --ds-button-inner-gap: 16px;
          --ds-button-padding-x: 23px;
        }
      }
    }
  }

  .base-icon {
    width: var(--ds-button-icon-size);
    height: var(--ds-button-icon-size);
  }

  &__loading-wrapper {
    position: absolute;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--ds-button-bg);
    inset: 0;
  }

  &--loading {
    pointer-events: none;
  }

  &--reverse {
    flex-direction: row-reverse;
  }
}
</style>
