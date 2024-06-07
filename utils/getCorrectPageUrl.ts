const allowedExtensions = ['svg', 'png', 'jpg', 'jpeg'];

/**
 * удаляет дубли слешей, добавляет слеш в конце
 * @param path
 */
export const getCorrectPageUrl = (path?: string | null): string => {
  if (!path) {
    return '';
  }

  if (
    /^https?:\//.test(path)
    || allowedExtensions.includes(path.split('.').pop() || '')
    || path[0] === '#'
  ) {
    return path;
  }

  return `/${path}/`.replace(/\/\/+/g, '/');
};

export default getCorrectPageUrl;
