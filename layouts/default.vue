<template>
  <div id="app">
    <AppHeader />

    <main class="main-layout">
      <slot />
    </main>

    <!-- <LazyAppFooter /> -->
  </div>
</template>

<style lang="scss">
.main-layout {
  min-height: 100vh;
}
</style>
