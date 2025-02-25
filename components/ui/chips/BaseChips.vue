<template>
  <div class="ds-chips">
    <div class="ds-chips__items">
      <BaseChipsItem
        v-for="item in chips"
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

const chips = ref<IBaseChipItem[]>(props.items);

const isActive = (id: number) => {
  return !!props.items.filter(item => item.id === id).length;
};

const handleChipClick = (currentItem: IBaseChipItem) => {
  const index = chips.value.findIndex(item => item.id === currentItem.id);

  if (index !== -1) {
    chips.value.splice(index, 1);
  } else {
    chips.value.push(currentItem);
  }

  emits('click', currentItem.id);
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
