import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../../../data/interfaces";
import { AxiosError } from "axios";
import { IUser } from "./user";
import { UserCreationAttributes } from "../../../../data/user/interfaces";
import { updateUser } from "../../../../api/user";

interface IUserUpdateState {
  apiState: "idle" | "pending" | "rejected" | "done";
  resp: IApiResponse<IUser>;
}

export const updateUserById = createAsyncThunk<
  IApiResponse<IUser>,
  UserCreationAttributes,
  { rejectValue: IApiResponse<IUser> }
>("upsateUser/put", async (input, thunkApi) => {
  try {
    const res = await updateUser(Number(input.id), input);
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

const upsateUserSlice = createSlice({
  name: "upsateUser",
  initialState: {
    apiState: "idle",
    resp: {},
  } as IUserUpdateState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateUserById.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.apiState = "done";
        state.resp = action.payload;
      }
    });

    builder.addCase(updateUserById.pending, (state) => {
      state.apiState = "pending";
    });

    builder.addCase(updateUserById.rejected, (state, action) => {
      state.apiState = "rejected";
      state.resp = action.payload as IApiResponse<IUser>;
    });
  },
});

export default upsateUserSlice.reducer;
