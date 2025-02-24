<template>
  <div v-if="isShow" class="cookies">
    <AppContainer>
      <button type="button" @click="onCookieConfirm">
        cookies
      </button>
    </AppContainer>
  </div>
</template>

<script lang="ts" setup>
const showCookies = useCookie<boolean>('showCookies', {
  maxAge: 31536000,
  default: () => true,
});

const isShow = ref(false);

const onCookieConfirm = () => {
  showCookies.value = false;
  isShow.value = false;
};

onMounted(() => {
  isShow.value = showCookies.value;
});
</script>

<style lang="scss" scoped>
.cookies {
  position: fixed;
  z-index: 10000;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
