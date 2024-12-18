export default () => {
  const hidden = () => {
    const margin = window.innerWidth - document.documentElement.scrollWidth;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.marginRight = `${margin}px`;
  };

  const unhidden = () => {
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.marginRight = '0';
  };

  return {
    hidden,
    unhidden,
  };
};
