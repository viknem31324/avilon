<template>
  <BaseList class="ds-slider-pagination">
    <li
      v-for="index in numberOfSlides"
      :key="`ds-slider-pagination-item-${index}`"
      class="ds-slider-pagination__item"
    >
      <button
        class="ds-slider-pagination__item-bullet"
        :class="{ 'ds-slider-pagination__item-bullet--active': activeIndex === index - 1 }"
        :aria-label="`Слайд ${index}`"
        type="button"
        @click.stop="changeActiveSlide(index - 1)"
      />
    </li>
  </BaseList>
</template>

<script lang="ts" setup>
import type { BaseSliderPaginationEmits, IBaseSliderPagination } from '../slider';

defineProps<IBaseSliderPagination>();

const emits = defineEmits<BaseSliderPaginationEmits>();

const changeActiveSlide = (index: number) => {
  emits('changeActiveSlide', index);
};
</script>

<style lang="scss">
.ds-slider-pagination {
  --ds-slider-pagination-margin-y: 12px;
  --ds-slider-pagination-bullet-max-width: 48px;
  --ds-slider-pagination-bullet-height: 4px;
  --ds-slider-pagination-bullet-bg: #{color('black-20')};
  --ds-slider-pagination-bullet-bg-active: #{color('smart-green')};
  position: static;

  display: flex;
  justify-content: center;

  width: 100%;
  margin: var(--ds-slider-pagination-margin-y) 0;
  padding: 0 20px;

  @include media-min('tablet') {
    --ds-slider-pagination-margin-y: 20px;
  }

  @include media-min('desktop') {
    --ds-slider-pagination-margin-y: 28px;
  }

  &__item {
    width: 100%;
    max-width: var(--ds-slider-pagination-bullet-max-width);

    &-bullet {
      cursor: pointer;

      width: 100%;
      height: var(--ds-slider-pagination-bullet-height);

      background-color: var(--ds-slider-pagination-bullet-bg);
      border: none;
      outline: none;

      &--active {
        background-color: var(--ds-slider-pagination-bullet-bg-active);
      }
    }
  }
}
</style>
