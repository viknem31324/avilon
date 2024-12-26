<template>
  <div :class="classes">
    <AppContainer class="ds-anchor-menu__container">
      <button
        v-if="isPrevButtonShow"
        class="ds-anchor-menu__btn"
        type="button"
        @click="scrollAxisY(-100)"
      >
        <BaseIcon icon="chevron-left" />
      </button>
      <ul
        ref="anchorMenuRef"
        class="ds-anchor-menu__list"
      >
        <li
          v-for="item in items"
          :key="item.href"
          class="ds-anchor-menu__item"
          :class="{
            'ds-anchor-menu__item--selected': item.href === activeIndex,
          }"
        >
          <a
            class="ds-anchor-menu__link"
            :href="item.href"
            @click.prevent="onClickItem(item)"
          >
            <span class="ds-anchor-menu__link-text">
              {{ item.text }}
            </span>
            <BaseText
              v-if="item.tag"
              class="ds-anchor-menu__link-tag"
              fluid
            >
              {{ item.tag }}
            </BaseText>
          </a>
        </li>
      </ul>
      <BaseIconButton
        v-if="isMobile"
        class="ds-anchor-menu__select"
        :icon="isOpen ? 'chevron-up' : 'chevron-down'"
        :variant="isOpen ? 'accent' : 'ghost'"
        @click="onClickBtn"
      />
      <button
        v-if="isNextButtonShow && !isMobile"
        class="ds-anchor-menu__btn"
        type="button"
        @click="scrollAxisY(100)"
      >
        <BaseIcon icon="chevron-right" />
      </button>
    </AppContainer>
  </div>
</template>

<script lang="ts" setup>
import useAnchorScroll from './helpers/useAnchorScroll.js';

import type { IModuleAnchorMenu, IModuleAnchorMenuItem } from './anchorMenu';
import { Breakpoints } from '~/assets/constants/breakpoints.js';
import useSubscribeEvent from '~/hooks/useSubscribeEvent.js';

const GAP_TOP_ACTIVE_ELEMENT = 50;

const props = defineProps<IModuleAnchorMenu>();

const anchorMenuRef = ref();
const activeIndex = ref(props.items[0].href);
const isNextButtonShow = ref(false);
const isOpen = ref(false);
const isPrevButtonShow = ref(false);

const { onAnchorScroll, getOffsetPosition } = useAnchorScroll(anchorMenuRef);

const isMobile = ref(typeof window !== 'undefined' && !window.matchMedia(`(min-width: ${Breakpoints.TABLET}px)`).matches);

const sections = computed(() => {
  const queryLinks = [...anchorMenuRef.value.children].map(el => el.firstElementChild.getAttribute('href'));
  return [...document.querySelectorAll(queryLinks.join(', '))];
});

const checkButtonsVisibility = () => {
  const { clientWidth, scrollWidth, scrollLeft } = anchorMenuRef.value;

  if (clientWidth < scrollWidth) {
    isPrevButtonShow.value = scrollLeft !== 0;
    isNextButtonShow.value = Math.round(clientWidth + scrollLeft) < scrollWidth;
  } else {
    isPrevButtonShow.value = isNextButtonShow.value = false;
  }
};

const onClickBtn = () => {
  if (isMobile.value) {
    isOpen.value = !isOpen.value;
  }
};

const onClickItem = (item: IModuleAnchorMenuItem) => {
  if (isMobile.value) {
    if (item.href === activeIndex.value && !isOpen.value) {
      isOpen.value = true;
      return;
    }
    isOpen.value = false;
  }

  onAnchorScroll(item.href);
};

const onWindowResize = () => {
  isOpen.value = false;
  isMobile.value = typeof window !== 'undefined' && !window.matchMedia(`(min-width: ${Breakpoints.TABLET}px)`).matches;
  checkButtonsVisibility();
};

const scrollAxisY = (shift: number) => {
  anchorMenuRef.value.scrollTo({
    top: 0,
    left: anchorMenuRef.value.scrollLeft + shift,
    behavior: 'smooth',
  });
};

