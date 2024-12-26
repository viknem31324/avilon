<template>
  <BaseList ref="tabsRef" :class="classes">
    <BaseText
      v-for="tab in arrayTabs"
      :key="tab.id"
      :class="['ds-tabs__tab', { 'ds-tabs__tab-active': tab.id === id }]"
      :size="size ? size : 'l'"
      tag="li"
      :fluid="!size"
    >
      <button class="ds-tabs__tab-btn" type="button" @click="updateSelectedTab(tab.id)">
        {{ tab.title }}
        <span v-if="tab.count" class="ds-tabs__tab-count">
          {{ tab.count }}
        </span>
      </button>
    </BaseText>

    <li
      v-if="arrayMore.length"
      :class="[
        'ds-tabs__tab ds-tabs__tab-more',
        {
          'ds-tabs__tab-active': activeItem && arrayMore.find((item) => item.id === activeItem?.id),
        },
      ]"
    >
      <BaseTabsMore
        :active-item="activeItem"
        :items="arrayMore"
        :label="moreTabLabel"
        :size="size"
        @select="updateSelectedTab"
      />
    </li>
  </BaseList>
</template>

<script lang="ts" setup>
import { TAB_COUNT_SIZES_PADDING_X, TAB_GAP, TAB_MORE_SIZES_PADDING_X, TAB_SIZES_FONT_SIZE, TAB_SIZES_PADDING_X, type IBaseTabItem, type IBaseTabs, type BaseTabsEmits } from './tabs';
import type { SizeDefault } from '~/assets/types/sizes';
import { Breakpoints } from '~/assets/constants/breakpoints';

const props = withDefaults(defineProps<IBaseTabs>(), {
  id: '',
  items: () => [],
  moreTabLabel: 'Еще...',
});

const emits = defineEmits<BaseTabsEmits>();

let canvasElement: HTMLCanvasElement;

const tabsRef = ref();

const resizeObserver = ref();

const arrayMore = ref<IBaseTabItem[]>([]);
const arrayTabs = ref<IBaseTabItem[]>([]);
const showMore = ref(false);

const classes = computed(() => ({
  'ds-tabs': true,
  [`ds-tabs--size-${props.size}`]: props.size,
}));

const activeItem: ComputedRef<IBaseTabItem | undefined> = computed(() => props.items.find(({ id }) => id === props.id));

const getSize = (): SizeDefault => {
  if (props.size) {
    return props.size;
  }

  if (window.matchMedia(`(min-width: ${Breakpoints.DESKTOP}px)`).matches) {
    return 'l';
  }

  if (window.matchMedia(`(min-width: ${Breakpoints.TABLET}px)`).matches) {
    return 'm';
  }

  return 's';
};

const getTextWidth = (text: string): number => {
  const context = canvasElement.getContext('2d');
  if (!context) {
    return 0;
  }

  context.font = `500 ${TAB_SIZES_FONT_SIZE[getSize()]}px Inter`;

  const metrics = context.measureText(text);

  return Math.ceil(metrics.width);
};

const getItemWidth = (text: string, count?: number): number => {
  const size = getSize();
  const tabWidth = getTextWidth(text) + TAB_SIZES_PADDING_X[size];
  const tabCountWidth = count
    ? getTextWidth(count.toString()) + TAB_COUNT_SIZES_PADDING_X[size] + TAB_GAP
    : 0;

  return tabWidth + tabCountWidth;
};

const initTabs = () => {
  if (!props.items) {
    return;
  }

  const listWidth = tabsRef.value.$el.offsetWidth;

  arrayTabs.value = [];
  arrayMore.value = [];

  const moreTabWidth = getItemWidth(props.moreTabLabel) + TAB_MORE_SIZES_PADDING_X;
  let minTabWidth = moreTabWidth;

  let listTotalWidth = 0;

  for (let i = 0; i < props.items.length; i += 1) {
    const item = props.items[i];

    const tabWidth = getItemWidth(item.title, item.count ? parseInt(item.count) : undefined);

    if (minTabWidth < tabWidth) {
      minTabWidth = tabWidth;
    }

    listTotalWidth = minTabWidth * (i + 1);

    if ((listWidth - listTotalWidth) >= (i <= props.items.length - 2 ? minTabWidth : 0)) {
      tabsRef.value.$el.style.gridTemplateColumns = `repeat(auto-fit, minmax(${minTabWidth}px, 1fr))`;
      arrayTabs.value.push(item);
    } else {
      arrayMore.value = props.items.slice(i);
      return;
    }
  }

  showMore.value = !!arrayMore.value.length;
};

