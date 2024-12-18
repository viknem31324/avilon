<template>
  <Transition name="fade">
    <slot />
  </Transition>
</template>

<style lang="scss">
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