const onWindowScroll = () => {
  for (const el of sections.value) {
    if (
      Math.abs(getOffsetPosition(el) - window.scrollY - GAP_TOP_ACTIVE_ELEMENT) <= anchorMenuRef.value.clientHeight
    ) {
      activeIndex.value = `#${el.id}`;
      return;
    } else if (
      window.scrollY === 0
      || (el === sections.value.at(-1)
        && document.documentElement.scrollHeight === window.scrollY + window.innerHeight)
    ) {
      // Нужно на случай быстрого скрола вверх и вниз страницы
      activeIndex.value = `#${el.id}`;
      return;
    }
  }
};

const autoHorizontalScrollAnchorMenu = () => {
  if (!isNextButtonShow.value && !isPrevButtonShow.value) {
    return;
  }

  const currentElement = anchorMenuRef.value.querySelector(`[href="${activeIndex.value}"]`);

  if (!currentElement) {
    return;
  }

  const { clientWidth } = anchorMenuRef.value;
  const { left } = currentElement.getBoundingClientRect();

  if (clientWidth < left + currentElement.clientWidth) {
    scrollAxisY(left - currentElement.clientWidth);
  } else if (left - currentElement.clientWidth * 2 < 0) {
    // Умножение на -2 нужно что бы сдвинуть на расстояние большее чем ширина пункта меню
    scrollAxisY(left + currentElement.clientWidth * -2);
    return;
  }
};

watch(activeIndex, autoHorizontalScrollAnchorMenu);

if (typeof window !== 'undefined') {
  useSubscribeEvent(window, {
    resize: onWindowResize,
    scroll: onWindowScroll,
  });

  useSubscribeEvent(anchorMenuRef, {
    scroll: checkButtonsVisibility,
  });
}

watch(() => props.items, async () => {
  await nextTick();
  checkButtonsVisibility();
});

onMounted(() => {
  checkButtonsVisibility();
});

const classes = computed(() => ({
  'ds-anchor-menu': true,
  'ds-anchor-menu--open': isOpen.value,
}));
</script>

