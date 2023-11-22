import { server } from "./server";

export const getProvinces = () => {
  return server.get("api/master-data/provinces");
};

export const getCities = (id?: number) => {
  return server.get(`api/master-data/cities?province_id=${id}`);
};
