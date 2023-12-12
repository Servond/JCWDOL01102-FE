import { getToken } from "./admin/product";
import { server } from "./server";

export const getProvinces = () => {
  return server.get("api/master-data/provinces", {
    headers: {
      Authorization: getToken(),
    },
  });
};

export const getCities = (id?: number) => {
  return server.get(`api/master-data/cities?province_id=${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });
};
