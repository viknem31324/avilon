<template>
  <div id="app">
    <AppHeader />

    <main class="main-layout">
      <slot />
    </main>

    <!-- <LazyAppFooter /> -->
  </div>
</template>

<script lang="ts" setup>
const isOpenHeaderMenu = useState('headerMenu', () => false);
</script>

<style lang="scss">
.main-layout {
  min-height: 100vh;
  background-color: color('main-black');
}
</style>
