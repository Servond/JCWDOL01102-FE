import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ILoginInput,
  ILoginResponse,
  IUserFromToken,
  LoginResponse,
} from "../../../../data/user/interfaces";
import { login } from "../../../../api/user";
import { AxiosError } from "axios";
import { parseToken } from "../../../../utils/function/parseToken";

interface ILoginState {
  emailValue: string | undefined;
  passwordValue: string | undefined;
  token: string | undefined;
  loginState: "idle" | "pending" | "done" | "rejected";
  loginResp: LoginResponse | undefined;
  isAuthenticated: boolean;
  role: string;
  permission: string[];
}

export const userLogin = createAsyncThunk<
  LoginResponse,
  ILoginInput,
  { rejectValue: LoginResponse }
>("login/login", async (payload, thunkApi) => {
  try {
    const res = await login(payload.email, payload.password);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return thunkApi.rejectWithValue({
        statusCode: e.response?.status,
        message: e.response?.data.message,
      });
    }
    return thunkApi.rejectWithValue(e as LoginResponse);
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    emailValue: "",
    passwordValue: "",
    token: "",
    loginState: "idle",
    loginResp: {},
    isAuthenticated: false,
    role: "",
    permission: [],
  } as ILoginState,
  reducers: {
    resetUserLoginCredential: (state) => {
      state.emailValue = "";
      state.passwordValue = "";
      state.loginState = "idle";
    },
    resetToken: (state) => {
      state.token = "";
    },
    setLoginEmail: (state, action) => {
      state.emailValue = action.payload;
    },
    setLoginPassword: (state, action) => {
      state.passwordValue = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload.statusCode?.toString().startsWith("2")) {
        state.loginResp = action.payload;
        state.token = (action.payload.data as ILoginResponse).token;
        state.loginState = "done";
        state.isAuthenticated = true;
        const tokenObj = parseToken(state.token!) as IUserFromToken;
        state.role = tokenObj.role;
        console.log(state.role);
        state.permission = tokenObj.permission;
      }
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loginState = "pending";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loginResp = action.payload;
      state.loginState = "rejected";
    });
  },
});

export const {
  resetUserLoginCredential,
  resetToken,
  setLoginEmail,
  setLoginPassword,
  setAuthenticated,
  setPermission,
  setRole,
} = loginSlice.actions;

export default loginSlice.reducer;
