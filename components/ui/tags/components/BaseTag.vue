<template>
  <li :class="classes" @click="onClick">
    <component :is="link ? BaseRouteLink : 'div'" :href="link" class="ds-tag__inner">
      <div v-if="icon" class="ds-tag__icon">
        <BaseIcon :icon="icon" />
      </div>

      <span class="ds-tag__label">
        {{ label }}
      </span>

      <div v-if="icon" class="ds-tag__icon">
        <BaseIcon :icon="icon" />
      </div>

      <button
        v-if="!icon"
        class="ds-tag__delete"
        type="button"
        @click="deleteTag"
      >
        <BaseIcon icon="close" />
      </button>
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
  'ds-tag--close': !props.icon,
  'ds-tag--inactive': (props.icon) && !props.active,
  'ds-tag--active': (props.icon) && props.active,
}));

const onClick = (evt: MouseEvent) => {
  emits('click', evt);
};

const deleteTag = (evt: MouseEvent) => {
  emits('delete', evt);
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
    display: grid;
  }

  &--icon #{$content} {
    cursor: pointer;

    display: flex;
    align-items: center;

    padding: 0;
    padding-right: 12px;
  }

  &--close {
    --ds-tag-bg: #{color('smart-green')};
    --ds-tag-color: #{color('total-white')};
    --ds-tag-delete-button-bg: #{color('smart-green')};
    --ds-tag-delete-button-color: #{color('total-white')};

    #{$content} {
      padding: 5px 36px 5px 4px;
    }
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

  &__delete {
    cursor: pointer;

    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;
    margin: 0;
    padding: 0;

    color: var(--ds-tag-delete-button-color);

    background-color: var(--ds-tag-delete-button-bg);
    border: 0;
    outline: none;
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
    &--close {
      #{$content} {
        @include transition('padding');
      }

      #{$self}__delete {
        @include transition('opacity');

        &:active {
          --ds-tag-delete-button-bg: #{color('green-50')};
        }
      }

      &:not(:hover) {

        #{$content} {
          padding: 5px 20px;
        }

        #{$self}__delete {
          opacity: 0;
        }
      }

      &:hover {
        --ds-tag-delete-button-bg: #{color('green-30')};
      }
    }

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
