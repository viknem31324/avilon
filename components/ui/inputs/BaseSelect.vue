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
    <BaseMultiselect
      :id="id || name"
      v-model="selectValue"
      :allow-empty="multiselect || allowEmpty"
      :close-on-select="!multiselect"
      :disabled="disabled"
      :internal-search="!outerSearch"
      label="title"
      :multiple="multiselect"
      :name="name"
      :options="items"
      :placeholder="placeholder"
      :preselect-first="!allowEmpty"
      :searchable="searchable"
      :show-labels="false"
      track-by="id"
      clear-on-select
      @close="onClose"
      @open="onOpen"
      @search-change="onSearchChange"
      @select="onSelect"
      @remove="onRemove"
    >
      <template #singleLabel="{ option }">
        <slot
          name="singleLabel"
          v-bind="option"
        >
          {{ option.title }}
        </slot>
      </template>
      <template #option="{ option }">
        <slot
          name="option"
          v-bind="option"
        >
          <BaseCheckbox
            v-if="multiselect"
            v-model="checkedValue"
            class="multiselect__checkbox"
            :name="`${name}-selected-ids`"
            :value="option.id"
            :label="option.title"
          />
          <div
            v-else
            class="multiselect__options-default"
          >
            {{ option.title }}

            <span
              v-if="option.description"
              class="multiselect__option-description"
            >
              {{ option.description }}
            </span>
          </div>
        </slot>
      </template>
    </BaseMultiselect>

    <BaseFormHelpMessage
      v-if="!disabled"
      :error-message="errorText || errorMessage"
    />
  </div>
</template>

<script lang="ts" setup>
import { formPartialDefaults } from './helpers/partialProps';
import useFields from './helpers/useFields';
import type { BaseSelectEmits, IBaseOption, IBaseSelect } from './types/select';

const props = withDefaults(defineProps<IBaseSelect>(), {
  ...formPartialDefaults,
  allowEmpty: true,
  errorText: '',
  hideButton: false,
  items: () => [],
  multiselect: false,
  modelValue: '',
  outerSearch: false,
  searchable: true,
  size: 'm',
});

const emits = defineEmits<BaseSelectEmits>();

const selectValue = ref<IBaseOption[] | IBaseOption>();
const checkedValue = ref<string[] | string>([]);

const {
  errorMessage,
  value,
  onChange,
} = useFields(props, { emits });

const updateValue = (val: string | string[]) => {
  value.value = val;
  onChange(val);
};

const onClose = () => {
  emits('close', selectValue.value);
};

const onOpen = () => {
  emits('open');
};

const onSearchChange = async (query: string) => {
  await nextTick();

  if (props.outerSearch) {
    emits('searchChange', query);
  }
};

const onSelect = (option: { title: string; id: string }) => {
  if (props.multiselect && typeof checkedValue.value !== 'string') {
    if (!checkedValue.value.includes(option.id)) {
      checkedValue.value.push(option.id);

      updateValue([...(value.value || []), option]);
    }
  } else {
    updateValue(option.id);
  }

  emits('select', option.id);
};

const onRemove = (option: IBaseOption) => {
  if (props.multiselect && typeof checkedValue.value !== 'string') {
    checkedValue.value = checkedValue.value.filter(item => item !== option.id);
    updateValue(
      value.value.filter(
        (item: IBaseOption | string) => (typeof item === 'string' ? item : item.id) !== option.id,
      ),
    );
  } else {
    updateValue('');
  }
};

const getPreselectedOption = () => {
  if (
    typeof props.modelValue !== 'undefined'
    && props.modelValue !== null
    && !props.modelValue?.length
  ) {
    return;
  }

  if (props.multiselect) {
    selectValue.value = props.items.filter((item: { id: string }) => props.modelValue.includes(item.id));
    checkedValue.value = props.modelValue;
    value.value = props.modelValue;
  } else {
    selectValue.value = props.items.find((item: { id: string }) => props.modelValue === item.id);
    value.value = Array.isArray(selectValue.value) ? undefined : selectValue.value?.id;
  }

  onChange(value.value);
};

