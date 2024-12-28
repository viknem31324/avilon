<template>
  <BaseText :class="classes" :size="size" tag="label">
    <input
      v-model="radioValue"
      type="radio"
      :name="name"
      :value="value"
      :disabled="disabled"
      @change="onChange"
    />
    <span class="ds-radio-button__mark" />
    <template v-if="label">
      {{ label }}
    </template>
  </BaseText>
</template>

<script lang="ts" setup>
import type { BaseRadioButtonEmits, IBaseRadioButton } from './types/radioButton';

const props = withDefaults(defineProps<IBaseRadioButton>(), {
  disabled: false,
  label: '',
  size: 'm',
  modelValue: undefined,
});

const emits = defineEmits<BaseRadioButtonEmits>();

const {
  value: radioValue,
} = useField(toRef(props, 'name'), undefined, {
  initialValue: props.modelValue,
  type: 'radio',
});

const onChange = () => {
  emits('update:modelValue', radioValue.value);
};

const classes = computed(() => ({
  [`ds-radio-button ds-radio-button--size-${props.size}`]: true,
  'ds-radio-button-checked': props.modelValue && props.value && props.modelValue === props.value,
  'ds-radio-button-disabled': props.disabled,
}));
</script>

<style lang="scss">
.ds-radio-button {
  $self: &;

  --ds-radio-button-padding: 0px;
  --ds-radio-button-bg: transparent;
  --ds-radio-button-color: #{color('total-white')};
  --ds-radio-button-border-color: #{color('black-40')};
  --ds-radio-button-hover-bg: transparent;
  --ds-radio-button-hover-border-color: #{color('green-30')};
  --ds-radio-button-text-color: inherit;
  --ds-radio-button-focus-color: #{color('black-40')};
  cursor: pointer;
  user-select: none;

  position: relative;

  display: inline-flex;
  gap: var(--ds-radio-button-gap);
  align-items: center;

  color: var(--ds-radio-button-text-color);
  vertical-align: middle;

  &--size {
    &-s {
      --ds-radio-button-gap: 8px;
      --ds-radio-button-size: 20px;
      --ds-radio-button-icon-size: 12px;
    }

    &-m {
      --ds-radio-button-gap: 12px;
      --ds-radio-button-size: 24px;
      --ds-radio-button-icon-size: 14px;
    }

    &-l {
      --ds-radio-button-gap: 16px;
      --ds-radio-button-size: 28px;
      --ds-radio-button-icon-size: 16px;
    }
  }

  &-disabled {
    --ds-radio-button-bg: #{color('black-10')};
    --ds-radio-button-border-color: #{color('black-20')};
    --ds-radio-button-text-color: #{color('black-40')};
    cursor: not-allowed;
  }

  &-checked {
    --ds-radio-button-padding: 3px;
    --ds-radio-button-bg: #{color('smart-green')};
    --ds-radio-button-color: #{color('total-white')};
    --ds-radio-button-border-color: #{color('smart-green')};
    --ds-radio-button-hover-bg: #{color('green-30')};
    --ds-radio-button-hover-border-color: #{color('green-30')};
    --ds-radio-button-focus-color: #{color('smart-green')};

    &#{$self}-disabled {
      --ds-radio-button-bg: #{color('black-40')};
      --ds-radio-button-color: #{color('black-20')};
      --ds-radio-button-border-color: #{color('black-40')};
    }
  }

  input {
    position: absolute;

    overflow: hidden;

    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;

    white-space: nowrap;

    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    border: 0;

    &:focus-visible ~ #{$self}__mark {
      border-color: var(--ds-radio-button-focus-color);
      box-shadow: inset 0 0 0 1px var(--ds-radio-button-focus-color);
    }
  }

  &__mark {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;

    width: var(--ds-radio-button-size);
    height: var(--ds-radio-button-size);
    padding: var(--ds-radio-button-padding);

    color: var(--ds-radio-button-color);

    background-color: var(--ds-radio-button-bg);
    background-clip: content-box;
    border: 1px solid var(--ds-radio-button-border-color);
    border-radius: 50%;

    @include transition('background-color, box-shadow, color, border-color');

    #{$self}:not(#{$self}-disabled):hover & {
      background-color: var(--ds-radio-button-hover-bg);
      border-color: var(--ds-radio-button-hover-border-color);
    }
  }
}
</style>
