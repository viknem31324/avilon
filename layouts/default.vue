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
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss">
.main-layout {
  min-height: 100vh;
  background-color: color('main-black');
}
</style>
