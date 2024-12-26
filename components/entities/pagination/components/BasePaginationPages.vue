<template>
  <div class="ds-pagination__pages ds-pages">
    <component
      :is="isPreButtonLink ? 'a' : 'button'"
      class="ds-pages__button"
      aria-label="Previous"
      :disabled="isPreBaseButtonDisabled"
      :href="isPreButtonLink ? fillQueryParamsInLink((current - 1), perPage) : undefined"
      @click.prevent="changeCurrent(current - 1)"
    >
      <BaseIcon icon="chevron-left" />
    </component>

    <component
      :is="(isButtonLink && item.num !== current) ? 'a' : 'button'"
      v-for="(item, index) in shortList"
      :key="index"
      :class="[
        'ds-pages__button',
        { 'ds-pages__button--active': item.num === current },
        { 'ds-pages__button--more': item.label === skipSymbol },
      ]"
      :disabled="isButtonDisabled"
      :href="(isButtonLink && item.num !== current) ? fillQueryParamsInLink(item.num, perPage) : undefined"
      @click.prevent="changeCurrent(item.num)"
    >
      {{ item.label }}
    </component>

    <component
      :is="isNextButtonLink ? 'a' : 'button'"
      class="ds-pages__button"
      aria-label="Next"
      :disabled="isNextButtonDisabled"
      :href="isNextButtonLink ? fillQueryParamsInLink((current + 1), perPage) : undefined"
      @click.prevent="changeCurrent(current + 1)"
    >
      <BaseIcon icon="chevron-right" />
    </component>
  </div>
</template>

<script lang="ts" setup>
import type { BasePaginationPagesEmits, IBasePage, IBasePaginationPages } from '../pagination';

const props = withDefaults(defineProps<IBasePaginationPages>(), {
  count: 10,
  disabled: false,
  href: '',
  modelValue: 1,
  perPage: 10,
});

const emits = defineEmits<BasePaginationPagesEmits>();

const current = ref(props.modelValue);
const skipSymbol = '...';

const isButtonDisabled = computed(() => props.disabled);
const isPreBaseButtonDisabled = computed(() => props.disabled || current.value === 1);
const isNextButtonDisabled = computed(() => props.disabled || current.value === props.count);
const isButtonLink = computed(() => (
  props.href && !isButtonDisabled.value
));
const isPreButtonLink = computed(() => (
  props.href && !isPreBaseButtonDisabled.value
));
const isNextButtonLink = computed(() => (
  props.href && !isNextButtonDisabled.value
));

watch(() => props.modelValue, (newValue) => {
  current.value = newValue;
});

const changeCurrent = (num: number) => {
  let number = num;

  if (number < 1) {
    number = 1;
  } else if (number > props.count) {
    number = props.count;
  } else if (current.value === number) {
    return;
  }

  current.value = number;
  emits('update:modelValue', current.value);
};

const fillQueryParamsInLink = (currentPage: number, perPage: number) => {
  return props.href + `?currentPage=${currentPage}&perPage=${perPage}`;
};

const mappingPages = (arrPages: number[]): IBasePage[] => {
  const newArr: IBasePage[] = [];
  arrPages.forEach((num, index, arr) => {
    newArr.push({ label: num, num });
    const nextNum = arr[index + 1];
    if (num + 1 !== nextNum && nextNum !== undefined) {
      const skipNum = Math.floor((num + nextNum) / 2);
      newArr.push({ label: skipSymbol, num: skipNum });
    }
  });
  return newArr;
};

const shortList = computed(() => {
  const pages = Array.from({ length: props.count }, (_, i) => i + 1);
  if (props.count <= 7) return mappingPages(pages);

  const pagesShort = pages.filter((num) => {
    if (num === 1 || num === props.count) return true;
    if (num >= current.value - 1 && num <= current.value + 1) return true;
    if (num === 2) return current.value === 4 || current.value >= props.count - 2;
    if (num === 3) return current.value === 1 || current.value >= props.count - 1;
    if (num === props.count - 1) return current.value <= 3 || current.value === props.count - 3;
    if (num === props.count - 2) return current.value <= 2 || current.value === props.count;
    return false;
  });
  return mappingPages(pagesShort);
});
</script>

<style lang="scss">
.ds-pages {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;

  @include media-min('tablet') {
    gap: 8px;
  }

  &__button {
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    width: var(--ds-pagination-button-size);
    height: var(--ds-pagination-button-size);
    padding: 0;

    font-weight: $font-weight-medium;
    color: var(--ds-pagination-button-color);

    background-color: var(--ds-pagination-button-bg);
    border: 1px solid var(--ds-pagination-button-border-color);

    @include transition('background-color, border-color, color');

    &:hover {
      color: var(--ds-pagination-button-hover-color);
      background-color: var(--ds-pagination-button-hover-bg);
      border-color: var(--ds-pagination-button-hover-border-color);
    }

    &:disabled {
      pointer-events:none;
      color: var(--ds-pagination-button-disabled-color);
      background-color: var(--ds-pagination-button-disabled-bg);
      border-color: var(--ds-pagination-button-disabled-border-color);
    }

    &--active {
      color: var(--ds-pagination-active-button-color);
      background-color: var(--ds-pagination-active-button-bg);
      border-color: var(--ds-pagination-active-button-border-color);

      &:hover {
        color: var(--ds-pagination-active-button-hover-color);
        background-color: var(--ds-pagination-active-button-hover-bg);
        border-color: var(--ds-pagination-active-button-hover-border-color);
      }

      &:disabled {
        color: var(--ds-pagination-active-button-disabled-color);
        background-color: var(--ds-pagination-active-button-disabled-bg);
        border-color: var(--ds-pagination-active-button-disabled-border-color);
      }
    }

    &--more {
      color: var(--ds-pagination-more-button-color);
      background-color: var(--ds-pagination-more-button-bg);
      border-color: var(--ds-pagination-more-button-border-color);

      &:hover {
        color: var(--ds-pagination-more-button-hover-color);
        background-color: var(--ds-pagination-more-button-hover-bg);
        border-color: var(--ds-pagination-more-button-hover-border-color);
      }
    }

    .ds-icon {
      width: var(--ds-pagination-button-icon-size);
      height: var(--ds-pagination-button-icon-size);
    }
  }
}
</style>
