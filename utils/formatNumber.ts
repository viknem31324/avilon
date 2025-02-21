export const formatNumber = (num?: number | null) => {
  if (!num) {
    return;
  }

  return num.toLocaleString('ru');
};
