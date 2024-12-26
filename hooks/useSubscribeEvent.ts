import { onBeforeUnmount, onMounted, unref, type Ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (target: Ref | any, events: { [key: string]: any }) => {
  onMounted(() => {
    if (typeof target === 'undefined') {
      return;
    }

    Object.keys(events).forEach((key) => {
      unref(target).addEventListener(key, events[key]);
    });
  });

  onBeforeUnmount(() => {
    if (typeof target === 'undefined') {
      return;
    }

    Object.keys(events).forEach((key) => {
      unref(target).removeEventListener(key, events[key]);
    });
  });
};