<style lang="scss">
.ds-anchor-menu {
  $self: &;

  --ds-anchor-menu-color: #{color('total-black')};
  --ds-anchor-menu-border: #{color('black-20')};
  --ds-anchor-menu-item-height: 44px;
  --ds-anchor-menu-item-bg: #{color('total-white')};
  --ds-anchor-menu-item-hover-bg: #{color('black-5')};
  --ds-anchor-menu-item-selected-bg: #{color('total-white')};
  --ds-anchor-menu-item-selected-color: #{color('total-black')};
  --ds-anchor-menu-link-padding-x: 16px;
  --ds-anchor-menu-link-gap: 12px;
  --ds-anchor-menu-tag-color: #{color('total-white')};
  --ds-anchor-menu-tag-bg: #{color('smart-green')};
  --ds-anchor-menu-tag-padding-x: 8px;
  --ds-anchor-menu-tag-padding-y: 1px;
  position: sticky;
  z-index: 100;
  top: var(--ds-anchor-menu-top, 0);
  background-color: white;

  &--open {
    --ds-anchor-menu-border: #{color('smart-green')};
    padding-bottom: var(--ds-anchor-menu-item-height);

    #{$self}__list {
      position: absolute;
      right: var(--ds-container-gutter);
      left: var(--ds-container-gutter);
      box-shadow: 0 6px 16px rgb(0 0 0 / 5%),
      0 9px 28px 8px rgb(0 0 0 / 5%);
    }

    #{$self}__item {
      display: block;
    }
  }

  &__container {
    position: relative;

    @include media-min('tablet') {
      display: flex;
    }
  }

  &__list {
    overflow: hidden;
    display: flex;
    flex-direction: column;

    margin: 0;
    padding: 0;

    color: var(--ds-anchor-menu-color);
    list-style: none;

    @include media-min('tablet') {
      flex-direction: row;
      width: 100%;
      border-bottom: 1px solid var(--ds-anchor-menu-border);
    }
  }

  &__item {
    display: none;
    width: 100%;
    height: var(--ds-anchor-menu-item-height);
    background-color: var(--ds-anchor-menu-item-bg);

    &:hover {
      background-color: var(--ds-anchor-menu-item-hover-bg);
    }

    &--selected {
      --ds-anchor-menu-tag-color: #{color('total-white')};
      --ds-anchor-menu-tag-bg: #{color('smart-green')};
      --ds-anchor-menu-link-line-height: 18px;
      display: block;
      order: -1;

      color: var(--ds-anchor-menu-item-selected-color);

      background-color: var(--ds-anchor-menu-item-selected-bg);
      border: 1px solid var(--ds-anchor-menu-border);

      &:hover {
        color: var(--ds-anchor-menu-item-selected-color);
        background-color: var(--ds-anchor-menu-item-selected-bg);
      }

      #{$self}__link {
        padding-right: calc(
          var(--ds-anchor-menu-item-height) + var(--ds-anchor-menu-link-padding-x)
        );

        @include media-min('tablet') {
          padding-right: var(--ds-anchor-menu-link-padding-x);
        }

        & > #{$self}__link-btn {
          display: block !important;

          @include media-min('tablet') {
            display: none !important;
          }
        }
      }

      @include media-min('tablet') {
        --ds-anchor-menu-tag-bg: #{color('black-10')};
        --ds-anchor-menu-tag-color: #{color('total-black')};
        --ds-anchor-menu-item-selected-bg: #{color('smart-green')};
        --ds-anchor-menu-item-selected-color: #{color('total-white')};
        order: inherit;
        border: none;
      }
    }

    @include media-min('tablet') {
      display: block;
      width: fit-content;
    }
  }

  &__link {
    position: relative;

    display: flex;
    gap: var(--ds-anchor-menu-link-gap);
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 0 var(--ds-anchor-menu-link-padding-x);

    color: inherit;
    text-decoration: none;

    &:hover {
      color: inherit;
      text-decoration: none;
    }

    @include text-styles('m');

    @include media-min('tablet') {
      @include text-styles('s');
    }

    @include media-min('desktop') {
      @include text-styles('m');
    }
  }

  &__link-text {
    overflow: hidden;
    flex: 0 1 auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__link-tag {
    padding: var(--ds-anchor-menu-tag-padding-y) var(--ds-anchor-menu-tag-padding-x);
    color: var(--ds-anchor-menu-tag-color);
    text-transform: uppercase;
    background-color: var(--ds-anchor-menu-tag-bg);
  }

  &__select {
    position: absolute;
    top: 0;
    right: 12px;
    height: 44px;
  }

  &__btn {
    @include media-min('tablet') {
      cursor: pointer;

      position: absolute;
      z-index: 30;

      display: block;

      width: 24px;
      height: var(--ds-anchor-menu-item-height);
      padding: 0;

      background-color: transparent;
      border: none;
      border-radius: 0;

      &::before {
        pointer-events: none;
        content: '';

        position: absolute;
        z-index: -1;
        top: 0;

        width: 150px;
        height: 100%;

        background: linear-gradient(90deg, #fff 0%, rgb(255 255 255 / 0%) 90%);
      }

      .ds-icon {
        width: 24px;
        height: 24px;
      }

      &:first-child {
        left: var(--ds-container-gutter);

        &::before {
          left: 0;
        }
      }

      &:last-child {
        right: var(--ds-container-gutter);

        &::before {
          right: 0;
          transform: matrix(-1, 0, 0, 1, 0, 0);
        }
      }
    }
  }

  @include media-min('tablet') {
    --ds-anchor-menu-item-height: 40px;
  }

  @include media-min('desktop') {
    --ds-anchor-menu-item-height: 52px;
    --ds-anchor-menu-link-padding-x: 24px;
    --ds-anchor-menu-link-gap: 8px;
    --ds-anchor-menu-tag-padding-y: 2px;
  }
}
</style>
