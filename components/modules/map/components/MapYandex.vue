<template>
  <YandexMap
    v-if="VueYandexMaps.isReadyToInit && VueYandexMaps.isLoaded"
    class="ds-map-yandex"
    :settings="settings"
    width="100%"
    height="500px"
  >
    <!-- @vue-ignore -->
    <YandexMapDefaultSchemeLayer :settings="{ customization }" />
    <YandexMapDefaultFeaturesLayer />

    <YandexMapClusterer :settings="{ maxZoom: 15 }" zoom-on-cluster-click>
      <YandexMapMarker
        v-for="(address, index) in addresses"
        :key="address.coordinates.join(',')"
        :settings="{
          coordinates: address.coordinates,
        }"
      >
        <button class="ds-map-yandex__marker" type="button" @click="clickMarker(address)">
          <span class="ds-map-yandex__marker-number">{{ index + 1 }}</span>
        </button>
      </YandexMapMarker>

      <template #cluster="{ length }">
        <div class="ds-map-yandex__clusterer">
          {{ length }}
        </div>
      </template>
    </YandexMapClusterer>
  </YandexMap>
</template>

<script lang="ts" setup>
import {
  VueYandexMaps,
  createYmapsOptions,
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapClusterer,
  YandexMapMarker,
  YandexMapDefaultFeaturesLayer,
} from 'vue-yandex-maps';
import type { IModuleMapAddressAndCoordinates, IModuleMapYandex, ModuleMapYandexEmits } from '../map';
import { CUSTOMIZATION as customization } from '../map';

const props = withDefaults(defineProps<IModuleMapYandex>(), {
  addresses: () => [],
});

const emits = defineEmits<ModuleMapYandexEmits>();

createYmapsOptions({
  apikey: props.apiKey,
});

const clickMarker = (data: IModuleMapAddressAndCoordinates) => {
  emits('clickMarker', data);
};
</script>

<style lang="scss">
.ds-map-yandex {
  min-height: 100%;

  &__loader {
    position: absolute;
    top: 50%;
    right: 50%;
    z-index: 10;
    transform: translate3d(50%, -50%, 0);
  }

  &__clusterer {
    display: flex;

    width: 48px;
    height: 48px;
    justify-content: center;
    align-items: center;

    font-size: var(--ds-map-clusterer-font-size);
    line-height: var(--ds-map-clusterer-line-height);
    color: color('black-80');

    background-color: color('total-white');
    border: 4px solid color('smart-green');
    border-radius: 50%;

    @include text-styles('m');

    @include media-min('tablet') {
      width: 62px;
      height: 62px;

      @include text-styles('l');
    }
  }

  &__marker {
    position: relative;

    width: 23px;
    height: 35px;
    padding: 0;

    font-family: inherit;
    color: inherit;

    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transform: translate3d(-50%, -100%, 0);

    @include text-styles('xs');

    @include media-min('tablet') {
      width: 30px;
      height: 45px;

      @include text-styles('s');
    }

    &-number {
      position: absolute;
      top: 3px;
      left: 50%;
      z-index: 1;

      display: flex;

      width: 17px;
      height: 17px;
      justify-content: center;
      align-items: center;

      font-size: var(--ds-map-marker-font-size);
      line-height: var(--ds-map-marker-line-height);
      color: color('black-80');

      background-color: color('active-red');
      border-radius: 50%;
      transform: translateX(-50%);

      @include media-min('tablet') {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
