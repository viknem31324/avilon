<template>
  <div class="logo">
    <BaseRouteLink href="/">
      <img class="logo__first" :src="firstLogo" :alt="firstLogoAlt" />
    </BaseRouteLink>
    <img
      v-if="secondLogo"
      class="logo__second"
      :src="secondLogo"
      :alt="secondLogoAlt"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IBaseLogoProps } from './baseLogo.types';
import BaseRouteLink from '~/components/shared/BaseRouteLink.vue';

defineProps<IBaseLogoProps>();
</script>

<style lang="scss">
.logo {
  display: flex;
  align-items: center;
  gap: 24px;

  &__first {
    width: 67px;
    padding-right: 8px;
    border-right: 1px solid color('main-white');
    flex-shrink: 0;
    object-fit: contain;

    @include media-min("wideTablet") {
      width: 94px;
      padding: 0;
      border: none;
    }
  }

  &__second {
    display: none;

    @include media-min("wideTablet") {
      display: block;
      width: 134px;
      flex-shrink: 0;
      object-fit: contain;
    }
  }
}
</style>