watch(() => props.modelValue, () => {
  getPreselectedOption();
});

if (!props.outerSearch) {
  getPreselectedOption();
}

const classes = computed(() => ({
  [`ds-select ds-select--size-${props.size}`]: true,
  'ds-select--checked': props.multiselect,
  'ds-select--disabled': props.disabled,
  'ds-select--error': props.errorText || errorMessage.value,
  'ds-select--hide-btn': props.hideButton,
}));
</script>

<style lang="scss">
/* stylelint-disable selector-class-pattern */
/* stylelint-disable no-descending-specificity */

.ds-select {
  --ds-select-control-select-bg: #{color('total-white')};
  --ds-select-control-tags-bg: #{color('total-white')};
  --ds-select-control-color: #{color('total-black')};
  --ds-select-control-border-color: #{color('black-20')};
  --ds-select-control-arrow-color: #{color('total-black')};
  --ds-select-control-open-border-color: #{color('smart-green')};
  --ds-select-control-open-arrow-color: #{color('total-white')};
  --ds-select-control-hover-border-color: #{color('black-60')};
  --ds-select-error-control-border-color: #{color('active-red')};
  --ds-select-error-control-arrow-color: #{color('total-white')};
  --ds-select-disabled-control-border-color: #{color('black-20')};
  --ds-select-disabled-control-arrow-color: #{color('total-white')};
  --ds-select-placeholder-color: #{color('black-40')};
  --ds-select-option-bg: #{color('total-white')};
  --ds-select-option-color: #{color('total-black')};
  --ds-select-option-hover-bg: #{color('black-5')};
  --ds-select-option-hover-color: #{color('total-black')};
  --ds-select-option-selected-bg: #{color('smart-green')};
  --ds-select-option-selected-color: #{color('total-white')};
  --ds-select-option-disabled-bg: #{color('black-20')};
  --ds-select-option-disabled-color: #{color('total-white')};
  --ds-select-option-description-color: #{color('black-60')};
  --ds-select-option-menu-shadow: 0 6px 16px rgb(0 0 0 / 5%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  --ds-select-tag-bg: #{color('black-10')};
  --ds-select-tag-color: #{color('total-black')};
  --ds-select-tag-color-icon: #{color('total-black')};
  --ds-select-tag-hover-color-icon: #{color('smart-green')};

  @include text-styles-variable('ds-select-tag', 's');
  width: 100%;

  &--size {
    &-s {
      --ds-select-control-size: 32px;
      --ds-select-control-padding-y: 5px;
      --ds-select-control-padding-x: 16px;
      --ds-select-option-gap: 1px;
      --ds-select-icon-size: 9px;

      @include text-styles-variable('ds-select-input', 's');
      @include text-styles-variable('ds-select-option', 's');
      @include text-styles-variable('ds-select-description', 'xs');
    }

    &-m {
      --ds-select-control-size: 40px;
      --ds-select-control-padding-y: 8px;
      --ds-select-control-padding-x: 16px;
      --ds-select-option-gap: 4px;
      --ds-select-icon-size: 10px;

      @include text-styles-variable('ds-select-input', 'm');
      @include text-styles-variable('ds-select-option', 'm');
      @include text-styles-variable('ds-select-description', 's');
    }

    &-l {
      --ds-select-control-size: 44px;
      --ds-select-control-padding-y: 10px;
      --ds-select-control-padding-x: 16px;
      --ds-select-option-gap: 4px;
      --ds-select-icon-size: 10px;

      @include text-styles-variable('ds-select-input', 'm');
      @include text-styles-variable('ds-select-option', 'm');
      @include text-styles-variable('ds-select-description', 's');
    }
  }

  @include media-min('tablet') {
    --ds-select-option-gap: 4px;
    --ds-select-icon-size: 10px;

    @include text-styles-variable('ds-select-input', 'm');
    @include text-styles-variable('ds-select-option', 'm');
    @include text-styles-variable('ds-select-description', 's');

    &--size {
      &-s {
        --ds-select-control-size: 40px;
        --ds-select-control-padding-y: 8px;
        --ds-select-control-padding-x: 16px;
      }

      &-m {
        --ds-select-control-size: 44px;
        --ds-select-control-padding-y: 10px;
        --ds-select-control-padding-x: 16px;
      }

      &-l {
        --ds-select-control-size: 48px;
        --ds-select-control-padding-y: 12px;
        --ds-select-control-padding-x: 16px;
      }
    }
  }

  @include media-min('desktop') {
    --ds-select-option-gap: 4px;

    &--size {
      &-s {
        --ds-select-control-size: 44px;
        --ds-select-control-padding-y: 10px;
        --ds-select-control-padding-x: 16px;
        --ds-select-icon-size: 10px;

        @include text-styles-variable('ds-select-input', 'm');
        @include text-styles-variable('ds-select-option', 'm');
        @include text-styles-variable('ds-select-description', 's');

        .multiselect__input:focus {
          margin-top: -1px;
          font-size: 16px;

          &::placeholder {
            font-size: 14px;
          }
        }
      }

      &-m {
        --ds-select-control-size: 48px;
        --ds-select-control-padding-y: 12px;
        --ds-select-control-padding-x: 16px;
        --ds-select-icon-size: 10px;

        @include text-styles-variable('ds-select-input', 'm');
        @include text-styles-variable('ds-select-option', 'm');
        @include text-styles-variable('ds-select-description', 's');
      }

      &-l {
        --ds-select-control-size: 56px;
        --ds-select-control-padding-y: 14px;
        --ds-select-control-padding-x: 24px;
        --ds-select-icon-size: 12px;

        @include text-styles-variable('ds-select-input', 'l');
        @include text-styles-variable('ds-select-option', 'l');
        @include text-styles-variable('ds-select-description', 'm');
      }
    }
  }

  &--checked {
    --ds-select-option-selected-bg: transparent;
    --ds-select-option-selected-color: #{color('total-black')};
  }

  .multiselect {
    min-height: auto;
    border: 1px solid var(--ds-select-control-border-color);

    @include transition('border-color');

    &__checkbox {
      pointer-events: none;
    }

    &__select {
      position: absolute;
      top: 0;
      right: 0;

      display: flex;

      width: var(--ds-select-control-size);
      height: var(--ds-select-control-size);
      justify-content: center;
      align-items: center;

      background: var(--ds-select-control-select-bg);
      transform: none !important;

      &::before {
        position: static;
        transform: translateY(-20%) rotate(45deg);

        display: inline-block;

        width: var(--ds-select-icon-size);
        height: var(--ds-select-icon-size);
        margin: 0;

        border-color: var(--ds-select-control-arrow-color);
        border-style: solid;
        border-width: 0 2px 2px 0;

        @include transition('transform', .15s, ease)
      }
    }

    &:hover {
      border-color: var(--ds-select-control-hover-border-color);
    }

    &__tags {
      min-height: var(--ds-select-control-size);
      margin-right: var(--ds-select-control-size);
      padding: var(--ds-select-control-padding-y) var(--ds-select-control-padding-x);

      color: var(--ds-select-control-color);

      background: var(--ds-select-control-tags-bg);
      border: none;
      border-radius: 0;
    }

    &__tags-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    &__tag {
      display: flex;
      gap: 8px;

      width: max-content;
      margin: 0;
      padding: 1px 30px 1px 8px;

      font-size: var(--ds-select-tag-font-size);
      line-height: var(--ds-select-tag-line-height);
      color: var(--ds-select-tag-color);

      background-color: var(--ds-select-tag-bg);
      border: none;
      border-radius: 0;
    }

    &__tag-icon {
      right: 7px;

      width: 16px;
      height: 16px;
      margin: 0;

      font-weight: $font-weight-light;
      color: var(--ds-select-tag-color-icon);

      &::after {
        font-size: 24px;
        line-height: 1;
        color: var(--ds-select-tag-color);

        @include transition('color');
      }

      &:hover {
        background-color: transparent;

        &::after {
          color: var(--ds-select-tag-hover-color-icon);
        }
      }
    }

    &__input,
    &__single,
    &__placeholder {
      display: block;
      overflow: hidden;

      margin: 0;
      padding: 0;

      font-size: var(--ds-select-input-font-size);
      font-weight: $font-weight-medium;
      line-height: var(--ds-select-input-line-height);
      white-space: nowrap;
      color: inherit;

      background-color: transparent;
      border: 0;
      border-radius: 0;
      text-overflow: ellipsis;
    }

    &__input::placeholder,
    &__placeholder {
      color: var(--ds-select-placeholder-color);
    }

    &__content-wrapper {
      scrollbar-color: color('black-60') color('black-20');
      scrollbar-width: thin;

      overflow: hidden overlay;

      margin-top: 3px;
      margin-bottom: 3px;

      filter: drop-shadow(0 6px 16px rgb(0 0 0 / 5%));
      border: none;
      border-radius: 0;
      box-shadow: var(--ds-select-option-menu-shadow);

      &::-webkit-scrollbar {
        width: 8px;
        background-color: color('black-20');
      }

      &::-webkit-scrollbar-thumb {
        background-color: color('black-60');
        border-radius: 0;
      }
    }

    &__option {
      position: relative;

      display: flex;

      min-height: 0;
      padding: var(--ds-select-control-padding-y) var(--ds-select-control-padding-x);
      flex-direction: column;

      font-size: var(--ds-select-option-font-size);
      font-weight: $font-weight-medium;
      line-height: var(--ds-select-option-line-height);
      white-space: normal;
      color: var(--ds-select-option-color);

      background-color: var(--ds-select-option-bg);
      gap: var(--ds-select-option-gap);

      @include transition('background-color, color');

      &--highlight {
        color: var(--ds-select-option-hover-color) !important;
        background-color: var(--ds-select-option-hover-bg) !important;
      }

      &--selected {
        color: var(--ds-select-option-selected-color);
        background-color: var(--ds-select-option-selected-bg);

        &:hover {
          color: var(--ds-select-option-selected-color);
          background-color: var(--ds-select-option-selected-bg);
        }
      }

      &--disabled {
        color: var(--ds-select-option-disabled-color) !important;
        background-color: var(--ds-select-option-disabled-bg) !important;
      }

      &--selected,
      &--disabled {
        .multiselect__option-description {
          color: inherit;
        }
      }
    }

    &__options-default {
      display: flex;
      flex-direction: column;
    }

    &__option-description {
      font-size: var(--ds-select-description-font-size);
      font-weight: $font-weight-light;
      line-height: var(--ds-select-description-line-height);
      color: var(--ds-select-option-description-color);
    }

    &--active {
      border-color: var(--ds-select-control-open-border-color);

      .multiselect__select {
        background-color: var(--ds-select-control-open-border-color);

        &::before {
          transform: translateY(20%) rotate(225deg);
          border-color: var(--ds-select-control-open-arrow-color);
        }
      }
    }

    &--disabled {
      background-color: transparent;
      opacity: 1;
      cursor: not-allowed;
      user-select: none;
    }
  }

  &--disabled {
    --ds-select-control-select-bg: #{color('black-20')};
    --ds-select-control-tags-bg: #{color('black-5')};
    --ds-select-control-arrow-color: #{color('total-white')};
    pointer-events: none;

    .multiselect {
      border-color: var(--ds-select-disabled-control-border-color);
    }

    .multiselect__select {
      background-color: var(--ds-select-control-select-bg);
      cursor: inherit;

      &::before {
        border-color: var(--ds-select-disabled-control-arrow-color);
      }
    }

    .multiselect__tags {
      color: var(--ds-select-control-color);
    }
  }

  &--error {
    .multiselect {
      &:not(.multiselect--active, .multiselect--disabled) {
        border-color: var(--ds-select-error-control-border-color);
      }
    }

    .multiselect__select {
      background-color: var(--ds-select-error-control-border-color);

      &::before {
        border-color: var(--ds-select-error-control-arrow-color);
      }
    }
  }

  &--hide-btn {
    --ds-select-control-size: 0;

    .multiselect__select {
      display: none;
    }
  }
}
</style>
