import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponseStatic } from "../../../../../data/interfaces";
import { AxiosError } from "axios";
import { deleteAdminById } from "../../../../../api/admin/user-management";

interface IDeleteAdminState {
  apiState: "idle" | "pending" | "done" | "rejected";
  resp: IApiResponseStatic;
}

export const deleteAdmin = createAsyncThunk<
  IApiResponseStatic,
  number,
  { rejectValue: IApiResponseStatic }
>("/deleteAdmin/delete", async (id, thunkApi) => {
  try {
    const res = await deleteAdminById(id);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return thunkApi.rejectWithValue({
        statusCode: e.response?.status,
        message: e.response?.data.message,
      });
    }
    return thunkApi.rejectWithValue(e as IApiResponseStatic);
  }
});

export const deleteAdminSlice = createSlice({
  name: "deleteAdmin",
  initialState: {
    apiState: "idle",
    resp: {},
  } as IDeleteAdminState,
  reducers: {
    setDeleteAdminApiState: (state, action) =>
      (state.apiState = action.payload),
    setDeleteAdminResponse: (state, action) => (state.resp = action.payload),
    resetDeleteAdminState: (state) => {
      state.resp = {};
      state.apiState = "idle";
    },
  },

  extraReducers(builder) {
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.resp = action.payload;
        state.apiState = "done";
      }
    });

    builder.addCase(deleteAdmin.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(deleteAdmin.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload!;
    });
  },
});

export const {
  setDeleteAdminApiState,
  setDeleteAdminResponse,
  resetDeleteAdminState,
} = deleteAdminSlice.actions;
export default deleteAdminSlice.reducer;
