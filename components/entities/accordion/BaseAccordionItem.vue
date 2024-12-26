<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <slot />
</template>

<script lang="ts" setup>
import type { IBaseAccordionItem } from './accordion';

defineProps<IBaseAccordionItem>();
</script>
