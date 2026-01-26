<template>
  <header class="header">
    <AppContainer>
      <div class="header__top">
        <div class="header__top-wrapper">
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
        <div class="header__top-block">
          <BaseIcon icon="phone" />
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
        <a class="header__nav-calback" href="tel:+74951213568" target="_blank">
          <BaseIcon icon="phone" />
          <BaseText size="xs">Заказать звонок</BaseText>
        </a>
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

    @include media-min("wideTablet") {
      display: block;
    }
  }

  &__top-wrapper {
    display: flex;
    align-items: center;
    gap: 9px;

    @include media-min("wideTablet") {
      justify-content: space-between;
      gap: 0;
    }
  }

  &__top-block {
    display: flex;
    gap: 20px;
    align-items: center;

    svg {
      --base-icon-size: 16px;
      flex-shrink: 0;
      color: color('orange-1');
    }

    @include media-min("wideTablet") {
      display: none;
    }
  }

  &__burger {
    width: 20px;
    height: 20px;
    
    span {

    }
  }

  &__logo-tank {
    width: 18px;
    flex-shrink: 0;

    @include media-min("wideTablet") {
      width: 36px;
    }
  }

  &__info {
    display: none;

    @include media-min("wideTablet") {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
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
    position: fixed;
    top: 52px;
    right: 0;
    z-index: 1100;
    width: 100%;
    height: 100%;
    padding: 20px 24px;
    background-color: color('main-black');

    @include media-min("wideTablet") {
      position: static;
      max-width: 828px;
      margin: 12px auto 0;
      padding: 0;
      background-color: transparent;
    }
  }

  &__nav-calback {
    display: flex;
    width: max-content;
    padding: 5px 20px;
    margin-top: 28px;
    align-items: center;
    gap: 4px;
    color: color('main-white');
    background-color: color('orange-1');
    border-radius: 4px;

    svg {
      --base-icon-size: 12px;
      flex-shrink: 0;
    }

    @include media-min("wideTablet") {
      display: none;
    }
  }

  &__nav-list {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 28px;

    @include media-min("wideTablet") {
      display: flex;
      flex-direction: row;
      gap: 24px;
      align-items: center;
    }
  }

  &__nav-item {
    flex-shrink: 0;
    text-transform: uppercase;
    color: color('main-white');
    @include transition('color');

    @include media-min("wideTablet") {
      opacity: .8;

      &:hover {
        color: color('orange-1');
      }
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
