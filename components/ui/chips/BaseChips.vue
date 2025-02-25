<template>
  <div class="ds-chips">
    <div class="ds-chips__items">
      <BaseChipsItem
        v-for="item in items"
        :key="item.id"
        v-bind="item"
        :is-active="isActive(item.id)"
        @click="handleChipClick(item)"
      >
        {{ item.label }}
      </BaseChipsItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BaseChipsEmits, IBaseChipItem, IBaseChips } from './chips';
import BaseChipsItem from './components/BaseChipsItem.vue';

const props = defineProps<IBaseChips>();
const emits = defineEmits<BaseChipsEmits>();

const chipsActive = ref<IBaseChipItem[]>(props.items.filter(item => item.isActive));

const isActive = (id: number) => {
  return !!chipsActive.value.filter(item => item.id === id).length;
};

const handleChipClick = (currentItem: IBaseChipItem) => {
  const index = chipsActive.value.findIndex(item => item.id === currentItem.id);

  if (index !== -1) {
    chipsActive.value.splice(index, 1);
  } else {
    chipsActive.value.push(currentItem);
  }
  const ids = chipsActive.value.map(item => item.id);
  emits('click', ids);
};
</script>

<style lang="scss">
.ds-chips {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
