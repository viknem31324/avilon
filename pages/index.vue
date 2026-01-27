<template>
  <div class="model-line" :class="{ 'model-line--open-menu': isOpenHeaderMenu }">
    <AppContainer>
      <BaseBreadcrumbs class="model-line__breadcrumbs" :items="BREADCRUMBS_MODEL_LINE" />
      <BaseHeading class="model-line__title" tag="h1" level="1">
        Модельный ряд
      </BaseHeading>
      <div class="model-line__grid">

      </div>
    </AppContainer>
  </div>
</template>

<script lang="ts" setup>
import { BREADCRUMBS_MODEL_LINE } from '~/assets/constants/general';

const isOpenHeaderMenu = useState('headerMenu');
</script>

<style lang="scss">
.model-line {
  min-height: 100vh;
  padding-top: 101px;
  background: $bg-gradient-1;
  @include transition(all);

  &--open-menu {
    background: none;
  }

  &__breadcrumbs {
    margin: 25px 0 16px;
  }

  &__title {
    margin: 16px 0 56px;
    text-align: center;
    text-transform: uppercase;
    color: color('main-white');
  }

  &__grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 40px;

    @include media-min("wideTablet") {
      grid-template-columns: repeat(2, 1fr);
      margin-bottom: 80px;
    }
  }
}
</style>
