<template>
  <div :class="classes">
    <BaseFormLabel
      v-if="label"
      :id="id"
      :disabled="disabled"
      :label="label"
      :name="name"
      :required="required"
      :size="size"
    />

    <div class="ds-input__wrapper">
      <input
        :id="id || name"
        ref="inputRef"
        class="ds-input__item"
        :style="maxLength ? styles : undefined"
        :disabled="disabled"
        :type="isPassword ? showPass ? 'text' : 'password' : type"
        :maxlength="!isPassword ? maxLength : undefined"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        @blur="onBlur"
        @focus="onFocus"
        @input="onChange"
      />
      <button
        v-if="isPassword"
        class="ds-input__button"
        :disabled="disabled"
        type="button"
        @click="togglePassword"
      >
        <BaseIcon :icon="showPass ? 'eye-on' : 'eye-off'" />
      </button>
      <div v-if="maxLength && !isPassword" class="ds-input__counter">
        {{ maxLength - value.length }}
      </div>
    </div>
    <BaseFormHelpMessage
      v-if="!disabled"
      :error-message="errorText || errorMessage"
    />
  </div>
</template>

<script lang="ts" setup>
import { formPartialDefaults } from './helpers/partialProps';
import useFields from './helpers/useFields';
import type { BaseInputEmits, IBaseInput } from './types/input';
import initMaska from '~/assets/scripts/maska';

const COEFFICIENT_PADDING = 10;

const props = withDefaults(defineProps<IBaseInput>(), {
  ...formPartialDefaults,
  type: 'text',
  size: 'm',
  mask: '',
  maxLength: undefined,
  errorText: '',
});

const emits = defineEmits<BaseInputEmits>();

const inputRef = ref(null);
const showPass = ref(false);

const {
  errorMessage,
  value,
  onChange,
  onBlur,
} = useFields(props, { emits });

const onFocus = (evt: FocusEvent) => {
  emits('focus', evt);
};

const togglePassword = () => {
  showPass.value = !showPass.value;
};

onMounted(() => {
  if (inputRef.value && props.mask) {
    initMaska(inputRef.value, props.mask);
  }
});

watch(() => props.modelValue, (newValue) => {
  if (newValue === value.value) return;
  onChange(newValue);
});

const classes = computed(() => ({
  'ds-input': true,
  [`ds-input--size-${props.size}`]: props.size,
  [`ds-input--type-${props.type}`]: props.type,
  'ds-input--disabled': props.disabled,
  'ds-input--error': props.errorText || errorMessage.value,
}));

const styles = computed(() => ({
  paddingRight: `calc(var(--ds-input-item-padding-x) + ${String(props.maxLength).length * COEFFICIENT_PADDING}px)`,
}));

const isPassword = computed(() => props.type === 'password');
</script>

<style lang="scss">
.ds-input {
  $self: &;

  --ds-input-disabled-color: #{color('black-40')};
  --ds-input-item-padding-y: 10px;
  --ds-input-item-padding-x: 16px;
  --ds-input-item-color: #{color('total-black')};
  --ds-input-item-bg: #{color('total-white')};
  --ds-input-item-border: #{color('black-20')};
  --ds-input-item-focus-border: #{color('total-black')};
  --ds-input-item-disabled-color: #{color('total-black')};
  --ds-input-item-disabled-bg: #{color('black-5')};
  --ds-input-item-disabled-border: #{color('black-10')};
  --ds-input-item-hover-border: #{color('black-60')};
  --ds-input-item-placeholder-color: #{color('black-40')};
  --ds-input-item-error-border: #{color('active-red')};
  --ds-input-icon-color: #{color('black-40')};
  display: flex;
  flex-direction: column;

  &--disabled {
    cursor: not-allowed;
    user-select: none;
    color: var(--ds-input-disabled-color);
  }

  &--type {
    &-password {
      #{$self}__item {
        padding-right: calc(var(--ds-input-item-padding-x) + var(--ds-input-button-size) + var(--ds-input-item-gap));
      }
    }
  }

  &--error {
    #{$self}__item {
      border-color: var(--ds-input-item-error-border);
    }
  }

  &--size {
    &-s {
      --ds-input-item-padding-y: 4px;
      --ds-input-item-padding-x: 15px;
      --ds-input-item-gap: 4px;
      --ds-input-button-size: 16px;

      @include text-styles-variable('ds-input', 's');

      @include media-min('tablet') {
        --ds-input-item-padding-y: 7px;
        --ds-input-item-gap: 6px;
        --ds-input-button-size: 20px;

        @include text-styles-variable('ds-input', 'm');
      }

      @include media-min('desktop') {
        --ds-input-item-padding-y: 9px;
      }
    }

    &-m {
      --ds-input-item-padding-y: 7px;
      --ds-input-item-padding-x: 15px;
      --ds-input-item-gap: 6px;
      --ds-input-button-size: 20px;

      @include text-styles-variable('ds-input', 'm');

      @include media-min('tablet') {
        --ds-input-item-padding-y: 9px;
      }

      @include media-min('desktop') {
        --ds-input-item-padding-y: 11px;
      }
    }

    &-l {
      --ds-input-item-padding-y: 9px;
      --ds-input-item-padding-x: 15px;
      --ds-input-item-gap: 6px;
      --ds-input-button-size: 20px;

      @include text-styles-variable('ds-input', 'm');

      @include media-min('tablet') {
        --ds-input-item-padding-y: 11px;
      }

      @include media-min('desktop') {
        --ds-input-item-padding-y: 13px;
        --ds-input-item-padding-x: 23px;
        --ds-input-item-gap: 8px;
        --ds-input-button-size: 24px;

        @include text-styles-variable('ds-input', 'l');
      }
    }
  }

  &__wrapper {
    position: relative;
  }

  &__item {
    display: block;

    width: 100%;
    padding: var(--ds-input-item-padding-y) var(--ds-input-item-padding-x);

    font: inherit;
    font-size: var(--ds-input-font-size);
    font-weight: $font-weight-medium;
    line-height: var(--ds-input-line-height);
    color: var(--ds-input-item-color);

    background-color: var(--ds-input-item-bg);
    border: 1px solid var(--ds-input-item-border);
    border-radius: 0;

    @include transition('border-color');

    &::placeholder {
      color: var(--ds-input-item-placeholder-color);
    }

    &:hover {
      border-color: var(--ds-input-item-hover-border);
    }

    &:focus,
    &:focus-visible {
      box-sizing: border-box;
      border: 1px solid var(--ds-input-item-focus-border);
      border-radius: 0;
      outline: 0;

      ~ #{$self}__button {
        color: var(--ds-input-item-color);
      }
    }

    &:disabled {
      cursor: not-allowed;
      user-select: none;

      color: var(--ds-input-item-disabled-color);

      background-color: var(--ds-input-item-disabled-bg);
      border-color: var(--ds-input-item-disabled-border);
    }
  }

  &__button {
    position: absolute;
    top: 0;
    right: var(--ds-input-item-padding-x);

    display: flex;
    align-items: center;

    width: max-content;
    height: 100%;
    padding: 0;

    color: var(--ds-input-icon-color);

    background: transparent;
    border: none;

    .icon {
      width: var(--ds-input-button-size);
      height: var(--ds-input-button-size);
    }
  }

  &__counter {
    pointer-events: none;
    user-select: none;

    position: absolute;
    top: var(--ds-input-item-padding-y);
    right: var(--ds-input-item-padding-x);

    font-size: var(--ds-input-font-size);
    font-weight: $font-weight-medium;
    line-height: var(--ds-input-line-height);
    color: var(--ds-input-item-placeholder-color);
  }
}
</style>
