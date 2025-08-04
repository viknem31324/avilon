<template>
  <div :class="classes">
    <label class="ds-toggle__label">
      <input
        type="checkbox"
        :name="name"
        :checked="checked"
        @change="onChange"
      />
      <div class="ds-toggle__wrapper">
        <div class="ds-toggle__wrapper-circle" />
      </div>
    </label>

    <BaseFormHelpMessage
      v-if="isVisibleError"
      :error-message="errorMessage"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IBaseToggle, BaseToggleEmits } from './types/toggle.ts';

const props = withDefaults(defineProps<IBaseToggle>(), {
  size: 'm',
  variant: 'green',
});

const emits = defineEmits<BaseToggleEmits>();

const {
  value: checked,
  errorMessage,
  handleChange,
} = useField<boolean>(toRef(props, 'name'), props.rules, {
  initialValue: props.modelValue,
});

const value = ref(props.modelValue);

const onChange = () => {
  value.value = !value.value;

  handleChange(value.value);
  emits('update:modelValue', value.value);
};

watch(() => props.modelValue, () => {
  value.value = props.modelValue;

  handleChange(value.value);
});

const classes = computed(() => ({
  [`ds-toggle ds-toggle--size-${props.size} ds-toggle--variant-${props.variant}`]: true,
  'ds-toggle--checked': checked?.value,
  'ds-toggle--disabled': props.disabled,
}));

const isVisibleError = computed(() => !props.disabled && errorMessage);
</script>

<style lang="scss">
.ds-toggle {
  $self: &;

  --ds-toggle-wrapper-background-color: #{color('black-20')};
  --ds-toggle-wrapper-circle-margin-y: 4px;

  &--checked {
    &#{$self}--variant {
      &-green {
        --ds-toggle-wrapper-background-color: #{color('smart-green')};
      }

      &-red {
        --ds-toggle-wrapper-background-color: #{color('active-red')};
      }
    }

    &#{$self}__wrapper {
      background-color: var(--ds-toggle-wrapper-background-color);
    }

    #{$self}__wrapper-circle {
      right: var(--ds-toggle-wrapper-circle-margin-y);
    }
  }

  &--disabled {
    --ds-toggle-wrapper-background-color: #{color('black-10')};
    pointer-events: none;

    &#{$self}--checked#{$self}--variant {
      &-green {
        --ds-toggle-wrapper-background-color: #{color('green-60')};
      }

      &-red {
        --ds-toggle-wrapper-background-color: #{color('red-60')};
      }
    }
  }

  &--size {
    &-s {
      --ds-toggle-wrapper-width: 40px;
      --ds-toggle-wrapper-height: 24px;
      --ds-toggle-wrapper-circle-size: 16px;
    }

    &-m {
      --ds-toggle-wrapper-width: 48px;
      --ds-toggle-wrapper-height: 28px;
      --ds-toggle-wrapper-circle-size: 20px;
    }

    &-l {
      --ds-toggle-wrapper-width: 56px;
      --ds-toggle-wrapper-height: 32px;
      --ds-toggle-wrapper-circle-size: 24px;
    }
  }

  &__label {
    user-select: none;
    display: flex;
    align-items: center;

    input {
      position: absolute;
      z-index: -10;

      width: 0;
      height: 0;

      opacity: 0;
    }
  }

  &__wrapper {
    position: relative;

    display: flex;

    width: var(--ds-toggle-wrapper-width);
    height: var(--ds-toggle-wrapper-height);
    padding: 4px;
    align-items: center;

    background-color: var(--ds-toggle-wrapper-background-color);
    border-radius: 999px;

    @include transition('background-color');

    &-circle {
      position: absolute;
      right: calc(100% - var(--ds-toggle-wrapper-circle-size) - var(--ds-toggle-wrapper-circle-margin-y));
      z-index: 1;

      width: var(--ds-toggle-wrapper-circle-size);
      height: var(--ds-toggle-wrapper-circle-size);

      flex: none;

      background-color: color('total-white');
      border-radius: 50%;

      @include transition('right')
    }
  }
}
</style>
