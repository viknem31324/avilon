const URLS: string[] = [];

export default defineNuxtRouteMiddleware(({ path, query, hash }) => {
  const newPath = getCorrectPageUrl(path);

  if (import.meta.server) {
    if (URLS.find(url => url === newPath)) {
      return;
    }

    URLS.push(newPath);
  }

  if (newPath !== path) {
    const nextRoute = { path: newPath, query, hash };
    return navigateTo(nextRoute, { redirectCode: 301 });
  }
});
