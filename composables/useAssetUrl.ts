export const useAssetUrl = () => {
  const config = useRuntimeConfig();

  const getAssetUrl = (path: string): string => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    const baseURL = config.app.baseURL || '/';

    if (path.startsWith(baseURL)) {
      return path;
    }

    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    const fullPath = `${baseURL}${cleanPath}`;

    return fullPath.replace(/([^:]\/)\/+/g, '$1');
  };

  return {
    getAssetUrl,
  };
};
