import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserByEmail, getUserById, postUser } from "../../../api/user";
import { AxiosError } from "axios";
import {
  CreateUserResponse,
  GetUserByEmailResponse,
  IEmailCheckInput,
  UserCreationAttributes,
} from "../../../data/user/interfaces";

interface userState {
  getEmailState: "idle" | "pending" | "done" | "rejected";
  postUserState: "idle" | "pending" | "done" | "rejected";
  postUserResp: CreateUserResponse | undefined;
  getEmailResp: GetUserByEmailResponse | undefined;
}

export const fetchUserById = createAsyncThunk(
  "user/getbyid",
  async (id: number) => {
    try {
      const res = await getUserById(id);
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        return Promise.reject(e.response);
      }
      return Promise.reject(e);
    }
  }
);

export const createUser = createAsyncThunk<
  CreateUserResponse,
  UserCreationAttributes,
  {
    rejectValue: CreateUserResponse;
  }
>("user/getbyid", async (data: UserCreationAttributes, thunkApi) => {
  try {
    const res = await postUser(data);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return thunkApi.rejectWithValue({
        statusCode: e.response?.status,
        message: e.response?.statusText,
      });
    }
    return thunkApi.rejectWithValue(e as CreateUserResponse);
  }
});

export const fetchUserByEmail = createAsyncThunk<
  GetUserByEmailResponse,
  IEmailCheckInput,
  { rejectValue: GetUserByEmailResponse }
>("user/getByEmail", async (params, thunkApi) => {
  try {
    const res = await getUserByEmail(params);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return thunkApi.rejectWithValue({
        statusCode: e.response?.status,
        message: e.response?.statusText,
      });
    }
    return thunkApi.rejectWithValue(e as GetUserByEmailResponse);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    getEmailState: "idle",
    postUserState: "idle",
    postUserResp: {},
    getEmailResp: {},
  } as userState,
  reducers: {
    setGetEmailState: (state) => {
      state.getEmailState = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByEmail.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.getEmailState = "done";
        state.getEmailResp = action.payload;
      }
    });

    builder.addCase(fetchUserByEmail.pending, (state) => {
      state.getEmailState = "pending";
    });

    builder.addCase(fetchUserByEmail.rejected, (state, action) => {
      state.getEmailState = "rejected";
      state.getEmailResp = action.payload;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.postUserState = "done";
        state.postUserResp = action.payload;
      }
    });

    builder.addCase(createUser.pending, (state) => {
      state.postUserState = "pending";
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.postUserState = "rejected";
      state.postUserResp = action.payload;
    });
  },
});

export const { setGetEmailState } = userSlice.actions;
export default userSlice.reducer;