const updateSelectedTab = (id: string | number) => {
  emits('update:id', id);
};

watch(() => activeItem.value, () => {
  initTabs();
});

onMounted(() => {
  if (typeof window === 'undefined') {
    return;
  }

  document.fonts.ready.then(() => {
    initTabs();
  });

  canvasElement = document.createElement('canvas');

  resizeObserver.value = new ResizeObserver(() => {
    initTabs();
  });

  resizeObserver.value.observe(document.documentElement);
});

onBeforeUnmount(() => {
  resizeObserver.value.disconnect();
});
</script>

<style lang="scss">
.ds-tabs {
  $self: &;

  --ds-tabs-tab-padding-y: 3px;
  --ds-tabs-tab-padding-x: 12px;
  --ds-tabs-tab-count-padding-y: 1px;
  --ds-tabs-tab-count-padding-x: 6px;
  --ds-tabs-tab-border-bottom: #{color('black-10')};
  --ds-tabs-tab-color: #{color('total-black')};
  --ds-tabs-tab-hover-bc: #{color('green-30')};
  --ds-tabs-tab-count-hover: #{color('black-10')};
  --ds-tabs-tab-active: #{color('smart-green')};
  --ds-tabs-tab-active-hover: #{color('black-10')};
  --ds-tabs-tab-count-bg: #{color('black-5')};
  --ds-tabs-tab-count-color: #{color('total-black')};
  --ds-tabs-tab-focus-bc: #{color('smart-green')};
  display: grid;
  font-weight: $font-weight-medium;

  @include media-min('tablet') {
    --ds-tabs-tab-padding-y: 6px;
    --ds-tabs-tab-padding-x: 16px;
    --ds-tabs-tab-count-padding-y: 2px;
    --ds-tabs-tab-count-padding-x: 8px;
  }

  &--size {
    &-s {
      --ds-tabs-tab-padding-y: 3px;
      --ds-tabs-tab-padding-x: 12px;
      --ds-tabs-tab-count-padding-y: 1px;
      --ds-tabs-tab-count-padding-x: 6px;
    }

    &-m {
      --ds-tabs-tab-padding-y: 6px;
      --ds-tabs-tab-padding-x: 16px;
      --ds-tabs-tab-count-padding-y: 2px;
      --ds-tabs-tab-count-padding-x: 8px;
    }

    &-l {
      --ds-tabs-tab-padding-y: 6px;
      --ds-tabs-tab-padding-x: 16px;
      --ds-tabs-tab-count-padding-y: 2px;
      --ds-tabs-tab-count-padding-x: 8px;
    }
  }

  &__tab {
    cursor: pointer;

    position: relative;

    display: flex;
    flex-shrink: 0;
    gap: 4px;
    align-items: center;
    justify-content: center;

    color: var(--ds-tabs-tab-color);

    border-bottom: 4px solid var(--ds-tabs-tab-border-bottom);

    transition-timing-function: ease-out;
    transition-duration: .15s;
    transition-property: border-color;

    &:hover {
      border-color: var(--ds-tabs-tab-hover-bc);

      > #{$self}__tab-count {
        background-color: var(--ds-tabs-tab-count-hover);
      }
    }

    &:focus {
      border-color: var(--ds-tabs-tab-focus-bc);
    }

    &-active {
      border-color: var(--ds-tabs-tab-active);

      &:hover {
        > #{$self}__tab-count:first-child {
          background-color: var(--ds-tabs-tab-active-hover);
        }
      }
    }
  }

  &__tab-btn {
    cursor: pointer;

    width: 100%;
    padding: var(--ds-tabs-tab-padding-y) var(--ds-tabs-tab-padding-x);

    font: inherit;
    color: inherit;
    white-space: nowrap;

    background-color: transparent;
    border: none;
    outline: none;
  }

  &__tab-more {
    padding: var(--ds-tabs-tab-padding-y) var(--ds-tabs-tab-padding-x);
  }

  &__tab-count {
    padding: var(--ds-tabs-tab-count-padding-y) var(--ds-tabs-tab-count-padding-x);
    color: var(--ds-tabs-tab-count-color);
    background-color: var(--ds-tabs-tab-count-bg);

    @include transition('background-color');
  }

  &__wrapper {
    width: 100%;
  }
}
</style>
