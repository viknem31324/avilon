/* eslint-disable @typescript-eslint/ban-ts-comment */
import { onMounted, onUnmounted } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (handlers: any) => {
  const keydownHandler = (event: KeyboardEvent) => {
    const handler = handlers[event.code];

    if (handler) {
      handler(event);
    }
  };

  onMounted(() => {
    if (typeof document === 'undefined') {
      return;
    }

    // @ts-ignore
    document.addEventListener('keydown', keydownHandler);
  });

  onUnmounted(() => {
    if (typeof document === 'undefined') {
      return;
    }

    // @ts-ignore
    document.removeEventListener('keydown', keydownHandler);
  });
};
