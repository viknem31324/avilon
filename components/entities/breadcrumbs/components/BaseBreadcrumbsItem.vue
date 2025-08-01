<template>
  <li class="ds-breadcrumbs-item">
    <BaseRouteLink
      :href="!isDisabled ? href : undefined"
      class="ds-breadcrumbs-item__link"
      :class="{ 'ds-breadcrumbs-item__link--accent': isAccent }"
      active-class="ds-breadcrumbs-item__link-active"
    >
      <BaseIcon v-if="icon" class="ds-breadcrumbs-item__icon" :icon="icon" />
      <BaseText v-else tag="span" size="xs">
        {{ text }}
      </BaseText>
    </BaseRouteLink>
  </li>
</template>

<script lang="ts" setup>
import type { IBaseBreadcrumbsItem } from '../breadcrumbs';

withDefaults(defineProps<IBaseBreadcrumbsItem>(), {
  isAccent: false,
  isDisabled: false,
});
</script>

<style lang="scss">
.ds-breadcrumbs-item {
  --ds-breadcrumb-item-color: #{color('black-60')};
  --ds-breadcrumb-item-active-color: #{color('smart-green')};
  --ds-breadcrumb-item-hover-color: #{color('smart-green')};
  --ds-breadcrumb-separator-icon: url("data:image/svg+xml,%3Csvg viewBox='0 0 8 8' fill='%23818181' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.55594 3.72867C5.70356 3.87852 5.70356 4.12148 5.55594 4.27133L2.97862 6.88761C2.831 7.03746 2.59166 7.03746 2.44404 6.88761C2.29642 6.73776 2.29642 6.4948 2.44404 6.34495L4.75407 4L2.44404 1.65505C2.29642 1.5052 2.29642 1.26224 2.44404 1.11239C2.59166 0.962537 2.831 0.962537 2.97862 1.11239L5.55594 3.72867Z' /%3E%3C/svg%3E");
  color: var(--ds-breadcrumb-item-color);

  &--active {
    color: var(--ds-breadcrumb-item-active-color);
  }

  &:not(:first-child) {
    position: relative;
    padding-left: 12px;

    &::before {
      content: '';

      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);

      width: 8px;
      height: 8px;

      background-image: var(--ds-breadcrumb-separator-icon);
      background-size: 8px 8px;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;

    &:not(div):hover {
      color: var(--ds-breadcrumb-item-active-color);
    }

    &--accent {
      color: var(--ds-breadcrumb-item-active-color);
    }
  }

  &__icon {
    font-size: 16px;
  }
}
</style>
