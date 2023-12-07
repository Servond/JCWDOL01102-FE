import { IApiResponse } from "../interfaces";

export interface IBranchResponseData {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address?: string;
}

export type getBranchesResponse = IApiResponse<IBranchResponseData>;
