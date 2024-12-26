<template>
  <TransitionFade>
    <div
      v-show="isOpen"
      class="ds-lightbox"
      @click="close"
    >
      <div class="ds-lightbox__dialog">
        <div
          class="ds-lightbox__content"
          @click.stop
        >
          <div class="ds-lightbox__header">
            <BaseHeading v-if="title" class="ds-lightbox__heading">
              {{ title }}
            </BaseHeading>
            <div v-if="isClosing" class="ds-lightbox__close">
              <BaseButton icon="close" variant="ghost" @click="close" />
            </div>
          </div>
          <div class="ds-lightbox__body">
            <slot
              :close="close"
              :confirm="confirm"
            />
          </div>
        </div>
      </div>
    </div>
  </TransitionFade>
</template>

<script lang="ts" setup>
import type { IBaseLightbox, BaseLightboxEmits } from './lightbox';
import useKeydownHandler from '~/hooks/useKeydownHandler';
import useHiddenDocument from '~/hooks/useHiddenDocument';

const props = withDefaults(defineProps<IBaseLightbox>(), {
  title: '',
  isOpen: false,
  isClosing: true,
});

const emits = defineEmits<BaseLightboxEmits>();

const { hidden, unhidden } = useHiddenDocument();

const confirm = () => {
  emits('confirm');
};

const close = () => {
  emits('close');
};

const pressedEscape = (evt: KeyboardEvent) => {
  if (evt.key === 'Escape' && props.isOpen) {
    close();
  }
};

watch(() => props.isOpen, () => {
  if (props.isOpen) {
    hidden();
    return;
  }

  unhidden();
});

useKeydownHandler({
  Escape: pressedEscape,
});
</script>

<style lang="scss">
.ds-lightbox {
  --ds-modal-bg: #{color('total-white')};
  --ds-modal-color: #{color('total-black')};
  --ds-modal-close-btn-shade-bg:
    linear-gradient(180deg, #{rgba(color('total-white'), 1)} 6.77%, #{rgba(color('total-white'), 0)} 100%);
  --ds-lightbox-body-color: #{color('black-80')};
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;

  overflow: hidden auto;

  width: 100vw;
  height: 100dvh;

  background: rgb(0 0 0 / 60%);
  outline: 0;

  &__dialog {
    pointer-events: none;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: var(--ds-lightbox-dialog-justify-content, center);

    min-height: 100%;
    padding: var(--ds-lightbox-dialog-padding, 12px);
  }

  &__content {
    pointer-events: auto;

    overflow-y: auto;

    width: 100%;
    max-width: var(--ds-lightbox-content-max-width, 480px);
    max-height: 80dvh;

    color: var(--ds-modal-color);

    background-color: var(--ds-modal-bg);
    box-shadow: 0 6px 16px rgb(0 0 0 / 5%),
    0 9px 28px 8px rgb(0 0 0 / 5%);

    @include custom-scroll;
  }

  &__header {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    padding: 12px;

    @include media-min('desktop') {
      padding: 32px 32px 24px;
    }
  }

  &__heading {
    margin: 0;
  }

  &__close {
    flex-shrink: 0;
    margin-top: -12px;
    margin-right: -12px;
    margin-left: auto;

    @include media-min('desktop') {
      margin-top: -32px;
      margin-right: -32px;
    }
  }

  &__body {
    padding: 4px 12px 32px;
    color: var(--ds-lightbox-body-color);

    @include media-min('desktop') {
      padding: 0 32px 32px;
    }

    &--no-padding {
      padding: 0;
    }
  }
}
</style>
