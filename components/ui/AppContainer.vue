<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss">
:root {
  --ds-container-gutter: 12px;

  @include media-min('tablet') {
    --ds-container-gutter: 32px;
  }
}

.container {
  width: 100%;
  max-width: 1325px;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--ds-container-gutter);
  padding-left: var(--ds-container-gutter);
}
</style>
