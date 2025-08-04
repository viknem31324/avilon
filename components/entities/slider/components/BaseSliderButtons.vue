<template>
  <button
    :class="classesBtnPrev"
    type="button"
    aria-label="Перейти к предыдущему слайду"
    :disabled="isFirstSlide"
    @click.stop="prevSlide"
  >
    <BaseIcon class="ds-slider-nav-btn__icon" icon="chevron-left" />
  </button>
  <button
    :class="classesBtnNext"
    type="button"
    aria-label="Перейти к следующему слайду"
    :disabled="isLastSlide"
    @click.stop="nextSlide"
  >
    <BaseIcon class="ds-slider-nav-btn__icon" icon="chevron-right" />
  </button>
</template>

<script lang="ts" setup>
import type { BaseSliderButtonEmits, IBaseSliderButton } from '../slider';

const props = defineProps<IBaseSliderButton>();

const emits = defineEmits<BaseSliderButtonEmits>();

const isFirstSlide = computed(() => props.activeIndex <= 0);
const isLastSlide = computed(() => props.activeIndex >= props.numberOfSlides - 1);

const classesBtnPrev = computed(() => ({
  'ds-slider-nav-btn ds-slider-nav-btn--prev': true,
  'ds-slider-nav-btn--disabled': isFirstSlide.value,
}));
const classesBtnNext = computed(() => ({
  'ds-slider-nav-btn ds-slider-nav-btn--next': true,
  'ds-slider-nav-btn--disabled': isLastSlide.value,
}));

const nextSlide = () => {
  if (isLastSlide.value) {
    return;
  }

  emits('nextSlide');
};

const prevSlide = () => {
  if (isFirstSlide.value) {
    return;
  }

  emits('prevSlide');
};
</script>

<style lang="scss">
.ds-slider-nav-btn {
  position: absolute;
  top: 50%;
  z-index: 10;

  margin: 0;
  padding: 0;

  font-family: inherit;
  color: var(--ds-slider-nav-btn-color, color('total-white'));

  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transform: translateY(-50%);

  @include transition('color');

  &:hover {
    color: var(--ds-slider-nav-btn-hover-color, color('smart-green'));
  }

  &:disabled {
    opacity: 0;
    cursor: default;
  }

  &--prev {
    left: var(--ds-slider-nav-btns-position, 0);
  }

  &--next {
    right: var(--ds-slider-nav-btns-position, 0);
  }

  &__icon {
    --ds-icon-size: 40px;
  }
}
</style>
