<template>
  <transition
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script lang="ts" setup>
const enter = (element: Element) => {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  const { height } = getComputedStyle(element);

  element.style.width = '';
  element.style.position = '';
  element.style.visibility = '';
  element.style.height = '0';

  setTimeout(() => {
    element.style.height = height;
  }, 0);
};

const afterEnter = (element: Element) => {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  element.style.height = 'auto';
};

const leave = (element: Element) => {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  const { height } = getComputedStyle(element);
  element.style.height = height;

  setTimeout(() => {
    element.style.height = '0';
  }, 0);
};
</script>

<style lang="scss">
.expand {
  &-enter-active,
  &-leave-active {
    overflow: hidden;
    transition: height .2s linear;
  }
}
</style>
