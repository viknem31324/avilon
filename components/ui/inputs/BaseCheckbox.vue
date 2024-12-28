<template>
  <BaseText :size="size">
    <label :class="classes">
      <input
        type="checkbox"
        :name="name"
        :value="value"
        :disabled="disabled"
        @change="onChange"
      />
      <span class="ds-checkbox__mark">
        <BaseIcon
          v-if="isChecked"
          icon="check"
          :size="iconSize"
        />
      </span>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-if="label" v-html="label" />
    </label>

    <BaseFormHelpMessage
      v-if="isVisibleError"
      :error-message="errorMessage"
    />
  </BaseText>
</template>

<script lang="ts" setup>
import type { BaseCheckboxEmits, IBaseCheckbox } from './types/checkbox';

const props = withDefaults(defineProps<IBaseCheckbox>(), {
  label: '',
  size: 'm',
});

const emits = defineEmits<BaseCheckboxEmits>();

const { checked, errorMessage, handleChange } = useField(toRef(props, 'name'), props.rules, {
  initialValue: props.modelValue,
  checkedValue: props.value,
  type: 'checkbox',
});

const isArrayModelValue = computed(() => Array.isArray(props.modelValue));

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value);
  }
  return typeof props.value === 'boolean' ? props.modelValue : checked?.value;
});

const onChange = () => {
  let value = typeof props.value === 'boolean' ? !props.modelValue : props.value || '';
  if (isArrayModelValue.value) {
    value = isChecked.value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ? props.modelValue.filter((val: string | boolean) => val !== props.value)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      : [...props.modelValue, props.value];
  }
  handleChange(value);
  emits('update:modelValue', value);
};

watch(() => props.modelValue, () => {
  handleChange(props.modelValue);
  if (typeof props.value !== 'boolean') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    emits('update:modelValue', props.modelValue);
  }
});

const classes = computed(() => ({
  [`ds-checkbox ds-checkbox--size-${props.size}`]: true,
  'ds-checkbox-checked': isChecked.value,
  'ds-checkbox-disabled': props.disabled,
  'ds-checkbox-error': errorMessage.value,
}));

const iconSize = computed(() => {
  if (props.size === 'l') {
    return 'xl';
  } else if (props.size === 'm') {
    return 'l';
  } else {
    return 'm';
  }
});

const isVisibleError = computed(() => !Array.isArray(props.modelValue) && !props.disabled && errorMessage);
</script>

<style lang="scss">
.ds-checkbox {
  $self: &;

  --ds-checkbox-bg: transparent;
  --ds-checkbox-color: #{color('total-white')};
  --ds-checkbox-border-color: #{color('black-40')};
  --ds-checkbox-hover-bg: transparent;
  --ds-checkbox-hover-border-color: #{color('green-30')};
  --ds-checkbox-focus-color: #{color('black-40')};
  --ds-checkbox-text-color: inherit;
  cursor: pointer;
  user-select: none;

  position: relative;

  display: inline-flex;
  gap: var(--ds-checkbox-gap);
  align-items: flex-start;

  color: var(--ds-checkbox-text-color);
  vertical-align: middle;

  &--size {
    &-s {
      --ds-checkbox-gap: 8px;
      --ds-checkbox-size: 20px;
      --ds-checkbox-icon-size: 16px;
    }

    &-m {
      --ds-checkbox-gap: 12px;
      --ds-checkbox-size: 24px;
      --ds-checkbox-icon-size: 20px;
    }

    &-l {
      --ds-checkbox-gap: 16px;
      --ds-checkbox-size: 28px;
      --ds-checkbox-icon-size: 24px;
    }
  }

  &-disabled {
    --ds-checkbox-bg: #{color('black-10')};
    --ds-checkbox-border-color: #{color('black-20')};
    --ds-checkbox-text-color: #{color('black-40')};
    cursor: not-allowed;
    user-select: none;
  }

  &-error {
    --ds-checkbox-border-color: #{color('active-red')};
    --ds-checkbox-focus-color: #{color('active-red')};
  }

  &-checked {
    --ds-checkbox-bg: #{color('smart-green')};
    --ds-checkbox-color: #{color('total-white')};
    --ds-checkbox-border-color: #{color('smart-green')};
    --ds-checkbox-hover-bg: #{color('green-30')};
    --ds-checkbox-hover-border-color: #{color('green-30')};
    --ds-checkbox-focus-color: #{color('green-30')};

    &#{$self}-disabled {
      --ds-checkbox-bg: #{color('black-40')};
      --ds-checkbox-color: #{color('black-20')};
      --ds-checkbox-border-color: #{color('black-40')};
    }

    &#{$self}-error {
      --ds-checkbox-bg: #{color('active-red')};
      --ds-checkbox-color: #{color('total-white')};
      --ds-checkbox-border-color: #{color('active-red')};
    }

    &#{$self} > input:focus-visible {
      --ds-checkbox-border-color: #{color('green-30')};
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
      box-shadow: inset 0 0 0 1px var(--ds-checkbox-focus-color);
    }

    &:not(#{$self}-error):focus-visible ~ #{$self}__mark {
      border-color: var(--ds-checkbox-focus-color);
    }
  }

  &__mark {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;

    width: var(--ds-checkbox-size);
    height: var(--ds-checkbox-size);

    color: var(--ds-checkbox-color);

    background-color: var(--ds-checkbox-bg);
    border: 1px solid var(--ds-checkbox-border-color);

    @include transition('background-color, box-shadow, color, border-color');

    #{$self}:not(#{$self}-disabled):hover & {
      background-color: var(--ds-checkbox-hover-bg);
      border-color: var(--ds-checkbox-hover-border-color);
    }

    .ds-icon {
      width: var(--ds-checkbox-icon-size);
      height: var(--ds-checkbox-icon-size);
    }
  }
}
</style>
