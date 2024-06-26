<template>
  <NuxtLayout>
    <div class="error-page">
      <AppContainer>
        <p>{{ error.statusCode }}</p>
        <h1>{{ getStatusCodeText }}</h1>
      </AppContainer>
    </div>
  </NuxtLayout>

  <LazyAppCookie />
</template>

<script lang="ts" setup>
import type { NuxtError } from '@nuxt/types';

const props = defineProps<{
  error: NuxtError;
}>();

useHead({
  title: `Страница ${props.error.statusCode}`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: `Страница ${props.error.statusCode}`,
    },
  ],
});

const getStatusCodeText = computed(() => {
  return props.error.statusCode === 404
    ? 'Страница не найдена'
    : 'Что-то пошло не так';
});
</script>

<style lang="scss">
.error-page {
  display: flex;
}
</style>
