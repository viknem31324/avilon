export const createRobots = (isProduction: boolean) => {
  const robots = {
    disallow: [] as string[],
    // allow: [] as string[],
  };

  if (isProduction) {
    robots.disallow.push('/*?');
  } else {
    robots.disallow.push('/');
  }

  return robots;
};
