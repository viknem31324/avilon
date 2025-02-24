<template>
  <li :class="classes" @click="onClick">
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
import type { BaseTagItemEmits, IBaseTagItem } from '../tags';
import BaseRouteLink from '~/components/shared/BaseRouteLink.vue';

const props = defineProps<IBaseTagItem>();
const emits = defineEmits<BaseTagItemEmits>();

const classes = computed(() => ({
  'ds-tag': true,
  'ds-tag--icon': props.icon,
  'ds-tag--inactive': !props.active,
  'ds-tag--active': props.active,
}));

const onClick = (evt: MouseEvent) => {
  emits('click', evt);
};
</script>

<style lang="scss">
.ds-tag {
  $self: &;
  $content: #{$self}__inner;
  font-weight: $font-weight-medium;
  color: var(--ds-tag-color);
  background-color: var(--ds-tag-bg);
  @include text-styles('s');
  @include transition('background-color');

  &__inner {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 12px;
    cursor: pointer;
  }

  &--icon #{$content} {
    padding: 0 0 0 12px;
  }

  &--inactive {
    --ds-tag-bg: #{rgba(color('smart-green'), 0.08)};
    --ds-tag-color: #{color('smart-green')};
    --ds-tag-border-color: #{color('smart-green')};
    --ds-tag-hover-color: #{color('green-30')};
    --ds-tag-hover-border-color: #{color('green-30')};

    #{$content} {
      border: 1px solid var(--ds-tag-border-color);
      @include transition('border-color');
    }
  }

  &--active {
    --ds-tag-bg: #{color('smart-green')};
    --ds-tag-color: #{color('total-white')};
    --ds-tag-hover-bg: #{color('green-30')};

    #{$content} {
      border: 1px solid var(--ds-tag-border-color);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;
    @include transition('color');
  }

  &__label {
    @include transition('color');
  }

  @include has-hover {
    &--inactive {
      &:hover {
        color: var(--ds-tag-hover-color);
        border-color: var(--ds-tag-hover-border-color);
      }
    }

    &--active {
      &:hover {
        background-color: var(--ds-tag-hover-bg);
      }
    }
  }

  a {
    color: currentcolor;
  }
}
</style>
