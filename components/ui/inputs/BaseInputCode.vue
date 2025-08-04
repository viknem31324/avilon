<template>
  <div class="ds-input-code">
    <div class="ds-input-code__block">
      <input
        v-for="(digit, index) in digits.props.value"
        ref="inputsRef"
        :key="index"
        class="ds-input-code__item"
        :value="digit.value"
        :autofocus="index === 0"
        @paste="onPaste"
        @blur="onBlur"
        @focus="digit.onFocus"
        @keydown="digit.onKeydown"
      />
    </div>
    <BaseFormHelpMessage
      v-if="errorText"
      class="ds-input__message"
      :error-message="errorText"
    />
  </div>
</template>

<script lang="ts" setup>
import useDigitInput from './helpers/useDigitInput';
import type { IBaseInputCode, BaseInputCodeEmits } from './types/inputCode';

const props = withDefaults(defineProps<IBaseInputCode>(), {
  numberElements: 4,
  modelValue: '',
  errorText: '',
});

const emits = defineEmits<BaseInputCodeEmits>();

const inputsRef = ref([]);

const onBlur = (evt: Event | any) => {
  emits('blur', evt);
};

const onInput = (evt: Event | any) => {
  digits.setValue(evt);
  emits('update:modelValue', evt);
};

const onPaste = (evt: Event | any) => {
  evt.preventDefault();

  const pastedText = evt.clipboardData.getData('text');

  if (!/^\d+$/.test(pastedText)) {
    return;
  }

  digits.setValue(pastedText);
};

const digits = useDigitInput({
  inputs: inputsRef,
  acceptedCharacters: /^[0-9]$/,
  length: props.numberElements,
  value: props.modelValue,
  emits,
  onInput,
});

watch(() => props.modelValue, () => {
  digits.setValue(props.modelValue);
});
</script>

<style lang="scss">
.ds-input-code {
  &__block {
    display: flex;
    gap: 6px;
  }

  &__item {
    width: 56px;
    height: 56px;
    padding: 0;

    font-size: 20px;
    line-height: 100%;
    text-align: center;
    color: color('white');

    background-color: color('dark-grey');
    border: none;
    border-radius: 12px;
    outline: none;

    @include media-min('tablet') {
      width: 64px;
      height: 64px;
      font-size: 24px;
    }
  }
}
</style>
