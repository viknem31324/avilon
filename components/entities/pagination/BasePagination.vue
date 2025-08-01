<template>
  <div :class="classes">
    <BasePaginationPageJumper
      :max-pages="totalPages"
      :title="pageJumperTitle"
      :disabled="disabled"
      @go="onChangePaginationPage"
    />

    <BasePaginationPages
      :model-value="currentPage"
      :count="totalPages"
      :disabled="disabled"
      :href="href"
      :per-page="perPage"
      @update:model-value="onChangePaginationPage"
    />

    <BasePaginationRowsSelector
      :model-value="perPage"
      :options="perPageOptions"
      :title="rowsSelectorTitle"
      :disabled="disabled"
      @update:model-value="onChangePaginationResultNumber"
    />
  </div>
</template>

<script lang="ts" setup>
import { PAGINATION_PER_PAGE_OPTIONS, type BasePaginationEmits, type IBasePagination } from './pagination';

const props = withDefaults(defineProps<IBasePagination>(), {
  disabled: false,
  currentPage: 1,
  href: '',
  pageJumperTitle: 'Go to',
  perPage: 10,
  perPageOptions: () => PAGINATION_PER_PAGE_OPTIONS,
  rowsSelectorTitle: 'On page:',
  size: 'm',
});

const emits = defineEmits<BasePaginationEmits>();

const classes = computed(() => ({
  [`ds-pagination ds-pagination--size-${props.size}`]: true,
  'ds-pagination--disabled': props.disabled,
}));

const onChangePaginationPage = (currentPage: number) => {
  emits('update:currentPage', currentPage);
};

const onChangePaginationResultNumber = (perPage: number) => {
  onChangePaginationPage(1);
  emits('update:perPage', perPage);
};
</script>

<style lang="scss">
.ds-pagination {
  @include text-styles('s');

  --ds-pagination-color: #{color('total-black')};
  --ds-pagination-disabled-color: #{color('black-40')};
  --ds-pagination-input-width: 50px;
  --ds-pagination-input-height: 32px;
  --ds-pagination-button-size: 32px;
  --ds-pagination-button-icon-size: 12px;
  --ds-pagination-input-bg: #{color('total-white')};
  --ds-pagination-input-color: #{color('total-black')};
  --ds-pagination-input-border-color: #{color('black-40')};
  --ds-pagination-input-focus-border-color: #{color('total-black')};
  --ds-pagination-input-disabled-bg: #{color('black-5')};
  --ds-pagination-input-disabled-border-color: #{color('black-10')};
  --ds-pagination-input-placeholder-color: #{color('black-40')};
  --ds-pagination-button-bg: transparent;
  --ds-pagination-button-color: #{color('total-black')};
  --ds-pagination-button-border-color: transparent;
  --ds-pagination-button-hover-bg: transparent;
  --ds-pagination-button-hover-color: #{color('total-black')};
  --ds-pagination-button-hover-border-color: #{color('total-black')};
  --ds-pagination-button-disabled-bg: transparent;
  --ds-pagination-button-disabled-color: #{color('black-40')};
  --ds-pagination-button-disabled-border-color: transparent;
  --ds-pagination-active-button-bg: #{color('smart-green')};
  --ds-pagination-active-button-color: #{color('total-white')};
  --ds-pagination-active-button-border-color: #{color('smart-green')};
  --ds-pagination-active-button-hover-bg: #{color('smart-green')};
  --ds-pagination-active-button-hover-color: #{color('total-white')};
  --ds-pagination-active-button-hover-border-color: #{color('smart-green')};
  --ds-pagination-active-button-disabled-bg: #{color('black-20')};
  --ds-pagination-active-button-disabled-color: #{color('total-white')};
  --ds-pagination-active-button-disabled-border-color: #{color('black-20')};
  --ds-pagination-more-button-bg: transparent;
  --ds-pagination-more-button-color: #{color('black-40')};
  --ds-pagination-more-button-border-color: transparent;
  --ds-pagination-more-button-hover-bg: transparent;
  --ds-pagination-more-button-hover-color: #{color('total-black')};
  --ds-pagination-more-button-hover-border-color: transparent;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  color: var(--ds-pagination-color);
  gap: 16px;

  @include media-min('tablet') {
    gap: 24px;

    @include text-styles('m');
  }

  &--size {
    &-s {
      @include media-min('tablet') {
        --ds-pagination-input-width: 60px;
        --ds-pagination-input-height: 40px;
        --ds-pagination-button-size: 40px;
        --ds-pagination-button-icon-size: 16px;
      }

      @include media-min('desktop') {
        --ds-pagination-input-width: 60px;
        --ds-pagination-input-height: 44px;
        --ds-pagination-button-size: 44px;
      }
    }

    &-m {
      @include media-min('tablet') {
        --ds-pagination-input-width: 60px;
        --ds-pagination-input-height: 44px;
        --ds-pagination-button-size: 44px;
        --ds-pagination-button-icon-size: 16px;
      }

      @include media-min('desktop') {
        --ds-pagination-input-width: 64px;
        --ds-pagination-input-height: 48px;
        --ds-pagination-button-size: 48px;
      }
    }

    &-l {
      @include media-min('tablet') {
        --ds-pagination-input-width: 64px;
        --ds-pagination-input-height: 48px;
        --ds-pagination-button-size: 48px;
        --ds-pagination-button-icon-size: 16px;
      }

      @include media-min('desktop') {
        --ds-pagination-input-width: 72px;
        --ds-pagination-input-height: 56px;
        --ds-pagination-button-size: 56px;
        --ds-pagination-button-icon-size: 24px;

        @include text-styles('l');
      }
    }
  }

  &--disabled {
    color: var(--ds-pagination-disabled-color);
  }

  &__pages {
    order: -1;
    width: 100%;

    @include media-min('desktop') {
      order: 0;
      width: auto;
    }
  }
}
</style>
