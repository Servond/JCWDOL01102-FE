export const generateAuthToken = (token?: string | null): string => {
  return !token ? "" : `Bearer ${token}`;
};
