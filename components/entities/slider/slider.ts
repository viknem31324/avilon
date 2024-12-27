export interface IBaseSlider {
  autoplay?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  breakpoints?: any;
  hideArrows?: boolean;
  hidePagination?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slides: any[];
  slidesPerView?: number;
  step?: number;
}

export type BaseSliderEmits = {
  prevSlide: [activeSlide: number];
  nextSlide: [activeSlide: number];
  changeSlide: [activeSlide: number];
};
