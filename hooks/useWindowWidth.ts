import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Breakpoints } from '~/assets/constants/breakpoints';


export default () => {
  const isWideDesktop = ref(false);
  const isDesktop = ref(false);
  const isLaptop = ref(false);
  const isTablet = ref(false);

  const checkWindowWidth = () => {
    isWideDesktop.value = window.matchMedia(`(min-width: ${Breakpoints.WIDE_DESKTOP}px)`).matches;
    isDesktop.value = window.matchMedia(`(min-width: ${Breakpoints.DESKTOP}px)`).matches;
    isLaptop.value = window.matchMedia(`(min-width: ${Breakpoints.LAPTOP}px)`).matches;
    isTablet.value = window.matchMedia(`(min-width: ${Breakpoints.TABLET}px)`).matches;
  };

  onMounted(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (document.readyState !== 'loading') {
      checkWindowWidth();
    } else {
      document.addEventListener('DOMContentLoaded', checkWindowWidth);
    }

    window.addEventListener('resize', checkWindowWidth);
  });

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.removeEventListener('DOMContentLoaded', checkWindowWidth);
    window.removeEventListener('resize', checkWindowWidth);
  });

  return {
    isWideDesktop,
    isDesktop,
    isLaptop,
    isTablet,
  };
};
