<template>
  <div class="ds-player">
    <iframe
      class="ds-player__iframe"
      :src="video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      :title="title"
      loading="lazy"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IBasePlayer } from './player';

defineProps<IBasePlayer>();
</script>

<style lang="scss">
.ds-player {
  position: relative;
  overflow: hidden;
  width: 100%;

  // padding-top: 70.435%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */

  &__iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
