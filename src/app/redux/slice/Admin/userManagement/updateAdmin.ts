import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponseStatic } from "../../../../../data/interfaces";
import { updateAdminById } from "../../../../../api/admin/user-management";
import { AxiosError } from "axios";
import { AdminEditByIdInput } from "../../../../../data/user/interfaces";

interface IUpdateAdminState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponseStatic;
}

export const updateAdmin = createAsyncThunk<
  IApiResponseStatic,
  AdminEditByIdInput,
  { rejectValue: IApiResponseStatic }
>("updateAdmin, admin", async (input, thunkApi) => {
  try {
    const res = await updateAdminById(input.id, input.data);
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

const updateAdminSlice = createSlice({
  name: "updateAdmin",
  initialState: {
    apiState: "idle",
    resp: {},
  } as IUpdateAdminState,
  reducers: {
    resetUpdateAdminState: (state) => {
      state.apiState = "idle";
      state.resp = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(updateAdmin.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.resp = action.payload;
        state.apiState = "done";
      }
    });

    builder.addCase(updateAdmin.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(updateAdmin.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload!;
    });
  },
});

export const { resetUpdateAdminState } = updateAdminSlice.actions;
export default updateAdminSlice.reducer;
