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
  --ds-breadcrumb-separator-icon: url("data:image/svg+xml,%3Csvg viewBox='0 0 5 10' fill='%23FEFEFE' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M.966 9.18L0 8.212 3.62 4.59 0 .968.968 0l3.617 3.622a1.369 1.369 0 010 1.936L.965 9.18z' /%3E%3C/svg%3E");
  position: relative;
  color: var(--ds-breadcrumb-item-color);
  @include transition('color');

  &:not(:first-child) {
    position: relative;
    padding-left: 16px;

    &::before {
      content: '';

      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);

      width: 10px;
      height: 10px;

      background-image: var(--ds-breadcrumb-separator-icon);
      background-size: 10px 10px;
      background-repeat: no-repeat;
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
