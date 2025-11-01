const allowedExtensions = ['svg', 'png', 'jpg', 'jpeg', 'gif', 'xlsx', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'csv', 'txt', 'odt', 'rtf', 'zip', 'rar'];

/**
 * удаляет дубли слешей, добавляет слеш в конце
 * @param path
*/
export const getCorrectPageUrl = (path?: string | null): string => {
  if (!path) {
    return '';
  }

  if (/^(mailto|tel):/.test(path)) {
    return path;
  }

  if (
    /^https?:\//.test(path)
    || allowedExtensions.includes(path.split('.').pop() || '')
    || path.includes('#')
  ) {
    let cleanedPath = path.replace(/([^:]\/)\/+/g, '$1');

    if (!cleanedPath.endsWith('/') && !cleanedPath.includes('#') && !cleanedPath.includes('?') && !cleanedPath.includes('.')) {
      cleanedPath += '/';
    }

    return cleanedPath;
  }

  return `/${path}/`.replace(/\/\/+/g, '/');
};

export default getCorrectPageUrl;
