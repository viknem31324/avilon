<template>
  <BaseText class="ds-form-error-message" size="s" tag="p">
    <ErrorMessage :name="name" />
  </BaseText>
</template>

<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate';
import type { IBaseFormErrorMessage } from '../types/helperComponents';

defineProps<IBaseFormErrorMessage>();
</script>

<style lang="scss">
.ds-form-error-message {
  width: 100%;
  margin-top: 6px;
  margin-bottom: 0;
  color: color('active-red');
}
</style>
