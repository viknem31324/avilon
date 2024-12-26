<template>
  <TransitionFade>
    <div v-if="isLoading" class="ds-loading">
      <div class="ds-loading__spinner" />
    </div>
  </TransitionFade>
</template>

<script lang="ts" setup>
import type { IBaseLoading } from './loading.js';

withDefaults(defineProps<IBaseLoading>(), {
  hasOverlay: true,
  isLoading: false,
  spinner: false,
});
</script>

<style lang="scss">
.ds-loading {
  max-width: max-content;

  &__img {
    display: flex;
    width: 130px;
    height: 130px;
  }

  &__spinner {
    position: relative;
    width: var(--ds-loading-spinner-size, 20px);
    height: var(--ds-loading-spinner-size, 20px);

    &::before {
      content: "";

      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);

      width: 100%;
      height: 100%;

      border: var(--ds-loading-border-width, 2px) solid transparent;
      border-top-color: var(--ds-loading-spinner-color, inherit);
      border-left-color: var(--ds-loading-spinner-color, inherit);
      border-radius: 50%;

      animation: spin 0.6s linear infinite;
    }

    &::after {
      content: "";

      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      border: var(--ds-loading-border-width, 2px) solid var(--ds-loading-spinner-border-round-bg, color('black-20'));
      border-radius: 50%;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
}
</style>
