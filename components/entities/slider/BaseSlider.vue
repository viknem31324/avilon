<template>
  <div class="ds-slider">
    <div class="ds-slider__wrapper">
      <swiper-container
        ref="swiperRef"
        class="ds-slider__container"
        :autoplay="autoplaySettings"
        :breakpoints="breakpoints"
        :slides-per-view="slidesPerView"
      >
        <swiper-slide
          v-for="(slide, index) in slides"
          :key="`slide-${slide?.id || index}`"
          class="ds-slider__container-slide"
        >
          <slot name="slide" v-bind="slide" />
        </swiper-slide>
      </swiper-container>

      <BaseSliderButtons
        v-if="navigation && numberOfSlides > 1"
        :active-index="activeIndex"
        :number-of-slides="numberOfSlides"
        @next-slide="nextSlide"
        @prev-slide="prevSlide"
      />
    </div>

    <BaseSliderPagination
      v-if="pagination && numberOfSlides > 1"
      :number-of-slides="numberOfSlides"
      :active-index="activeIndex"
      @change-active-slide="changeActiveSlide"
    />
  </div>
</template>

<script lang="ts" setup>
import { register } from 'swiper/element/bundle';
import type { BaseSliderEmits, IBaseSlider } from './slider';

register();

const props = withDefaults(defineProps<IBaseSlider>(), {
  autoplay: undefined,
  breakpoints: undefined,
  navigation: true,
  pagination: true,
  slidesPerView: 1,
});

const emits = defineEmits<BaseSliderEmits>();

const swiperRef = ref();

const activeIndex = ref(0);

const numberOfSlides = ref(props.slides.length);

const autoplaySettings = computed(() => {
  if (typeof props.autoplay === 'undefined' || props.autoplay <= 0) {
    return;
  }

  return {
    delay: props.autoplay,
    disableOnInteraction: true,
  };
});

const nextSlide = () => {
  swiperRef.value.swiper.slideNext();
  activeIndex.value = swiperRef.value?.swiper?.snapIndex;
  emits('nextSlide', activeIndex.value);
};

const prevSlide = () => {
  swiperRef.value.swiper.slidePrev();
  activeIndex.value = swiperRef.value?.swiper?.snapIndex;
  emits('prevSlide', activeIndex.value);
};

const changeActiveSlide = (index: number) => {
  swiperRef.value.swiper.slideTo(index);
  activeIndex.value = swiperRef.value?.swiper?.snapIndex;
  emits('changeActiveSlide', activeIndex.value);
};

onMounted(() => {
  numberOfSlides.value = swiperRef.value?.swiper?.snapGrid.length;
});

defineExpose({
  activeIndex,
  nextSlide,
  prevSlide,
  changeActiveSlide,
});
</script>

<style lang="scss">
.ds-slider {
  position: relative;

  &__wrapper {
    position: relative;
  }
}
</style>
