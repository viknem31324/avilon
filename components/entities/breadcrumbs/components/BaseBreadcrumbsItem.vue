<template>
  <li class="ds-breadcrumbs-item">
    <BaseRouteLink
      :href="!isDisabled ? href : undefined"
      class="ds-breadcrumbs-item__link"
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
  isDisabled: false,
});
</script>

<style lang="scss">
.ds-breadcrumbs-item {
  $self: &;

  --ds-breadcrumb-item-color: #{color('total-white')};
  --ds-breadcrumb-item-hover-color: #{color('orange-1')};
  --ds-breadcrumb-separator-icon: url("data:image/svg+xml,%3Csvg viewBox='0 0 8 8' fill='%23818181' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.55594 3.72867C5.70356 3.87852 5.70356 4.12148 5.55594 4.27133L2.97862 6.88761C2.831 7.03746 2.59166 7.03746 2.44404 6.88761C2.29642 6.73776 2.29642 6.4948 2.44404 6.34495L4.75407 4L2.44404 1.65505C2.29642 1.5052 2.29642 1.26224 2.44404 1.11239C2.59166 0.962537 2.831 0.962537 2.97862 1.11239L5.55594 3.72867Z' /%3E%3C/svg%3E");
  position: relative;
  color: var(--ds-breadcrumb-item-color);
  @include transition('color');

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
    position: relative;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;

    &:not(div) {
      &::after {
        content: "";
        position: absolute;
        bottom: 2px;
        left: -1px;
        width: 105%;
        height: 1px;
        background-color: color('total-white');
        @include transition('background-color');
      }
    }

    &:not(div):hover {
      color: var(--ds-breadcrumb-item-hover-color);

      &::after {
        background-color: var(--ds-breadcrumb-item-hover-color);
      }
    }
  }

  &__icon {
    font-size: 16px;
  }
}
</style>
