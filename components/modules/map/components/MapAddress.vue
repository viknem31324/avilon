<template>
  <div class="ds-map-address">
    <BaseHeading class="ds-map-address__heading" tag="h3" level="3">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="title" />
    </BaseHeading>

    <div class="ds-map-address__wrapper">
      <div v-for="item in data" :key="item.icon" class="ds-map-address__block">
        <BaseIcon class="ds-map-address__block-icon" :icon="item.icon" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="ds-map-address__block-text" v-html="item.text" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IModuleMapAddress } from '../map';
import type { Icon } from '~/components/ui/icon/icon';

const props = withDefaults(defineProps<IModuleMapAddress>(), {
  phone: undefined,
  workTime: undefined,
});

const data = computed(() => {
  const arr: { icon: Icon; text: string }[] = [
    {
      icon: 'info',
      text: props.address,
    },
  ];

  if (props.phone) {
    arr.push({
      icon: 'phone',
      text: props.phone,
    });
  }

  if (props.workTime) {
    arr.push({
      icon: 'clock',
      text: props.workTime,
    });
  }

  return arr;
});
</script>

<style lang="scss">
.ds-map-address {
  color: color('total-black');

  &__heading {
    margin-bottom: 16px;

    @include media-min('tablet') {
      margin-bottom: 24px;
    }

    @include media-min('wideTablet') {
      margin-bottom: 12px;
    }
  }

  &__wrapper {
    display: grid;
    gap: 12px;

    @include media-min('tablet') {
      gap: 16px;
    }

    @include media-min('wideTablet') {
      gap: 8px;
    }
  }

  &__block {
    display: flex;
    gap: 4px;
    align-items: center;

    &-icon {
      --ds-icon-size: 20px;
      flex: none;
      margin-top: 3px;
      color: color('smart-green');
    }

    &-text {
      margin: 0;
      color: color('black-60');

      @include text-styles('xs');

      @include media-min('tablet') {
        @include text-styles('s');
      }
    }
  }
}
</style>
