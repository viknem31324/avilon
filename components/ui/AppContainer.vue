<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss">
:root {
  --rhs-container-gutter: 12px;

  @include media-min('tablet') {
    --rhs-container-gutter: 32px;
  }
}

.container {
  width: 100%;
  max-width: 1264px;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--rhs-container-gutter);
  padding-left: var(--rhs-container-gutter);
}
</style>
