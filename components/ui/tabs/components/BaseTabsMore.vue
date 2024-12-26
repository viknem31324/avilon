<template>
  <BaseMultiselect
    v-model="value"
    class="ds-tab-more"
    track-by="id"
    label="title"
    :placeholder="label"
    :options="items"
    :searchable="false"
    :allow-empty="true"
    :show-labels="false"
    :close-on-select="true"
    @select="onSelect"
  >
    <template #singleLabel>
      <BaseText :size="size ? size : 'l'" tag="span" :fluid="!size">
        {{ label }}
      </BaseText>
    </template>

    <template #placeholder>
      <BaseText :size="size ? size : 'l'" tag="span" :fluid="!size">
        {{ label }}
      </BaseText>
    </template>

    <template #option="{ option }">
      <BaseText
        class="ds-option__desc ds-tab-more__count-wrapper"
        :size="size ? size : 'l'"
        :fluid="!size"
      >
        <span class="ds-option__title">
          {{ option.title }}
        </span>
        <span
          v-if="option.count"
          class="ds-tab-more__tab-count"
        >
          {{ option.count }}
        </span>
      </BaseText>
    </template>
  </BaseMultiselect>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { IBaseTabItem, IBaseTabsMore, BaseTabsMoreEmits } from '../tabs.js';

const props = withDefaults(defineProps<IBaseTabsMore>(), {
  items: () => [],
  label: 'Еще...',
  size: 'm',
});

const emits = defineEmits<BaseTabsMoreEmits>();

const value = computed(
  () => (props.activeItem ? props.items.find(item => item.id === props.activeItem?.id) : null),
);

const onSelect = (option: IBaseTabItem) => {
  emits('select', option.id);
};
</script>

<style lang="scss">
.ds-tab-more {
  $self: &;

  --ds-tab-more-title: #{color('total-black')};
  --ds-tab-more-count-bg: #{color('black-5')};
  --ds-tab-more-count-color: #{color('total-black')};
  --ds-tab-more-select-border: #{color('total-black')};
  --ds-tab-more-tags-bg: transparent;
  --ds-tab-more-element-hover: #{color('black-5')};
  --ds-tab-more-element-count-hover: #{color('black-10')};
  --ds-tab-more-placeholder-color: #{color('total-black')};
  --ds-tab-more-option-color: #{color('total-black')};
  --ds-tab-more-option-highlight-bg: #{color('black-5')};
  --ds-tab-more-option-selected-bg: #{color('smart-green')};
  --ds-tab-more-option-selected-color: #{color('total-white')};
  --ds-tab-more-option-count-hover: #{color('black-5')};
  --ds-tab-more-option-small-color: #{color('total-black')};
  width: 100%;
  min-height: 24px !important;

  p {
    margin: 0;
  }

  &__count-wrapper {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: space-between;

    max-height: 22px;

    @include media-min('tablet') {
      max-height: 24px;
    }

    @include media-min('desktop') {
      max-height: 28px;
    }
  }

  &__title {
    overflow: hidden;
    color: var(--ds-tab-more-title);
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  &__tab-count {
    padding: 1px 6px;

    color: var(--ds-tab-more-count-color);

    background-color: var(--ds-tab-more-count-bg);

    transition-timing-function: ease-out;
    transition-duration: .15s;
    transition-property: background-color;

    @include media-min('tablet') {
      padding: 2px 8px;
    }
  }

  .multiselect {
    &__select {
      top: 50%;
      right: 0;

      width: 16px;
      height: 16px;
      margin-top: -8px;
      padding: 0;

      &::before {
        top: -4px;
        transform: rotate(-45deg);

        display: inline-block;

        width: 7px;
        height: 7px;

        border-color: var(--ds-tab-more-select-border);
        border-style: solid;
        border-width: 0 0 2px 2px;
      }
    }

    &__tags {
      display: block;

      min-height: 24px;
      padding: 0 20px;

      text-align: center;

      background: var(--ds-tab-more-tags-bg);
      border: none;
    }

    &__single {
      overflow: hidden;

      margin: 0;
      padding: 0;

      color: var(--ds-tab-more-option-color);
      text-overflow: ellipsis;
      white-space: nowrap;

      background-color: transparent;
      border-radius: 0;
    }

    &__element {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: transparent;

      &:hover {
        background-color: var(--ds-tab-more-element-hover);

        #{$self}__tab-count {
          background-color: var(--ds-tab-more-element-count-hover);
        }
      }
    }

    &__placeholder {
      display: block !important;
      margin-bottom: 0;
      padding: 0;
      color: var(--ds-tab-more-placeholder-color);
    }

    &__content-wrapper {
      scrollbar-color: color('black-40') color('black-20');
      scrollbar-width: thin;

      top: 30px;
      right: -12px;

      overflow: hidden overlay;

      width: 174px;

      border: none;
      border-radius: 0;
      box-shadow: 0 6px 16px rgb(0 0 0 / 5%),
        0 9px 28px 8px rgb(0 0 0 / 5%);

      @include media-min('tablet') {
        top: 34px;
        right: -16px;
        width: 220px;
      }

      @include media-min('desktop') {
        top: 38px;
        width: 280px;
      }

      &::-webkit-scrollbar {
        width: 8px;
        background-color: color('black-20');
      }

      &::-webkit-scrollbar-thumb {
        background-color: color('black-40');
        border-radius: 0;
      }
    }

    &__content {
      width: 174px;
      margin: 0;
      padding: 0;
      list-style: none;

      @include media-min('tablet') {
        width: 220px;
      }

      @include media-min('desktop') {
        width: 280px;
      }
    }

    &__option {
      position: relative;

      display: block;

      min-height: 40px;
      padding: 8px 16px;

      line-height: 28px;
      color: var(--ds-tab-more-option-color);
      text-decoration: none;
      text-transform: none;
      word-break: break-word;
      white-space: normal;

      @include media-min('tablet') {
        padding: 10px 16px;
      }

      @include media-min('desktop') {
        padding: 14px 24px;
      }
    }

    &__option--highlight {
      background: var(--ds-tab-more-option-highlight-bg);
    }

    &__option--selected {
      display: block;
      color: var(--ds-tab-more-option-selected-color);
      background-color: var(--ds-tab-more-option-selected-bg);

      #{$self}__tab-count {
        color: var(--ds-tab-more-option-small-color);
      }

      &:hover {
        #{$self}__tab-count {
          background-color: var(--ds-tab-more-option-count-hover);
        }
      }
    }
  }
}
</style>
