export const buildUrl = (
  route: string,
  param?: string | number,
  params?: object,
) => {
  let url = route;

  // Param: /route/:id
  if (param !== undefined && param !== null) {
    url = `${url}/${param}`;
  }

  // Query Params
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
