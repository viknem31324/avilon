<template>
  <Multiselect>
    <!-- @vue-ignore -->
    <template v-for="slot in Object.keys(slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>

    <template #noOptions>
      Список пуст
    </template>
    <template #noResult>
      Совпадений не найдено
    </template>
  </Multiselect>
</template>

<script lang="ts" setup>
import Multiselect from 'vue-multiselect';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const slots = useSlots();
</script>

<style lang="scss">
/* stylelint-disable selector-class-pattern */
/* stylelint-disable selector-pseudo-class-no-unknown */
/* stylelint-disable no-descending-specificity */
/* stylelint-disable declaration-block-no-duplicate-properties */
/* stylelint-disable selector-pseudo-element-no-unknown */
.multiselect__spinner {
  position: absolute;
  top: 1px;
  right: 1px;

  display: block;

  width: 48px;
  height: 35px;

  background: #fff;

  &::before {
    animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
    animation-iteration-count: infinite;
  }

  &::after {
    animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
    animation-iteration-count: infinite;
  }
}

.multiselect__spinner::after,
.multiselect__spinner::before {
  content: "";

  position: absolute;
  top: 50%;
  left: 50%;

  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;

  border: 2px solid transparent;
  border-top-color: #41b883;
  border-radius: 100%;
  box-shadow: 0 0 0 1px transparent;
}

.multiselect__loading-enter-active,
.multiselect__loading-leave-active {
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
}

.multiselect__loading-enter,
.multiselect__loading-leave-active {
  opacity: 0;
}

.multiselect,
.multiselect__input,
.multiselect__single {
  touch-action: manipulation;
  touch-action: manipulation;
  font-family: inherit;
  font-size: 16px;
}

.multiselect {
  position: relative;

  display: block;

  box-sizing: content-box;
  width: 100%;
  min-height: 40px;

  color: #35495e;
  text-align: left;

  * {
    box-sizing: border-box;
  }

  &:focus {
    outline: none;
  }
}

.multiselect--disabled {
  pointer-events: none;
  opacity: 0.6;
  background: #ededed;
}

.multiselect--active {
  z-index: 50;

  .multiselect__select {
    transform: rotate(180deg);
  }

  .multiselect__tags-wrap,
  .multiselect__placeholder {
    display: none !important;
  }
}

.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.multiselect--above.multiselect--active .multiselect__current,
.multiselect--above.multiselect--active .multiselect__input,
.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.multiselect__input,
.multiselect__single {
  position: relative;

  display: inline-block;

  box-sizing: border-box;
  width: 100%;
  min-height: 20px;
  margin-bottom: 8px;
  padding: 0 0 0 5px;

  line-height: 20px;
  vertical-align: top;

  background: #fff;
  border: none;
  border-radius: 5px;

  transition: border 0.1s ease;
}

.multiselect__input {
  &::placeholder {
    color: #35495e;
  }

  &:input-placeholder {
    color: #35495e;
  }
}

.multiselect__tag ~ .multiselect__input,
.multiselect__tag ~ .multiselect__single {
  width: auto;
}

.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}

.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}

.multiselect__single {
  margin-bottom: 8px;
  padding-left: 5px;
}

.multiselect__tags-wrap {
  overflow: hidden;
  display: inline;
  max-height: 24px;
}

.multiselect__tags {
  display: block;

  min-height: 40px;
  padding: 8px 40px 0 8px;

  font-size: 14px;

  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
}

.multiselect__tag {
  position: relative;

  overflow: hidden;
  display: inline-block;

  max-width: 100%;
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 4px 26px 4px 10px;

  line-height: 1;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;

  background: #41b883;
  border-radius: 5px;
}

.multiselect__tag-icon {
  cursor: pointer;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;

  width: 22px;
  margin-left: 7px;

  font-weight: $font-weight-bold;
  font-style: normal;
  line-height: 22px;
  text-align: center;

  border-radius: 5px;

  transition: all 0.2s ease;

  &::after {
    content: "\D7";
    font-size: 14px;
    color: #266d4d;
  }
}

.multiselect__current {
  overflow: hidden;

  min-height: 40px;
  padding: 8px 30px 0 12px;

  white-space: nowrap;

  border: 1px solid #e8e8e8;
  border-radius: 5px;
}

.multiselect__current,
.multiselect__select {
  cursor: pointer;

  display: block;

  box-sizing: border-box;
  margin: 0;

  line-height: 16px;
  text-decoration: none;
}

.multiselect__select {
  position: absolute;
  top: 1px;
  right: 1px;

  width: 40px;
  height: 38px;
  padding: 4px 8px;

  text-align: center;

  transition: transform 0.2s ease;

  &::before {
    content: "";

    position: relative;
    top: 65%;
    right: 0;

    margin-top: 4px;

    color: #999;

    border-color: #999 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
  }
}

.multiselect__placeholder {
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
  color: #adadad;
}

.multiselect__content-wrapper {
  position: absolute;
  z-index: 50;

  overflow: auto;
  display: block;

  width: 100%;
  max-height: 240px;

  background: #fff;
  border: 1px solid #e8e8e8;
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  -webkit-overflow-scrolling: touch;
}

.multiselect__content {
  display: inline-block;

  min-width: 100%;
  margin: 0;
  padding: 0;

  vertical-align: top;
  list-style: none;

  &::webkit-scrollbar {
    display: none;
  }
}

.multiselect--above {
  .multiselect__content-wrapper {
    bottom: 100%;

    /* stylelint-disable-next-line order/properties-order */
    border-top: 1px solid #e8e8e8;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
  }
}

.multiselect__element {
  display: block;
}

.multiselect__option {
  cursor: pointer;

  position: relative;

  display: block;

  min-height: 40px;
  padding: 12px;

  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  white-space: nowrap;
  vertical-align: middle;

  &::after {
    position: absolute;
    top: 0;
    right: 0;

    padding-right: 12px;
    padding-left: 20px;

    font-size: 13px;
    line-height: 40px;
  }
}

.multiselect__option--highlight {
  color: #fff;
  background: #41b883;
  outline: none;

  &::after {
    content: attr(data-select);
    color: #fff;
    background: #41b883;
  }
}

.multiselect__option--selected {
  font-weight: $font-weight-bold;
  color: #35495e;
  background: #f3f3f3;

  &::after {
    content: attr(data-selected);
    color: silver;
  }

  &.multiselect__option--highlight {
    color: #fff;
    background: #ff6a6a;

    &::after {
      content: attr(data-deselect);
      color: #fff;
      background: #ff6a6a;
    }
  }
}

.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  color: #a6a6a6;
  background: #ededed;
}

.multiselect__option--disabled {
  pointer-events: none;
  cursor: text;
  color: #a6a6a6 !important;
  background: #ededed !important;

  &.multiselect__option--highlight {
    background: #dedede;
  }
}

.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}

.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}

.multiselect__strong {
  display: inline-block;
  margin-bottom: 8px;
  line-height: 20px;
  vertical-align: top;
}
</style>
