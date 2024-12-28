<template>
  <div class="ds-form" :style="styles">
    <AppContainer :class="classes">
      <BaseFormDescription
        :id="id"
        class="ds-form__wrapper ds-form__description"
        :description="description"
        :title="title"
      />

      <ValidateForm
        v-slot="data"
        v-bind="$attrs"
        class="ds-form__wrapper"
        :validation-schema="validationSchema"
        @submit="onSubmit"
      >
        <div class="ds-form__main">
          <slot />
        </div>

        <TransitionFade mode="out-in">
          <slot v-if="!submitMessage" v-bind="data" name="actions">
            <BaseButton
              v-bind="button"
              :disabled="!data.meta.valid || buttonDisable"
              type="submit"
              :variant="button.variant || BUTTON_VARIANTS.ACCENT"
            />
          </slot>
          <div v-else>
            <slot name="submitMessage">
              {{ submitMessage }}
            </slot>
          </div>
        </TransitionFade>
      </ValidateForm>
    </AppContainer>
  </div>
</template>

<script lang="ts" setup>
import { Form as ValidateForm, type FormActions, type GenericObject } from 'vee-validate';
import type { BaseFormEmits, IBaseForm } from './form';
import { BUTTON_VARIANTS } from '~/components/ui/button/button';

const props = withDefaults(defineProps<IBaseForm>(), {
  backgroundColor: '',
  backgroundImg: '',
  buttonDisable: false,
  button: () => ({
    icon: 'chevron-right',
    label: 'Отправить',
  }),
  description: '',
  id: undefined,
  position: 'center',
  submitMessage: undefined,
  title: '',
  validationSchema: undefined,
});

const emits = defineEmits<BaseFormEmits>();

const onSubmit = (values: Record<string, string | number>, action: FormActions<GenericObject>) => {
  emits('submit', { values, action });
};

const classes = computed(() => ({
  [`ds-form__container ds-form__container--${props.position}`]: true,
}));
const styles = computed(() => ({
  'background-color': props.backgroundColor,
  'background-image': props.backgroundImg && `url(${props.backgroundImg})`,
  'background-repeat': props.backgroundImg && 'none',
  'background-size': props.backgroundImg && 'cover',
}));
</script>

<style lang="scss">
.ds-form {
  $self: &;

  --ds-form-padding-y: 48px;
  --ds-form-padding-x: 12px;
  --ds-form-bg: #{color("black-5")};
  --ds-form-wrapper-padding: 24px;
  --ds-form-wrapper-bg: #{color("total-white")};
  --ds-form-title-color: #{color("total-black")};
  --ds-form-description-color: #{color("black-80")};
  background-color: var(--ds-form-bg);

  &__container {
    padding: var(--ds-form-padding-y) var(--ds-form-padding-x);

    &--center {
      #{$self}__wrapper {
        margin: 0 auto;
      }
    }

    &--right {
      display: grid;
      justify-content: center;

      @include media-min("desktop") {
        grid-template-columns: repeat(2, 1fr);
        gap: 40px;
        align-items: start;
        justify-content: space-between;
      }

      #{$self}__description {
        width: 100%;

        @include media-min("desktop") {
          padding-bottom: var(--ds-form-wrapper-padding);
        }
      }
    }
  }

  &__wrapper {
    max-width: 792px;
    padding: var(--ds-form-wrapper-padding);
    background-color: var(--ds-form-wrapper-bg);

    @include media-min("tablet") {
      --ds-form-wrapper-padding: 32px;
    }
  }

  &__description {
    padding-bottom: 0;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 40px;
  }

  @include text-styles-variable("ds-form-title", "xl");
  @include text-styles-variable("ds-form-description", "s");

  @include media-min("tablet") {
    --ds-form-padding-y: 64px;
    --ds-form-padding-x: 32px;

    @include text-styles-variable("ds-form-description", "m");
  }

  @include media-min("desktop") {
    --ds-form-padding-y: 96px;
  }
}
</style>
