<template>
  <component :is="tag" class="ds-base-list">
    <BaseText
      v-for="(item, index) in items"
      :key="item?.id || item?.href || index"
      :fluid="fluid"
      :size="size"
      :weight="weight"
      tag="li"
    >
      <slot name="for" v-bind="item" />
    </BaseText>

    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { IBaseList } from './list';

withDefaults(defineProps<IBaseList>(), {
  fluid: false,
  items: () => [],
  size: 'm',
  tag: 'ul',
  weight: 'medium',
});
</script>

<style lang="scss">
.ds-base-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
