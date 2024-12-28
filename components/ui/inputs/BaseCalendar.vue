/* stylelint-disable scss/load-partial-extension */
<template>
  <div :class="classes">
    <BaseFormLabel
      v-if="label"
      :id="id"
      :name="name"
      :label="label"
      :size="size"
      :required="required"
      :disabled="disabled"
    />
    <DatePicker
      v-if="isBrowser"
      v-model:value="value"
      :calendar-start-day="1"
      :disabled="disabled"
      :disabled-date="disabledDate"
      class="ds-calendar__picker"
      confirm
      :format="formatDate"
      :input-attr="{ id: id || name, name, disabled }"
      :lang="langObject"
      :open="open"
      :placeholder="placeholder"
      popup-class=""
      prefix-class="ds-mx"
      :range="range"
      :title-format="formatDate"
      :type="type"
      @clear="onClear"
      @click="onOpen"
      @close="onClose"
      @confirm="onConfirm"
    >
      <template #footer>
        <BaseButton
          v-if="!range"
          class="ds-calendar__btn"
          :label="buttonLabel"
          size="s"
          variant="ghost"
          @click="onTodayClick"
        />
      </template>
    </DatePicker>

    <BaseFormHelpMessage
      v-if="!disabled && errorMessage"
      :error-message="errorMessage"
      :size="size"
    />
  </div>
</template>

<script lang="ts" setup>
import BaseFormHelpMessage from './components/BaseFormHelpMessage.vue';
import BaseFormLabel from './components/BaseFormLabel.vue';
import { formPartialDefaults } from './helpers/partialProps';
import useFields from './helpers/useFields';
import { LANG_FORMAT, type BaseCalendarEmits, type IBaseCalendar } from './types/calendar';

const props = withDefaults(defineProps<IBaseCalendar>(), {
  ...formPartialDefaults,
  modelValue: undefined,
  locale: 'ru',
  range: false,
  size: 'm',
  formatDate: 'DD.MM.YYYY',
});

const emits = defineEmits<BaseCalendarEmits>();

