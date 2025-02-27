<template>
  <BaseList class="ds-tags">
    <BaseTag
      v-for="item in items"
      :key="item.id"
      v-bind="item"
      :variant="variant"
      :size="size"
      @click="onClick(item.id)"
    />
  </BaseList>
</template>

<script lang="ts" setup>
import type { IBaseTags, BaseTagsEmits } from './tags';

withDefaults(defineProps<IBaseTags>(),
  {
    variant: 'green',
    size: 'm',
  },
);

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
