import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IBranchWithDistanceAttributes,
  IGetNearestBranchInput,
} from "../../../../data/branch/interface";
import { IApiResponse } from "../../../../data/interfaces";
import { AxiosError } from "axios";
import { getNearestBranch } from "../../../../api/landingPage";

interface IGetNearestBranchState {
  apiState: "idle" | "pending" | "rejected" | "done";
  branch: IBranchWithDistanceAttributes;
  resp: IApiResponse<IBranchWithDistanceAttributes>;
}

export const fetchNearestBranch = createAsyncThunk<
  IApiResponse<IBranchWithDistanceAttributes>,
  IGetNearestBranchInput,
  { rejectValue: IApiResponse<IBranchWithDistanceAttributes> }
>("getNearestBranch/get", async (input, thunkApi) => {
  try {
    const res = await getNearestBranch(input);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response) {
        return thunkApi.rejectWithValue({
          statusCode: e.response?.status,
          message: e.response?.data.message,
        });
      } else if (e.request) {
        return thunkApi.rejectWithValue({
          statusCode: 500,
          message: e.code,
        });
      }
    }
    return thunkApi.rejectWithValue({
      statusCode: 500,
      message: (e as Error).message,
    });
  }
});

const getNearestBranchSlice = createSlice({
  name: "getNearestBranch",
  initialState: {
    apiState: "idle",
    branch: {},
    resp: {},
  } as IGetNearestBranchState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNearestBranch.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
        state.branch = (
          action.payload as IApiResponse<IBranchWithDistanceAttributes>
        ).data!;
      }
    });

    builder.addCase(fetchNearestBranch.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchNearestBranch.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp =
        action.payload as IApiResponse<IBranchWithDistanceAttributes>;
    });
  },
});

export default getNearestBranchSlice.reducer;
