export const toCamelCase = (data: string | undefined) => {
  return !data ? "" : data.replace(/[_]/g, " ");
};
