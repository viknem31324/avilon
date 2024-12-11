export const createRobots = (isProduction: boolean) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const robots: any[] = [
    { UserAgent: '*' },
  ];

  if (isProduction) {
    robots.push({ Disallow: '/*?' });
  } else {
    robots.push({ Disallow: '/' });
  }

  return robots;
};
