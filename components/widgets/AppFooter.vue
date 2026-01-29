<template>
  <footer class="footer">
    <AppContainer class="footer__container">
      <div>
        <div class="footer__logo">
          <img class="footer__logo-tank" src="/img/logo-tank.webp" alt="Tank" />
          <img class="footer__avilon" src="/img/firs-logo.webp" alt="Avilon" />
        </div>
        <div class="footer__block-wrapper">
          <div class="footer__block">
            <BaseText tag="span" size="xs">
              АВИЛОН TANK
            </BaseText>
            <BaseText tag="p" size="xs">
              Официальный дилер TANK в Москве © 2025
            </BaseText>
          </div>
          <div class="footer__block">
            <BaseText tag="span" size="xs">
              ИНН: 7705133757
            </BaseText>
            <BaseText tag="p" size="xs">
              ОГРН: 1027700000151
            </BaseText>
          </div>
        </div>
      </div>
      <div class="footer__left">
        <div class="footer__grid">
          <div
            v-for="(links, idx) in footerLinks"
            :key="idx"
            class="footer__list"
          >
            <BaseText
              v-for="(link, index) in links"
              :key="index"
              class="footer__link"
              size="xs"
            >
              <BaseRouteLink :href="link.link">
                {{ link.label }}
              </BaseRouteLink>
            </BaseText>
          </div>
        </div>
        <div class="footer__social-list">
          <BaseRouteLink
            v-for="(item, idx) in socialList"
            :key="idx"
            class="footer__social-link"
            :href="item.link"
          >
            <BaseIcon :icon="item.icon" />
          </BaseRouteLink>
        </div>
      </div>
    </AppContainer>
  </footer>
</template>

<script lang="ts" setup>
import { SOCIAL_LINKS } from '~/assets/constants/general';

interface INavLink {
  label: string;
  link: string;
};

export interface IFooterLinksResponse {
  data: INavLink[][];
}

const socialList = ref([...SOCIAL_LINKS]);

const { data, error } = await useFetch<IFooterLinksResponse>('/api/footer-links');

if (error.value) {
  throw showError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.message,
    message: error.value.message,
  });
}

const footerLinks = computed(() => data.value?.data || []);
</script>

<style lang="scss">
.footer {
  padding: 56px 0 50px;
  color: color('main-white');
  background-color: color('main-gray');

  &__container {
    display: flex;
    flex-direction: column;
    gap: 30px;

    @include media-min("wideTablet") {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__logo {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  &__logo-tank {
    width: 36px;
  }

  &__avilon {
    width: 94px;
  }

  &__block-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 30px;
  }

  &__block {
    display: flex;
    flex-direction: column;
    gap: 4px;

    p {
      margin: 0;
    }

    p, span {
      opacity: .8;
    }
  }

  &__left {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__grid {
    display: grid;
    gap: 35px;
    grid-template-columns: repeat(2, 1fr);

    @include media-min("tablet") {
      grid-template-columns: repeat(3, 1fr);
    }

    @include media-min("wideTablet") {
      padding-right: 18px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  &__link {
    a {
      color: color('main-white');
      @include transition(color);
      opacity: .7;

      &:hover {
        color: color('main-orange');
      }
    }
  }

  &__social-list {
    display: flex;
    align-items: center;
    gap: 17px;
  }

  &__social-link {
    color: color('main-white');
    @include transition(color);

    &:hover {
      color: color('main-orange');
    }

    svg {
      --base-icon-size: 32px;
    }
  }
}
</style>
