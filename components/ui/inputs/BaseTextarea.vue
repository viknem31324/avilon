<template>
  <div :class="classes">
    <BaseFormLabel
      v-if="label"
      :id="id"
      :disabled="disabled"
      :label="label"
      :name="name"
      :required="required"
    />
    <div class="ds-textarea__wrapper">
      <textarea
        :id="id || name"
        class="ds-textarea__item"
        :style="maxLength ? styles : undefined"
        cols="num"
        :disabled="disabled"
        :maxlength="maxLength"
        :name="name"
        :placeholder="placeholder"
        rows="num"
        :value="value"
        @blur="onBlur"
        @focus="onFocus"
        @input="onChange"
      />
      <div v-if="maxLength" class="ds-textarea__counter">
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
import type { BaseTextareaEmits, IBaseTextarea } from './types/textarea';

const COEFFICIENT_PADDING = 9;

const props = withDefaults(defineProps<IBaseTextarea>(), {
  ...formPartialDefaults,
  size: 'm',
  maxLength: undefined,
  errorText: '',
});

const emits = defineEmits<BaseTextareaEmits>();

const {
  errorMessage,
  value,
  onChange,
  onBlur,
} = useFields(props, { emits });

const classes = computed(() => ({
  'ds-textarea': true,
  [`ds-textarea--size-${props.size}`]: props.size,
  'ds-textarea--error': props.errorText || errorMessage.value,
}));

const styles = computed(() => ({
  paddingRight: `calc(var(--ds-textarea-item-padding-x) + ${String(props.maxLength).length * COEFFICIENT_PADDING}px)`,
}));

watch(() => props.modelValue, () => {
  if (props.modelValue === value.value) {
    return;
  }

  onChange(props.modelValue);
});

const onFocus = (evt: FocusEvent) => {
  emits('focus', evt);
};
</script>

<style lang="scss">
.ds-textarea {
  $self: &;

  --ds-textarea-item-color: #{color('total-black')};
  --ds-textarea-item-border: #{color('black-20')};
  --ds-textarea-item-bg: #{color('total-white')};
  --ds-textarea-item-border-focus: #{color('total-black')};
  --ds-textarea-item-disabled-color: #{color('total-black')};
  --ds-textarea-item-disabled-border-color: #{color('black-10')};
  --ds-textarea-item-disabled-bg: #{color('black-5')};
  --ds-textarea-item-placeholder-color: #{color('black-40')};
  --ds-textarea-item-error-border-color: #{color('active-red')};
  --ds-textarea-item-hover-bg: #{color('total-white')};
  --ds-textarea-item-hover-border-color: #{color('black-60')};
  --ds-textarea-item-hover-color: #{color('black-40')};
  display: flex;
  flex-direction: column;

  &--error {
    #{$self}__item {
      border-color: var(--ds-textarea-item-error-border-color);
    }
  }

  &--size {
    &-s {
      --ds-textarea-item-padding-y: 4px;
      --ds-textarea-item-padding-x: 15px;

      @include text-styles-variable('ds-textarea-item', 's');

      @include media-min('tablet') {
        --ds-textarea-item-padding-y: 7px;

        @include text-styles-variable('ds-textarea-item', 'm');
      }

      @include media-min('desktop') {
        --ds-textarea-item-padding-y: 9px;
      }
    }

    &-m {
      --ds-textarea-item-padding-y: 7px;
      --ds-textarea-item-padding-x: 15px;

      @include text-styles-variable('ds-textarea-item', 'm');

      @include media-min('tablet') {
        --ds-textarea-item-padding-y: 9px;
      }

      @include media-min('desktop') {
        --ds-textarea-item-padding-y: 11px;
      }
    }

    &-l {
      --ds-textarea-item-padding-y: 9px;
      --ds-textarea-item-padding-x: 15px;

      @include text-styles-variable('ds-textarea-item', 'm');

      @include media-min('tablet') {
        --ds-textarea-item-padding-y: 11px;
      }

      @include media-min('desktop') {
        --ds-textarea-item-padding-y: 13px;
        --ds-textarea-item-padding-x: 23px;

        @include text-styles-variable('ds-textarea-item', 'l');
      }
    }
  }

  &__wrapper {
    position: relative;
  }

  &__item {
    resize: vertical;

    width: 100%;
    min-height: 120px;
    padding: var(--ds-textarea-item-padding-y) var(--ds-textarea-item-padding-x);

    font: inherit;
    font-size: var(--ds-textarea-item-font-size);
    font-weight: $font-weight-medium;
    line-height: var(--ds-textarea-item-line-height);
    color: var(--ds-textarea-item-color);

    background-color: var(--ds-textarea-item-bg);
    border: 1px solid var(--ds-textarea-item-border);

    @include transition('background-color, border-color, color');

    &::placeholder {
      color: var(--ds-textarea-item-placeholder-color);
    }

    &:focus,
    &:focus-visible {
      box-sizing: border-box;
      border: 1px solid var(--ds-textarea-item-border-focus);
      border-radius: 0;
      outline: 0;
    }

    &:hover {
      background-color: var(--ds-textarea-item-hover-bg);
      border-color: var(--ds-textarea-item-hover-border-color);
    }

    &:disabled {
      color: var(--ds-textarea-item-disabled-color);

      background-color: var(--ds-textarea-item-disabled-bg);
      cursor: not-allowed;
      user-select: none;
      border-color: var(--ds-textarea-item-disabled-border-color);
    }
  }

  &__counter {
    position: absolute;
    top: var(--ds-textarea-item-padding-y);
    right: var(--ds-textarea-item-padding-x);

    font-size: var(--ds-textarea-item-font-size);
    font-weight: $font-weight-medium;
    line-height: var(--ds-textarea-item-line-height);
    color: var(--ds-textarea-item-placeholder-color);
  }
}
</style>
