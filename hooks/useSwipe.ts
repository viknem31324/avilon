/* eslint-disable @typescript-eslint/no-explicit-any */
import { onBeforeUnmount, onMounted, type Ref } from 'vue';

interface ICallback {
  left: (...args: any) => any;
  right: (...args: any) => any;
  move: (...args: any) => any;
}

export default (elementRef: Ref<any>, callbacksObject: ICallback) => {
  if (!elementRef) {
    throw new Error('useSwipe accepts two required attributes "elementRef"');
  }

  if (typeof window === 'undefined') {
    return;
  }

  const UNDO_AREA = 20;
  const isTouch = 'ontouchstart' in window;
  let isEvent = false;
  let coordinatesStartAxisX = 0;

  let timeoutId: string | number | NodeJS.Timeout | undefined;

  const comparisonOfCoordinatesAxisX = (coordinatesEndAxisX: number) => {
    const difference = coordinatesEndAxisX - coordinatesStartAxisX;

    if (difference < -UNDO_AREA) {
      return 'right';
    }

    if (difference > UNDO_AREA) {
      return 'left';
    }

    return 'undo_area';
  };

  const isCallback = (type: keyof ICallback) => {
    const callback = callbacksObject[type];

    return callback && typeof callback === 'function';
  };

  const event = (type: keyof ICallback, args?: any) => {
    const callback = callbacksObject[type];

    if (!isCallback(type)) {
      return;
    }

    callback(args);
  };

  const eventEnd = (evt: MouseEvent | TouchEvent) => {
    if (!isTouch) {
      evt.preventDefault();
    }

    if (!isEvent) {
      return;
    }

    isEvent = false;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const coordinatesEndAxisX = isTouch ? evt.changedTouches[0].clientX : evt.pageX;
    const type = comparisonOfCoordinatesAxisX(coordinatesEndAxisX) as keyof ICallback;
    event(type);

    event('move', {
      shiftAxisX: 0,
    });
  };

  const eventMove = (evt: MouseEvent | TouchEvent) => {
    if (!isTouch) {
      evt.preventDefault();
    }

    if (!isEvent || timeoutId) {
      return;
    }

    timeoutId = setTimeout(() => {
      if (isEvent) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const coordinatesEndAxisX = isTouch ? evt.changedTouches[0].clientX : evt.pageX;
        const shift = coordinatesStartAxisX - coordinatesEndAxisX;

        if (Math.abs(shift) > UNDO_AREA) {
          event('move', {
            shiftAxisX: shift,
          });
        }
      }

      clearTimeout(timeoutId);
      timeoutId = undefined;
    }, isTouch ? 30 : 10);
  };

  const eventLeave = (evt: MouseEvent) => {
    if (isEvent) {
      eventEnd(evt);
    }
  };

  const eventStart = (evt: MouseEvent | TouchEvent) => {
    if (!isTouch) {
      evt.preventDefault();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    coordinatesStartAxisX = isTouch ? evt.touches[0].clientX : evt.pageX;
    isEvent = true;
  };

  onMounted(() => {
    if (isTouch) {
      elementRef.value.addEventListener('touchend', eventEnd);
      if (isCallback('move')) {
        elementRef.value.addEventListener('touchmove', eventMove);
      }
      elementRef.value.addEventListener('touchstart', eventStart);
      return;
    }

    elementRef.value.addEventListener('mouseup', eventEnd);
    elementRef.value.addEventListener('mouseleave', eventLeave);

    if (isCallback('move')) {
      elementRef.value.addEventListener('mousemove', eventMove);
    }

    elementRef.value.addEventListener('mousedown', eventStart);
  });

  onBeforeUnmount(() => {
    if (isTouch) {
      elementRef.value.removeEventListener('touchend', eventEnd);

      if (isCallback('move')) {
        elementRef.value.removeEventListener('touchmove', eventMove);
      }

      elementRef.value.removeEventListener('touchstart', eventStart);
      return;
    }

    elementRef.value.removeEventListener('mouseup', eventEnd);
    elementRef.value.addEventListener('mouseleave', eventLeave);
    if (isCallback('move')) {
      elementRef.value.removeEventListener('mousemove', eventMove);
    }
    elementRef.value.removeEventListener('mousedown', eventStart);
  });
};
