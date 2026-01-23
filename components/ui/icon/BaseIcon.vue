<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <svg
    v-if="isCustomPath"
    :class="iconClasses"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    v-html="iconPaths"
  ></svg>

  <svg
    v-else
    :class="iconClasses"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
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
import { ICONS_DATA, type IBaseIcon } from './icon';

const props = defineProps<IBaseIcon>();

const iconData = computed(() => ICONS_DATA[props.icon]);

const iconPaths = computed(() => iconData.value[0]);
const viewBox = computed(() => iconData.value[1] ?? '0 0 20 20');
const fillType = computed(() => iconData.value[2] ?? 'fill');

const iconClasses = computed(() => ([
  'base-icon',
  `base-icon--name-${props.icon}`,
  `base-icon--${fillType.value}`,
]));

const isCustomPath = computed(() => !Array.isArray(iconPaths.value) && String(iconPaths.value).includes('<'));
</script>

<style lang="scss">
.base-icon {
  display: inline-block;
  width: var(--base-icon-size, 20px);
  height: var(--base-icon-size, 20px);

  &--fill {
    fill: currentcolor;
  }

  &--stroke {
    fill: none;
    stroke: currentcolor;
  }
}
</style>
