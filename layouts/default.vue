<template>
  <div id="app">
    <AppHeader :is-scrolled="isScrolled" />

    <main class="main-layout">
      <slot />
    </main>

    <LazyAppFooter />
  </div>
</template>

<script lang="ts" setup>
const isOpenHeaderMenu = useState('headerMenu', () => false);
const isScrolled = ref<boolean>(true);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 0;

    window.addEventListener('scroll', handleScroll);
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style lang="scss">
.main-layout {
  min-height: 100vh;
  background-color: color('main-black');
}
</style>
