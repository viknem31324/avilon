<template>
  <div class="model-line" :class="{ 'model-line--open-menu': isOpenHeaderMenu }">
    <AppContainer>
      <BaseBreadcrumbs class="model-line__breadcrumbs" :items="BREADCRUMBS_MODEL_LINE" />
      <BaseHeading class="model-line__title" tag="h1" level="1">
        Модельный ряд
      </BaseHeading>
      <div class="model-line__grid">
        <AppCardCar
          v-for="(item, idx) in cars"
          :key="idx"
          v-bind="item"
        />
      </div>
    </AppContainer>
  </div>
</template>

<script lang="ts" setup>
import { BREADCRUMBS_MODEL_LINE } from '~/assets/constants/general';
import type { IAppCarCard } from '~/components/entities/card/card-car/appCardCar.types';

export interface CarsResponse {
  data: IAppCarCard[];
}

const isOpenHeaderMenu = useState('headerMenu');

const { data, error } = await useFetch<CarsResponse>('/api/cars');

if (error.value) {
  throw showError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message,
    message: error.value.message,
  });
}

const cars = computed(() => data.value?.data || []);
</script>

<style lang="scss">
.model-line {
  min-height: 100vh;
  padding-top: 60px;
  background: $bg-gradient-1;
  @include transition(all);

  @include media-min("wideTablet") {
    padding-top: 101px;
  }

  &--open-menu {
    background: none;
  }

  &__breadcrumbs {
    margin: 25px 0 16px;
  }

  &__title {
    margin: 16px 0 30px;
    text-align: center;
    text-transform: uppercase;
    color: color('main-white');

    @include media-min("wideTablet") {
      margin: 16px 0 60px;
    }
  }

  &__grid {
    display: grid;
    gap: 16px;
    max-width: 1104px;
    margin: 0 auto;
    padding-bottom: 40px;

    @include media-min("tabletLarge") {
      margin: 0 auto;
      grid-template-columns: repeat(2, 1fr);
      padding-bottom: 80px;
    }
  }
}
</style>
