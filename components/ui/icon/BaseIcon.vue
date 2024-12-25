<template>
  <svg
    :class="`ds-icon ds-icon--name-${props.icon}`"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
    :aria-label="props.icon"
  >
    <template v-if="Array.isArray(iconPaths)">
      <path
        v-for="(path, index) in iconPaths"
        :key="index"
        :d="path"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </template>
    <path
      v-else
      :d="(iconPaths as string)"
      fill-rule="evenodd"
      clip-rule="evenodd"
    />
  </svg>
</template>

<script lang="ts" setup>
import { PATHS, type IBaseIcon } from './icon';

const props = defineProps<IBaseIcon>();

const iconPaths = computed(() => PATHS[props.icon]);
</script>

<style lang="scss">
.ds-icon {
  display: flex;
  width: var(--ds-icon-size, 20px);
  height: var(--ds-icon-size, 20px);
  fill: currentcolor;
}
</style>
