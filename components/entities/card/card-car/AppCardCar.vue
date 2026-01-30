<template>
  <div :class="classes">
    <div>
      <BaseHeading class="app-card-car__title" tag="h3" level="1">
        {{ title }}
      </BaseHeading>
      <img class="app-card-car__image" :src="getAssetUrl(image)" :alt="title" />
      <div class="app-card-car__block">
        <div class="app-card-car__params">
          <div v-for="(item, idx) in params" :key="idx" class="app-card-car__param">
            <BaseText class="app-card-car__param-item" tag="span" size="xs">
              {{ item.label }}
            </BaseText>
            <BaseText class="app-card-car__param-value" tag="span" size="l">
              {{ item.value }}
            </BaseText>
          </div>
        </div>
        <div class="app-card-car__wrapper">
          <div class="app-card-car__block-btn">
            <BaseButton
              class="app-card-car__btn"
              label="Подробнее"
              :variant="isAccent ? 'secondary' : 'primary'"
              tag="a"
              :href="detailLink"
              size="s"
            />
            <BaseButton
              class="app-card-car__btn"
              label="Тест-драйв"
              icon="arrow-right"
              :variant="isAccent ? 'accent-inverse' : 'accent'"
              tag="a"
              href="#"
              size="s"
            />
          </div>
          <BaseButton
            class="app-card-car__btn"
            label="Автомобили в наличии"
            variant="secondary"
            tag="a"
            :href="`/catalog/?model=${code}`"
            size="s"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IAppCarCard } from './appCardCar.types';
import BaseButton from '~/components/ui/button/BaseButton.vue';

const props = defineProps<IAppCarCard>();

const { getAssetUrl } = useAssetUrl();

const classes = computed(() => ({
  'app-card-car': true,
  'app-card-car--accent': props.isAccent,
}));
</script>

<style lang="scss">
.app-card-car {
  --app-card-car-title-color: #{color('main-white')};
  --app-card-car-bg-color: transparent;
  --app-card-car-border-color: #{color('white-border')};
  --app-card-car-param-item-color: #{color('main-white')};
  --app-card-car-param-value-color: #{color('main-white')};
  padding: 12px 0;
  background-color: var(--app-card-car-bg-color);
  border: 1px solid var(--app-card-car-border-color);
  border-radius: 12px;

  @include media-min("wideTablet") {
    padding: 24px 0;
  }

  &--accent {
    --app-card-car-title-color: #{color('main-gray')};
    --app-card-car-bg-color: #{color('main-orange')};
    --app-card-car-border-color: #{color('main-orange')};
    --app-card-car-param-item-color: #{color('main-gray')};
    --app-card-car-param-value-color: #{color('main-gray')};
  }

  &__title {
    margin: 0 0 15px;
    text-align: center;
    text-transform: uppercase;
    color: var(--app-card-car-title-color);

    @include media-min("wideTablet") {
      margin: 0 0 25px;
    }
  }

  &__image {
    width: 100%;
    height: 200px;
    object-fit: contain;
    object-position: center center;

    @include media-min("tabletLarge") {
      height: 268px;
    }
  }

  &__block {
    padding: 0 12px;
    margin-top: 10px;

    @include media-min("tablet") {
      padding: 0 24px;
    }

    @include media-min("desktop") {
      padding: 0 47px;
      margin-top: 15px;
    }
  }

  &__params {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 24px;

    @include media-min("tablet") {
      display: flex;
      justify-content: space-between;
      margin-bottom: 34px;
    }
  }

  &__param {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__param-item {
    color: var(--app-card-car-param-item-color);
    opacity: .64;
  }

  &__param-value {
    text-transform: uppercase;
    color: var(--app-card-car-param-value-color);
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__block-btn {
    display: grid;
    gap: 8px;

    @include media-min("wideTablet") {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__btn {
    text-transform: uppercase;
  }
}
</style>
