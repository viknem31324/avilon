<template>
  <div class="logo">
    <img class="logo__first" :src="firstLogo" :alt="firstLogoAlt" />
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

defineProps<IBaseLogoProps>();
</script>

<style lang="scss">
.logo {
  display: flex;
  align-items: center;
  gap: 24px;

  &__first {
    width: 94px;
    flex-shrink: 0;
    object-fit: contain;
  }

  &__second {
    width: 134px;
    flex-shrink: 0;
    object-fit: contain;
  }
}
</style>
