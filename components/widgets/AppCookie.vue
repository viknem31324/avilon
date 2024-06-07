<template>
  <div v-if="!showCookies" class="cookies">
    <AppContainer>
      <button type="button" @click="onCookieConfirm">
        cookies
      </button>
    </AppContainer>
  </div>
</template>

<script lang="ts" setup>
const showCookies = useCookie<boolean>('showCookies');

const onCookieConfirm = () => {
  showCookies.value = true;
};
</script>

<style lang="scss" scoped>
.cookies {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
}
</style>
