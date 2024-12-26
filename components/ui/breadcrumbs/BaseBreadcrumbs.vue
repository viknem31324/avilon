<template>
  <nav
    aria-label="Навигация по вложенным страницам"
    class="ds-breadcrumbs"
  >
    <BaseList tag="ol">
      <BaseBreadcrumbsItem
        v-for="(item, index) in items"
        :key="item.href"
        v-bind="item"
        :is-disabled="index === lastElement"
      />
    </BaseList>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { IBaseBreadcrumbs } from './breadcrumbs';

const props = defineProps<IBaseBreadcrumbs>();

const lastElement = computed(() => props.items.length - 1);
</script>

<style lang="scss">
.ds-breadcrumbs {
  ol {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
  }
}
</style>
