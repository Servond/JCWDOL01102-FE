import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IBranchResponseData,
  getBranchesResponse,
} from "../../../../../data/branch/interface";
import { getAllBranch } from "../../../../../api/branch";
import { AxiosError } from "axios";

export const fetchBranches = createAsyncThunk<
  getBranchesResponse,
  undefined,
  { rejectValue: getBranchesResponse }
>("createAdmin/get", async (_, thunkApi) => {
  try {
    const res = await getAllBranch();
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

interface createAdminState {
  apiState: "idle" | "pending" | "done" | "rejected";
  branches: IBranchResponseData[];
  resp: getBranchesResponse;
}

const createAdminSlice = createSlice({
  name: "createAdmin",
  initialState: {
    apiState: "idle",
    branches: [],
    resp: {},
  } as createAdminState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBranches.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.branches = action.payload.data as IBranchResponseData[];
        state.apiState = "done";
      }
    });

    builder.addCase(fetchBranches.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(fetchBranches.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload!;
    });
  },
});

export default createAdminSlice.reducer;
