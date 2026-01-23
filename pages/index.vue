<script lang="ts" setup>
import { BREADCRUMBS_MODEL_LINE } from '~/assets/constants/general';
</script>

<template>
  <div class="model-line">
    <AppContainer>
      <BaseBreadcrumbs class="model-line__breadcrumbs" :items="BREADCRUMBS_MODEL_LINE" />
    </AppContainer>
  </div>
</template>

<style lang="scss">
.model-line {
  min-height: 100vh;
  padding-top: 101px;
  background: $bg-gradient-1;

  &__breadcrumbs {
    margin: 25px 0 16px;
  }
}
</style>
