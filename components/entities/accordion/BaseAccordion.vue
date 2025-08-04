<template>
  <section
    :id="id"
    class="ds-accordion"
  >
    <AppContainer class="ds-accordion__container">
      <div
        v-for="(item, index) in items"
        :key="item.props.title"
        class="ds-accordion-item"
        :class="{ 'ds-accordion-item--active': isItemActive(index) }"
      >
        <button
          class="ds-accordion-item__head"
          type="button"
          @click="changeActive(index)"
        >
          <BaseText
            class="ds-accordion-item__title"
            tag="span"
            size="l"
            fluid
          >
            {{ item.props.title }}
          </BaseText>

          <span class="ds-accordion-item__icon">
            <BaseIcon :icon="isItemActive(index) ? 'minus' : 'plus'" />
          </span>
        </button>

        <TransitionExpand>
          <div
            v-if="isItemActive(index)"
            class="ds-accordion-item__body"
          >
            <BaseText size="l" weight="light" fluid>
              <component :is="item" />
            </BaseText>

            <div
              v-if="isItemHasButton(item)"
              class="ds-accordion-item__button"
            >
              <BaseButton
                tag="a"
                :href="item.props.button.href"
                :label="item.props.button.label"
                icon="chevron-right"
              />
            </div>
          </div>
        </TransitionExpand>
      </div>
    </AppContainer>
  </section>
</template>

<script lang="ts" setup>
import type { ComponentOptions } from 'vue';
import type { IBaseAccordion } from './accordion';

const props = withDefaults(defineProps<IBaseAccordion>(), {
  multiple: true,
});

const activeIndex = ref<number | number[] | null>();

const slots = defineSlots();

const items = computed(() => filterSlotChild(slots.default(), 'BaseAccordionItem'));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterSlotChild = (slot: any, childName: string) => slot.reduce((items: any, child: any) => {
  if (child.type.__name === childName) {
    items.push(child);
  } else if (child.children && child.children instanceof Array) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    child.children.forEach((nestedChild: any) => {
      if (nestedChild.type.__name === childName) {
        items.push(nestedChild);
      }
    });
  }

  return items;
}, []);

const isItemActive = (index: number) => {
  return (props.multiple && typeof activeIndex.value !== 'number')
    ? activeIndex.value?.includes(index)
    : activeIndex.value === index;
};

const isItemHasButton = (item: ComponentOptions) => {
  return item.props.button && item.props.button.href && item.props.button.label;
};

const changeActive = (index: number) => {
  const isActive = isItemActive(index);

  if (props.multiple && typeof activeIndex.value !== 'number') {
    if (isActive) {
      activeIndex.value = activeIndex.value?.filter(i => i !== index);
    } else if (activeIndex.value) {
      activeIndex.value.push(index);
    } else {
      activeIndex.value = [index];
    }
  } else {
    activeIndex.value = activeIndex.value === index ? null : index;
  }
};
</script>

<style lang="scss">
.ds-accordion {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.ds-accordion-item {
  $self: &;

  --ds-accordion-head-bg: #{color('black-5')};
  --ds-accordion-head-color: #{color('total-black')};
  --ds-accordion-title-padding-y: 5px;
  --ds-accordion-title-padding-x: 16px;
  --ds-accordion-icon-size: 32px;
  --ds-accordion-icon-bg: transparent;
  --ds-accordion-icon-color: #{color('total-black')};
  --ds-accordion-icon-hover-bg: #{color('green-30')};
  --ds-accordion-icon-hover-color: #{color('total-white')};
  --ds-accordion-body-padding-y: 16px;
  --ds-accordion-body-padding-x: 16px;
  --ds-accordion-body-bg: #{color('black-5')};
  --ds-accordion-body-color: #{color('black-80')};
  --ds-accordion-body-title-color: #{color('total-black')};

  &--active {
    --ds-accordion-head-bg: #{color('smart-green')};
    --ds-accordion-head-color: #{color('total-white')};
    --ds-accordion-icon-bg: #{color('green-30')};
    --ds-accordion-icon-color: #{color('total-white')};
  }

  &__head {
    display: flex;

    width: 100%;
    padding: 0;
    align-items: stretch;
    text-align: left;

    color: var(--ds-accordion-head-color);

    background-color: var(--ds-accordion-head-bg);
    outline: none;
    cursor: pointer;
    border-width: 0;

    @include transition('background-color, color');

    &:hover {
      #{$self}__icon {
        color: var(--ds-accordion-icon-hover-color);
        background-color: var(--ds-accordion-icon-hover-bg);
      }
    }
  }

  &__title {
    padding: var(--ds-accordion-title-padding-y) var(--ds-accordion-title-padding-x);
    flex: 1 1 0;
  }

  &__icon {
    display: flex;

    width: var(--ds-accordion-icon-size);
    justify-content: center;
    align-items: center;

    color: var(--ds-accordion-icon-color);

    background-color: var(--ds-accordion-icon-bg);

    @include transition('background-color, color');
  }

  &__body {
    display: flex;

    padding: var(--ds-accordion-body-padding-y) var(--ds-accordion-body-padding-x);
    flex-direction: column;

    color: var(--ds-accordion-body-color);

    background-color: var(--ds-accordion-body-bg);

    img {
      width: 100%;

      @include media-min('tablet') {
        width: auto;
      }
    }
  }

  &__button {
    margin-top: 16px;

    @include media-min('tablet') {
      margin-top: 24px;
    }
  }

  @include media-min('tablet') {
    --ds-accordion-title-padding-y: 10px;
    --ds-accordion-title-padding-x: 24px;
    --ds-accordion-icon-size: 44px;
    --ds-accordion-body-padding-x: 24px;
  }

  @include media-min('desktop') {
    --ds-accordion-title-padding-y: 14px;
    --ds-accordion-icon-size: 56px;
    --ds-accordion-body-padding-y: 24px;
  }
}
</style>
