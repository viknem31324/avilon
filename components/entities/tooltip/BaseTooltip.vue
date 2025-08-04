<template>
  <div
    class="ds-tooltip"
    @click="toggleTooltip"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <div
      ref="tooltipContentRef"
      :class="classes"
      @click.stop
    >
      <slot name="content">
        <div v-if="tooltipText" class="ds-tooltip__text">
          {{ tooltipText }}
        </div>
      </slot>
      <button
        v-if="showButton"
        class="ds-tooltip__close"
        type="button"
        @click="close"
      >
        <BaseIcon class="ds-tooltip__icon" icon="close" />
      </button>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { IBaseTooltip, BaseTooltipEmits } from './tooltip';
import useSubscribeEvent from '~/hooks/useSubscribeEvent';

const MARGIN = 10;

const props = withDefaults(defineProps<IBaseTooltip>(), {
  position: 'bottom',
  tooltipText: '',
  size: 'm',
  showButton: false,
});

const emits = defineEmits<BaseTooltipEmits>();

const tooltipContentRef = ref<HTMLElement>();
const isOpen = ref(false);

const close = () => {
  isOpen.value = false;
  emits('close');
};

const open = () => {
  isOpen.value = true;

  if (props.position === 'auto') {
    setPositionTooltip();
  }

  emits('open');
};

const onMouseenter = () => {
  if ('ontouchstart' in window) {
    return;
  }

  open();
};

const onMouseleave = () => {
  if (props.showButton) {
    return;
  }

  isOpen.value = false;
};

const setPositionTooltip = () => {
  if (!tooltipContentRef.value) {
    return;
  }

  tooltipContentRef.value.style.top = '0px';
  tooltipContentRef.value.style.left = '0px';

  const tooltipRect = tooltipContentRef.value.getBoundingClientRect();

  const documentWidth = document.documentElement.clientWidth;
  const windowsWidth = window.innerWidth;
  const scrollbarWidth = windowsWidth - documentWidth;

  let tooltipTop;
  let tooltipLeft;

  if (tooltipRect.top - tooltipRect.height - MARGIN < 0) {
    const tooltipRoot = tooltipContentRef.value.closest('.ds-tooltip');
    if (!tooltipRoot) {
      return;
    }

    tooltipTop = tooltipRoot.clientHeight + MARGIN;
  } else {
    tooltipTop = -tooltipRect.height - MARGIN;
  }

  if (tooltipRect.right + MARGIN > windowsWidth) {
    tooltipLeft = windowsWidth - tooltipRect.right - scrollbarWidth - MARGIN;
  } else if (tooltipRect.left < 0) {
    tooltipLeft = -tooltipRect.left + MARGIN;
  }

  tooltipContentRef.value.style.top = `${tooltipTop}px`;
  tooltipContentRef.value.style.left = `${tooltipLeft}px`;
};

const toggleTooltip = () => {
  if (!('ontouchstart' in window)) {
    return;
  }

  if (isOpen.value) {
    close();
    return;
  }

  open();
};

const onResize = () => {
  close();

  if (props.position === 'auto') {
    setPositionTooltip();
  }
};

if (typeof window !== 'undefined') {
  useSubscribeEvent(window, {
    resize: onResize,
    scroll: close,
  });
}

onMounted(() => {
  if (props.position === 'auto') {
    setPositionTooltip();
  }
});

defineExpose({
  open,
  close,
});

const classes = computed(() => ({
  [`ds-tooltip__body ds-tooltip__body--size-${props.size}`]: true,
  [`ds-tooltip__body--position-${props.position}`]: props.position !== 'auto',
  'ds-tooltip__body--open': isOpen.value,
}));
</script>

