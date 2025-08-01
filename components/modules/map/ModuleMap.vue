<template>
  <div
    :id="id"
    :class="`ds-map ds-map--${variant}`"
  >
    <AppContainer>
      <BaseHeading v-if="title && !isLargeVariant" class="ds-map__heading">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="title" />
      </BaseHeading>

      <div class="ds-map__wrapper">
        <div class="ds-map__block">
          <BaseHeading v-if="title && isLargeVariant" class="ds-map__block-heading" level="3">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="title" />
          </BaseHeading>

          <BaseList ref="listRef" class="ds-map__list">
            <li
              v-for="address in addresses"
              :key="address.data.id"
              class="ds-map__list-item"
              :class="{ 'ds-map__list-item--active': address.data.id === selectedAddress?.id }"
              @click="onScrollInToMarker(address)"
            >
              <MapAddress v-bind="address.data" />
            </li>
          </BaseList>
        </div>

        <MapYandex
          :api-key="apiKey"
          :addresses="addresses"
          :settings="settings"
          @click-marker="clickMarker"
        />
      </div>
    </AppContainer>

    <BaseLightbox
      :is-open="!isLaptop && !!selectedAddress"
      @close="onClearSelectedAddress"
    >
      <TransitionExpand>
        <MapAddress v-if="selectedAddress" v-bind="selectedAddress" />
      </TransitionExpand>
    </BaseLightbox>
  </div>
</template>

<script lang="ts" setup>
import type { YandexMapSettings } from 'vue-yandex-maps';
import { MAP_VARIANTS, type IModuleMap, type IModuleMapAddress, type IModuleMapAddressAndCoordinates } from './map';
import useWindowWidth from '~/hooks/useWindowWidth';

const props = withDefaults(defineProps<IModuleMap>(), {
  id: undefined,
  title: undefined,
  variant: 'small',
});

const { isLaptop } = useWindowWidth();

const listRef = ref();

const selectedAddress = ref<IModuleMapAddress>();
const settings = ref<YandexMapSettings>(props.initialSettings);

const isLargeVariant = computed(() => props.variant === MAP_VARIANTS.large);

const onClearSelectedAddress = () => {
  selectedAddress.value = undefined;
};

const onSelectAddress = (data: IModuleMapAddress) => {
  selectedAddress.value = data;
};

const onScrollInToMarker = (data: IModuleMapAddressAndCoordinates) => {
  settings.value.location = {
    center: data.coordinates,
    zoom: 16,
  };

  onSelectAddress(data.data);
};

const scrollInToSelectedAddress = () => {
  setTimeout(() => {
    const element = listRef.value?.$el?.querySelector('.ds-map__list-item--active');

    if (!element) {
      return;
    }

    element.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, 0);
};

const clickMarker = (address: IModuleMapAddressAndCoordinates) => {
  onSelectAddress(address.data);

  if (isLaptop.value) {
    scrollInToSelectedAddress();
  }
};

watch(isLaptop, () => {
  onClearSelectedAddress();
});
</script>

<style lang="scss">
.ds-map {
  $self: &;

  --ds-map-wrapper-height: 384px;
  --ds-lightbox-content-max-width: 100%;
  --ds-lightbox-dialog-padding: 12px 0 0;
  --ds-lightbox-dialog-justify-content: flex-end;

  &--small {
    #{$self}__wrapper {
      @include media-min('wideTablet') {
        display: grid;
        grid-template-columns: 486px 1fr;
        gap: 16px;
      }
    }
  }

  &--large {
    .ds-container {
      @include media-min('wideTablet') {
        max-width: none;
        margin: 0;
        padding: 0;
      }
    }

    #{$self}__wrapper {
      @include media-min('wideTablet') {
        position: relative;
        height: 90vh;
      }
    }

    #{$self}__block {
      @include media-min('wideTablet') {
        --ds-map-block-padding: 40px;
        position: absolute;
        top: 40px;
        left: 40px;
        z-index: 10;

        display: grid;

        height: auto;
        max-height: calc(100% - var(--ds-map-block-padding) * 2);
        padding: 28px 24px 28px var(--ds-map-block-padding);

        background-color: color('total-white');
        border: 12px solid color('total-white');
        border-right-width: 16px;
        border-left-width: 0;

        &-heading {
          margin-bottom: 16px;
        }
      }
    }

    #{$self}__list-item {
      max-width: 406px;
    }
  }

  &__wrapper {
    position: relative;
    overflow: hidden;
  }

  &__wrapper,
  &__block {
    height: var(--ds-map-wrapper-height);
  }

  &__block {
    display: none;

    @include media-min('wideTablet') {
      display: block;
      overflow-y: auto;
      padding-right: 8px;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background-color: color('black-10');
      }

      &::-webkit-scrollbar-thumb {
        background-color: color('black-40');
      }
    }
  }

  &__list {
    @include media-min('wideTablet') {
      display: grid;
      gap: 16px;
      height: 100%;
    }

    &-item {
      position: relative;

      padding: 28px 32px;

      background-color: color('black-5');
      cursor: pointer;
      border-left: 8px solid transparent;

      @include transition('border-color');

      &--active {
        border-color: color('smart-green');
      }
    }
  }

  .ds-lightbox {
    &__content {
      position: relative;
    }

    &__header {
      --ds-icon-size: 20px;
      position: absolute;
      top: 35px;
      right: 32px;
      z-index: 1;

      padding: 0;
    }

    &__body {
      padding: 32px;
    }
  }

  @include media-min('tablet') {
    --ds-map-wrapper-height: 566px;
  }
}
</style>
