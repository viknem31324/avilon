<template>
  <BaseList class="ds-tags">
    <BaseTag
      v-for="item in items"
      :key="item.id"
      v-bind="item"
      @click="onClick(item.id)"
    />
  </BaseList>
</template>

<script lang="ts" setup>
import type { IBaseTags, BaseTagsEmits } from './tags';

defineProps<IBaseTags>();

const emits = defineEmits<BaseTagsEmits>();

const onClick = (id: string | number) => {
  emits('click', id);
};
</script>

<style lang="scss">
.ds-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
