<template>
  <div v-if="title || description" class="ds-form-description">
    <BaseHeading
      v-if="title"
      class="ds-form-description__heading"
    >
      {{ title }}
    </BaseHeading>
    <BaseText
      v-if="description"
      class="ds-form-description__text"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="description" />
    </BaseText>
  </div>
</template>

<script lang="ts" setup>
import type { IBaseFormDescription } from '../form';

defineProps<IBaseFormDescription>();
</script>

<style lang="scss">
.ds-form-description {
  --ds-form-heading-color: #{color('total-black')};
  --ds-form-description-color: #{color('total-black')};

  &__heading {
    margin: 0;
    color: var(--ds-form-heading-color);
  }

  &__text {
    margin: 16px 0 0;
    color: var(--ds-form-description-color);

    p {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
