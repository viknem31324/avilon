import type { Ref } from 'vue';

const MARGIN = 10;

export default (anchorMenuRef: Ref<HTMLElement>) => {
  const getOffsetPosition = (element: Element) => {
    let offsetTop = 0;
    let currentElement: Element | null = element;

    while (currentElement !== null) {
      if (currentElement instanceof HTMLElement) {
        offsetTop += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
      }
    }

    return offsetTop;
  };

  const onAnchorScroll = (anchorId: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    const anchorElement = document.querySelector(anchorId);
    const anchorMenuItem = anchorMenuRef.value.firstElementChild;

    if (!anchorElement || !anchorMenuItem) {
      return;
    }

    const paddingTop = Number.parseFloat(getComputedStyle(anchorElement).paddingTop);

    const coordinateScrollY = getOffsetPosition(anchorElement) + paddingTop - anchorMenuItem.clientHeight - MARGIN;

    window.scrollTo({
      top: coordinateScrollY,
      behavior: 'smooth',
    });
  };

  return {
    onAnchorScroll,
    getOffsetPosition,
  };
};
