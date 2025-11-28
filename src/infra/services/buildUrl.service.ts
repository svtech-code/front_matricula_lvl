export const buildUrl = (
  route: string,
  param?: string | number,
  params?: object,
) => {
  let url = route;

  if (param !== undefined && param !== null) {
    const separator = url.endsWith('/') ? '' : '/';
    url = `${url}${separator}${param}`;
  }

  if (params && typeof params === 'object') {
    const searchParams = new URLSearchParams(
      Object.entries(params).reduce(
        (acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        },
        {} as Record<string, string>,
      ),
    );
    url += `?${searchParams.toString()}`;
  }

  return url;
};