const isBrowser = computed(() => (typeof window !== 'undefined'));
const langObject = computed(() => ({ formatLocale: LANG_FORMAT[props.locale as keyof typeof LANG_FORMAT] }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DatePicker = defineAsyncComponent((): Promise<any> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  isBrowser.value ? import('vue-datepicker-next') : Promise.resolve());

const open = ref(false);

const initialValue = props.modelValue ? new Date(props.modelValue) : '';

const {
  errorMessage,
  value,
  onChange,
} = useFields(props, { emits }, initialValue);

const disabledDate = (date: Date) => {
  if (props.fromDate && props.toDate) {
    return date < props.fromDate || date > props.toDate;
  } else if (props.fromDate) {
    return date < props.fromDate;
  } else if (props.toDate) {
    return date > props.toDate;
  } else {
    return false;
  }
};

const onClear = () => {
  onChange(undefined);
  emits('clear');
};

const onClose = () => {
  open.value = false;
};

const onConfirm = (evt: Event) => {
  onChange(evt);
  onClose();
};

const onOpen = () => {
  open.value = true;
};

const onTodayClick = () => {
  value.value = new Date();
  onChange(value.value);
};

const classes = computed(() => ({
  [`ds-calendar ds-calendar--size-${props.size}`]: props.size,
  'ds-calendar--disabled': props.disabled,
  'ds-calendar--error': errorMessage.value,
}));

const buttonLabel = computed(() => {
  switch (props.locale) {
    case 'en':
      return 'Today';
    default:
      return 'Сегодня';
  }
});

watch(() => props.modelValue, () => {
  if (value.value === props.modelValue) {
    return;
  }

  value.value = props.modelValue;
  onChange(props.modelValue);
});
</script>

<style lang="scss">
/* stylelint-disable no-descending-specificity */

$default-color: color('total-black');
$primary-color: color('smart-green');
$namespace: 'ds-mx';

/* stylelint-disable-next-line order/order */
@import '../../../node_modules/vue-datepicker-next/scss/index.scss';
/* stylelint-disable-next-line scss/load-partial-extension */

.ds-calendar {
  /* stylelint-disable-next-line scss/load-partial-extension */
  --ds-calendar-input-padding-y: 10px;
  --ds-calendar-input-padding-x: 16px;
  --ds-calendar-input-color: #{color('total-black')};
  --ds-calendar-input-disabled-color: #{color('black-40')};
  --ds-calendar-input-bg: #{color('total-white')};
  --ds-calendar-input-border-color: #{color('black-20')};
  --ds-calendar-input-focus-border-color: #{color('total-black')};
  --ds-calendar-input-disabled-bg: #{color('black-5')};
  --ds-calendar-input-disabled-border-color: #{color('black-10')};
  --ds-calendar-input-placeholder-color: #{color('black-40')};
  width: 100%;
  color: var(--ds-calendar-input-color);

  &--size {
    &-s {
      --ds-calendar-input-padding-y: 4px;
      --ds-calendar-input-padding-x: 15px;

      @include text-styles-variable('ds-calendar-input', 's');

      @include media-min('tablet') {
        --ds-calendar-input-padding-y: 7px;

        @include text-styles-variable('ds-calendar-input', 'm');
      }

      @include media-min('desktop') {
        --ds-calendar-input-padding-y: 9px;
      }
    }

    &-m {
      --ds-calendar-input-padding-y: 7px;
      --ds-calendar-input-padding-x: 15px;

      @include text-styles-variable('ds-calendar-input', 'm');

      @include media-min('tablet') {
        --ds-calendar-input-padding-y: 9px;
      }

      @include media-min('desktop') {
        --ds-calendar-input-padding-y: 11px;
      }
    }

    &-l {
      --ds-calendar-input-padding-y: 9px;
      --ds-calendar-input-padding-x: 15px;

      @include text-styles-variable('ds-calendar-input', 'm');

      @include media-min('tablet') {
        --ds-calendar-input-padding-y: 11px;
      }

      @include media-min('desktop') {
        --ds-calendar-input-padding-y: 13px;
        --ds-calendar-input-padding-x: 23px;

        @include text-styles-variable('ds-calendar-input', 'l');
      }
    }
  }

  &--error {
    --ds-calendar-input-border-color: #{color('active-red')};
  }

  &--disabled {
    cursor: not-allowed;
    user-select: none;
    color: var(--ds-calendar-input-disabled-color);
  }

  &__btn {
    font-size: 14px;
  }

  &__picker {
    width: 100%;

    .ds-mx-input {
      width: 100%;
      height: auto;
      padding: var(--ds-calendar-input-padding-y) var(--ds-calendar-input-padding-x);

      font: inherit;
      font-size: var(--ds-calendar-input-font-size);
      font-weight: $font-weight-medium;
      line-height: var(--ds-calendar-input-line-height);
      color: inherit;

      background-color: var(--ds-calendar-input-bg);
      border: 1px solid var(--ds-calendar-input-border-color);
      border-radius: 0;
      box-shadow: none;

      @include transition('border-color');

      &::placeholder {
        color: var(--ds-calendar-input-placeholder-color);
      }

      &:focus,
      &:focus-visible {
        box-sizing: border-box;
        border: 1px solid var(--ds-calendar-input-focus-border-color);
        outline: 0;
      }

      &:disabled {
        color: var(--ds-calendar-input-disabled-color);
        background-color: var(--ds-calendar-input-disabled-bg);
        border-color: var(--ds-calendar-input-disabled-border-color);
      }
    }

    .ds-mx-icon-clear {
      color: inherit;
    }

    .ds-mx-icon-calendar {
      display: none;
    }
  }
}

.ds-mx-calendar {
  width: 100%;
  max-width: 256px;
  padding: 16px;
  border: none !important;
}

.ds-mx-datepicker {
  svg {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
}

.ds-mx-datepicker-main {
  --ds-calendar-datepicker-main-bg: #{color('total-white')};
  --ds-calendar-datepicker-main-box-shadow: #{color('total-black')};
  --ds-calendar-header-border-color: #{color('black-10')};
  --ds-calendar-header-btn-color: #{color('total-black')};
  --ds-calendar-header-btn-hover-color: #{color('smart-green')};
  --ds-calendar-datepicker-footer-before-bg: #{color('black-10')};
  --ds-calendar-datepicker-btn-confirm-color: #{color('total-white')};
  --ds-calendar-datepicker-btn-confirm-bg: #{color('smart-green')};
  --ds-calendar-datepicker-btn-confirm-hover-color: #{color('total-white')};
  --ds-calendar-datepicker-btn-confirm-hover-bg: #{color('green-30')};
  --ds-calendar-table-thead-color: #{color('black-40')};
  --ds-calendar-table-cell-disabled-color: #{color('black-20')};
  --ds-calendar-table-cell-today-active-border-color: #{color('total-white')};
  --ds-calendar-table-cell-range-hover-color: #{color('black-5')};
  --ds-calendar-table-data-row-cell-not-current-month-hover-color: #{color('black-40')};
  --ds-calendar-table-data-row-cell-active-hover-color: #{color('black-5')};
  --ds-calendar-content-table-cell-not-active-color: #{color('total-black')};
  --ds-calendar-content-table-cell-hover-not-active-color: #{color('black-5')};
  font: inherit;
  background-color: var(--ds-calendar-datepicker-main-bg);
  border: none;
  box-shadow: var(--theme-shadow-default);
}

.ds-mx-calendar-header {
  height: auto;
  margin-bottom: 16px;
  padding-bottom: 8px;

  line-height: 22px;

  border-bottom: 1px solid var(--ds-calendar-header-border-color);

  .ds-mx-btn,
  .ds-mx-calendar-header-label {
    color: var(--ds-calendar-header-btn-color);

    @include transition('color');

    &:hover {
      color: var(--ds-calendar-header-btn-hover-color);
    }
  }
}

.ds-mx-datepicker-footer {
  position: relative;

  display: flex;

  width: 100%;
  padding: 16px;

  font-size: 14px;

  border: none;

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0;

    width: calc(100% - 32px);
    height: 1px;
    margin: 0 16px;

    background-color: var(--ds-calendar-datepicker-footer-before-bg);
  }

  .ds-mx-datepicker-btn-confirm {
    display: inline-block;

    margin-left: auto;
    padding: 4px 31px;

    font-weight: $font-weight-medium;
    color: var(--ds-calendar-datepicker-btn-confirm-color);
    text-align: center;
    text-decoration: none;

    background-color: var(--ds-calendar-datepicker-btn-confirm-bg);
    border: 1px solid transparent;
    border-radius: 0;

    @include text-styles('s');

    @include transition('background-color, border-color, color');

    &:hover {
      color: var(--ds-calendar-datepicker-btn-confirm-hover-color);
      background-color: var(--ds-calendar-datepicker-btn-confirm-hover-bg);
      border-color: transparent;
    }
  }
}

.ds-mx-table {
  margin: 0;

  td {
    font-size: 14px;
  }

  thead {
    color: var(--ds-calendar-table-thead-color);
  }

  tbody {
    .cell.not-current-month {
      pointer-events: none;

      height: 0;

      font-size: 1px;
      line-height: 1px;
      color: transparent;

      background-color: transparent;
    }

    .cell.in-range:not(.not-current-month),
    .cell.hover-in-range:not(.not-current-month) {
      background-color: var(--ds-calendar-table-cell-range-hover-color);
    }

    .ds-mx-date-row {
      background-color: transparent;

      .cell:not(.not-current-month, .disabled):nth-child(6),
      .cell:not(.not-current-month, .disabled):nth-child(7) {
        color: var(--ds-calendar-table-data-row-cell-not-current-month-hover-color);
      }

      .cell.active:nth-child(6),
      .cell.active:nth-child(7) {
        color: var(--ds-calendar-table-data-row-cell-active-hover-color);
      }
    }

    .cell.disabled {
      cursor: default;
      color: var(--ds-calendar-table-cell-disabled-color);
      background-color: transparent;
    }

    .cell.today:not(.not-current-month) {
      border: 1px solid color('active-red');

      @include transition('border-color');

      &.active {
        border-color: var(--ds-calendar-table-cell-today-active-border-color);
      }
    }
  }

  &.ds-mx-table-year,
  &.ds-mx-table-month {
    border-spacing: 6.5px;
    border-collapse: separate;

    .cell {
      padding: 9px;
    }
  }
}

.ds-mx-calendar-content {
  height: auto;

  .cell:not(.active, .disabled, .not-current-month) {
    color: var(--ds-calendar-content-table-cell-not-active-color);

    &:hover {
      background-color: var(--ds-calendar-content-table-cell-hover-not-active-color);
    }
  }
}
</style>
