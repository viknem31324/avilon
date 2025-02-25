<template>
  <div class="ds-chips-item">
    {{ label }}
  </div>
</template>

<script lang="ts" setup>
import type { IBaseChipItem } from '../chips';

defineProps<IBaseChipItem>();
</script>

<style lang="scss">
.ds-chips-item {
  cursor: pointer;
}
</style>
