<template>
  <div :class="classes">
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

const props = withDefaults(defineProps<IBaseChips>(), {
  size: 'm',
  variant: 'red',
});
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

const classes = computed(() => ({
  [`ds-chips ds-chips--variant-${props.variant} ds-chips--size-${props.size}`]: true,
}));
</script>

<style lang="scss">
.ds-chips {
  --ds-chips-bg: transparent;
  --ds-chips-active-color: #{color('total-white')};
  display: flex;
  flex-direction: column;
  gap: 8px;

  &--variant {
    &-green {
      --ds-chips-color: #{color('smart-green')};
      --ds-chips-border-color: #{color('smart-green')};
      --ds-chips-active-bg: #{color('smart-green')};
    }

    &-red {
      --ds-chips-color: #{color('active-red')};
      --ds-chips-border-color: #{color('active-red')};
      --ds-chips-active-bg: #{color('active-red')};
    }
  }

  &--size {
    &-s {
      @include text-styles('s');
    }

    &-m {
      @include text-styles('m');
    }

    &-l {
      @include text-styles('l');
    }
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
