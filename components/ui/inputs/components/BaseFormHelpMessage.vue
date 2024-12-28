<template>
  <TransitionExpand>
    <BaseText
      v-if="errorMessage || (valid && successMessage)"
      :class="classes"
      size="s"
      tag="p"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="errorMessage || successMessage" />
    </BaseText>
  </TransitionExpand>
</template>

<script lang="ts" setup>
import type { IBaseFormHelpMessage } from '../types/helperComponents';

const props = withDefaults(defineProps<IBaseFormHelpMessage>(), {
  errorMessage: '',
  successMessage: '',
  valid: false,
});

const classes = computed(() => ({
  'ds-form-help-message': true,
  'ds-form-help-message--success': props.valid,
  'ds-form-help-message--error': props.errorMessage,
}));
</script>

<style lang="scss">
.ds-form-help-message {
  margin-top: 6px;
  margin-bottom: 0;

  &--error {
    color: color('active-red');
  }

  &--success {
    color: color('smart-green');
  }
}
</style>
