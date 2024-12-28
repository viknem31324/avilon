export interface IBaseSliderButton {
  activeIndex: number;
  numberOfSlides: number;
};

export type BaseSliderButtonEmits = {
  nextSlide: [];
  prevSlide: [];
};

export interface IBaseSliderPagination {
  activeIndex: number;
  numberOfSlides: number;
};

export type BaseSliderPaginationEmits = {
  changeActiveSlide: [activeIndex: number];
};

export interface IBaseSlider {
  autoplay?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  breakpoints?: any;
  navigation?: boolean;
  pagination?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slides: any[];
  slidesPerView?: number;
}

export type BaseSliderEmits = {
  prevSlide: [activeSlide: number];
  nextSlide: [activeSlide: number];
  changeActiveSlide: [activeSlide: number];
};
