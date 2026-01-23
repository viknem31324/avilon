<template>
  <header class="header">
    <AppContainer>
      <div class="header__top">
        <BaseLogo
          first-logo="/img/firs-logo.webp"
          first-logo-alt="Avilon"
          second-logo="/img/second-logo.webp"
          second-logo-alt="Автодилер года 2024"
        />
        <img class="header__logo-tank" src="/img/logo-tank.webp" alt="Tank" />
        <div class="header__info">
          <address class="header__address">
            <BaseIcon icon="geo" />
            <BaseText size="xs" weight="light">
              Москва, Волгоградский проспект, 41, к. 1
            </BaseText>
          </address>
          <a class="header__phone" href="tel:+74951213568" target="_blank">
            <BaseIcon icon="phone" />
            <BaseText size="xs">+7 (495) 121-35-68</BaseText>
          </a>
        </div>
      </div>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <BaseText
            v-for="(item, idx) in navList"
            :key="idx"
            class="header__nav-item"
            :class="{ 'header__nav-item--accent': item.isAccent }"
            size="s"
            tag="li"
            weight="bold"
          >
            <BaseRouteLink :href="item.href">
              {{ item.label }}
            </BaseRouteLink>
          </BaseText>
        </ul>
      </nav>
    </AppContainer>
  </header>
</template>

<script lang="ts" setup>
import BaseRouteLink from '../shared/BaseRouteLink.vue';
import { HEADER_NAV } from '~/assets/constants/general';

interface NavItem {
  label: string;
  href: string;
  isAccent?: boolean;
};

const navList = ref<NavItem[]>([...HEADER_NAV]);
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  width: 100%;
  padding-top: 17px;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo-tank {
    width: 36px;
    flex-shrink: 0;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__address {
    display: flex;
    align-items: center;
    gap: 8px;
    font-style: normal;
    color: color('main-white');

    svg {
      --base-icon-size: 15px;
      flex-shrink: 0;
    }
  }

  &__phone {
    display: flex;
    align-items: center;
    gap: 8px;
    color: color('main-white');
    @include transition('color');

    &:hover {
      color: color('orange-1');
    }

    svg {
      --base-icon-size: 15px;
      flex-shrink: 0;
      color: color('orange-1');
    }
  }

  &__nav {
    max-width: 828px;
    margin: 12px auto 0;
  }

  &__nav-list {
    display: flex;
    gap: 24px;
    justify-content: space-between;
    align-items: center;
  }

  &__nav-item {
    flex-shrink: 0;
    text-transform: uppercase;
    color: color('main-white');
    @include transition('color');
    opacity: .8;

    &:hover {
      color: color('orange-1');
    }

    &--accent {
      background-color: color('orange-1');
      border-radius: 4px;

      &:hover {
        color: color('main-gray');
      }

      a {
        display: inline-block;
        padding: 2px 4px;
      }
    }

    a {
      color: inherit;
    }
  }
}
</style>
