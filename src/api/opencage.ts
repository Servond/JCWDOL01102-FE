import { IResponseApi } from "../data/interfaces";
import { LocationInfo } from "../data/opencage/interface";
import { server } from "./server";

export const forwardGeocoding = (province: string, city: string) => {
  return server.post<IResponseApi<LocationInfo>>(
    "/api/common/forward-geocode",
    {
      query: `${city}, ${province}`,
    }
  );
};
