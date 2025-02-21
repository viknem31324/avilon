export const formatDate = (date?: string) => {
  if (!date) {
    return;
  }

  return new Date(date).toLocaleDateString('ru-RU');
};

export const formatDateISO = (date?: Date) => {
  if (!date) {
    return;
  }

  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    .toISOString()
    .substring(0, 10);
};
