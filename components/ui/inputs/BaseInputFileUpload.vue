<template>
  <div class="ds-input-file-upload">
    <div class="ds-input-file-upload__preview-wrapper">
      <BaseIcon v-if="(!files && (!img || !isActiveChangeActions)) || (files && files?.type?.includes('video'))" :icon="icon" />
      <img
        v-show="isActiveChangeActions && !isVideoType"
        ref="previewImg"
        :src="img || '#'"
        alt=""
        class="ds-input-file-upload__preview"
      />
      <canvas v-if="isVideoType" ref="previewVideo" class="ds-input-file-upload__preview" />
    </div>

    <div>
      <div class="ds-input-file-upload__title">
        {{ title }}
      </div>
      <div class="ds-input-file-upload__format" v-html="formatsText" />
      <input
        ref="fileInput"
        :name="name"
        type="file"
        class="ds-input-file-upload__input"
        tabindex="-1"
        :accept="accept"
        @change="handleFileChange"
      />
      <BaseButton
        v-if="!isActiveChangeActions"
        class="ds-input-file-upload__button"
        :label="buttonText"
        variant="accent"
        @click="triggerFileInput"
      />

      <div v-else class="ds-input-file-upload__buttons">
        <BaseButton
          class="ds-input-file-upload__button"
          label="Заменить"
          @click="triggerFileInput"
        />
        <BaseButton
          class="ds-input-file-upload__button"
          label="Удалить"
          variant="danger"
          @click="clearInput"
        />
      </div>

      <BaseFormHelpMessage
        v-if="errorMessage"
        :error-message="errorMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBaseInputFileUpload, BaseInputFileUploadEmits } from './types/inputFileUpload';

const props = defineProps<IBaseInputFileUpload>();
const emits = defineEmits<BaseInputFileUploadEmits>();

const {
  errorMessage,
  handleChange,
} = useField(() => props.name, props.rules, { initialValue: undefined });

const fileInput = ref<HTMLInputElement>();
const files = ref();
const previewImg = ref();
const previewVideo = ref();
const isActiveChangeActions = ref<boolean>(!!props.img);
const isVideoType = ref(false);

function triggerFileInput() {
  fileInput.value?.click();
}

async function handleFileChange(e: any) {
  const newValue = fileInput.value?.files?.[0];
  if (newValue === undefined) return;

  handleChange(e);

  if (newValue) {
    isVideoType.value = false;
    files.value = newValue;
    isVideoType.value = newValue.type?.includes('video');

    await nextTick();

    if (!newValue.type?.includes('video')) {
      previewImg.value.src = URL.createObjectURL(files.value);
    } else {
      const context = previewVideo.value.getContext('2d');

      const url = URL.createObjectURL(files.value);

      const videoElement = document.createElement('video');
      videoElement.src = url;

      videoElement.addEventListener('loadeddata', function () {
        videoElement.currentTime = 1;
      });

      videoElement.addEventListener('seeked', function () {
        context.drawImage(videoElement, 0, 0, previewVideo.value.width, previewVideo.value.height);
        URL.revokeObjectURL(url);
      });

      videoElement.load();
    }

    isActiveChangeActions.value = true;
  } else {
    clearInput();
  }

  emits('change', e);
}

const clearInput = () => {
  if (!files.value?.type?.includes('video')) {
    previewImg.value.src = props.img || '#';
  }

  files.value = null;
  isActiveChangeActions.value = false;
  isVideoType.value = false;

  if (fileInput.value) {
    fileInput.value.value = '';
  }

  handleChange(null);
  emits('change', null);
};
</script>

<style lang="scss">
.ds-input-file-upload {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 498px;
  padding: 12px;
  border: 1px dashed color('black-20');
  border-radius: 8px;

  &__preview-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
  }

  &__preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 21px;
  }

  &__format {
    margin-top: 8px;
    font-size: 12px;
    font-weight: 500;
    line-height: 14.4px;
    color: color('black-60');
  }

  &__button {
    margin-top: 16px;
  }

  &__buttons {
    display: flex;
    gap: 8px;
  }

  &__input {
    opacity: 0;
    position: absolute;
    inset: 0;
    margin: 0;
    cursor: pointer;
    pointer-events: none;
  }
}
</style>
