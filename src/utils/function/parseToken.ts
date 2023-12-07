import { jwtDecode } from "jwt-decode";

export const parseToken = (token: string | null) => {
  try {
    if (!token) return "";
    return jwtDecode(token ?? "");
  } catch (e) {
    return "";
  }
};