<style lang="scss">
.ds-tooltip {
  --ds-tooltip-bg: #{color('total-white')};
  --ds-tooltip-color: #{color('total-black')};
  --ds-tooltip-border: #{color('black-20')};
  --ds-tooltip-icon-size: 16px;
  position: relative;

  display: inline-flex;

  width: max-content;
  max-width: 90vw;
  max-height: 90vh;

  color: var(--ds-tooltip-color);

  &__body {
    position: absolute;
    z-index: -1000;

    display: flex;

    width: max-content;
    max-width: var(--ds-tooltip-max-width);
    padding: var(--ds-tooltip-padding);
    align-items: flex-start;

    font-size: var(--ds-tooltip-font-size);
    font-weight: $font-weight-medium;
    line-height: var(--ds-tooltip-line-height);
    background-color: var(--ds-tooltip-bg);
    border: 1px solid var(--ds-tooltip-border);
    box-shadow: var(--theme-shadow-default);

    opacity: 0;
    pointer-events: none;
    gap: var(--ds-tooltip-gap);

    @include transition('opacity, z-index');

    &--size {
      &-s {
        --ds-tooltip-padding: 5px 12px;
        --ds-tooltip-font-size: 14px;
        --ds-tooltip-line-height: 22px;
        --ds-tooltip-max-width: 254px;
        --ds-tooltip-gap: 14px;
        --ds-tooltip-icon-width: 16px;
        --ds-tooltip-icon-height: 16px;

        @include media-min('tablet') {
          --ds-tooltip-padding: 8px 16px;
          --ds-tooltip-font-size: 16px;
          --ds-tooltip-line-height: 24px;
          --ds-tooltip-max-width: 285px;
          --ds-tooltip-icon-width: 20px;
          --ds-tooltip-icon-height: 20px;
        }

        @include media-min('desktop') {
          --ds-tooltip-padding: 10px 16px;
        }
      }

      &-m {
        --ds-tooltip-padding: 8px 16px;
        --ds-tooltip-font-size: 16px;
        --ds-tooltip-line-height: 24px;
        --ds-tooltip-max-width: 285px;
        --ds-tooltip-gap: 14px;
        --ds-tooltip-icon-width: 20px;
        --ds-tooltip-icon-height: 20px;

        @include media-min('tablet') {
          --ds-tooltip-padding: 10px 16px;
        }

        @include media-min('desktop') {
          --ds-tooltip-padding: 12px 16px;
        }
      }

      &-l {
        --ds-tooltip-padding: 10px 16px;
        --ds-tooltip-font-size: 16px;
        --ds-tooltip-line-height: 24px;
        --ds-tooltip-max-width: 285px;
        --ds-tooltip-gap: 14px;
        --ds-tooltip-icon-width: 20px;
        --ds-tooltip-icon-height: 20px;

        @include media-min('tablet') {
          --ds-tooltip-padding: 12px 16px;
        }

        @include media-min('desktop') {
          --ds-tooltip-padding: 14px 24px;
          --ds-tooltip-font-size: 20px;
          --ds-tooltip-line-height: 28px;
          --ds-tooltip-max-width: 367px;
          --ds-tooltip-gap: 22px;
          --ds-tooltip-icon-width: 24px;
          --ds-tooltip-icon-height: 24px;
        }
      }
    }

    &--position {
      &-top {
        bottom: 100%;
        left: 0;
        margin-bottom: 10px;
      }

      &-right {
        top: 0;
        left: 100%;
        margin-left: 10px;
      }

      &-bottom {
        top: 100%;
        left: 0;
        margin-top: 10px;
      }

      &-left {
        top: 0;
        right: 100%;
        margin-right: 10px;
      }
    }

    &--open {
      z-index: 2000;
      opacity: 1;
      pointer-events: all;
    }
  }

  &__close {
    margin: 0;
    padding: 0;

    color: var(--ds-tooltip-color);

    background-color: transparent;
    border: 0;
    outline: none;
    cursor: pointer;

    @include transition('opacity');

    .ds-icon{
      width: var(--ds-tooltip-icon-size);
      height: var(--ds-tooltip-icon-size);
    }
  }
}
</style>
