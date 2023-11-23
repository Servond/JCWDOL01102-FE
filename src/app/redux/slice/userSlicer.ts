import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getEmailVerification,
  getUserByEmail,
  getUserById,
  postUser,
  verifyUserByEmail,
} from "../../../api/user";
import { AxiosError } from "axios";
import {
  CreateUserResponse,
  GetUserByEmailResponse,
  IEmailCheckInput,
  ISendEmailCheckInput,
  SendEmailVerificationResponse,
  UserCreationAttributes,
} from "../../../data/user/interfaces";
import { IApiResponseStatic } from "../../../data/interfaces";

interface userState {
  getEmailState: "idle" | "pending" | "done" | "rejected";
  postUserState: "idle" | "pending" | "done" | "rejected";
  postUserResp: CreateUserResponse | undefined;
  getEmailResp: GetUserByEmailResponse | undefined;
  sendEmailVerificationResp: SendEmailVerificationResponse | undefined;
  nameInputValue: string | undefined;
  passwordInputValue: string | undefined;
  emailInputValue: string | undefined;
  numberInputValue: string | undefined;
  verifyUserResp: IApiResponseStatic | undefined;
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

export const sendEmailVerification = createAsyncThunk<
  SendEmailVerificationResponse,
  ISendEmailCheckInput,
  { rejectValue: SendEmailVerificationResponse }
>("user/sendEmail", async (payload: ISendEmailCheckInput, thunkApi) => {
  try {
    const res = await getEmailVerification(
      payload.name,
      payload.email,
      payload.id
    );
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return thunkApi.rejectWithValue({
        statusCode: e.response?.status,
        message: e.response?.statusText,
      });
    }
    return thunkApi.rejectWithValue(e as SendEmailVerificationResponse);
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

export const verifyUser = createAsyncThunk<
  IApiResponseStatic,
  number,
  { rejectValue: GetUserByEmailResponse }
>("user/verify", async (id, thunkApi) => {
  try {
    const res = await verifyUserByEmail(id);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return thunkApi.rejectWithValue({
        statusCode: e.response?.status,
        message: e.response?.statusText,
      });
    }
    return thunkApi.rejectWithValue(e as IApiResponseStatic);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    getEmailState: "idle",
    postUserState: "idle",
    postUserResp: {},
    getEmailResp: {},
    sendEmailVerificationResp: {},
    emailInputValue: "",
    passwordInputValue: "",
    numberInputValue: "",
    nameInputValue: "",
    verifyUserResp: {},
  } as userState,
  reducers: {
    setGetEmailState: (state) => {
      state.getEmailState = "idle";
    },
    setEmailInputValue: (state, action) => {
      state.emailInputValue = action.payload;
    },
    setPasswordInputValue: (state, action) => {
      state.passwordInputValue = action.payload;
    },
    setNameInputValue: (state, action) => {
      state.nameInputValue = action.payload;
    },
    setNumberInput: (state, action) => {
      state.numberInputValue = action.payload;
    },
    resetInput: (state) => {
      state.emailInputValue = "";
      state.numberInputValue = "";
      state.nameInputValue = "";
      state.passwordInputValue = "";
    },
    resetUserState: (state) => {
      state.getEmailState = "idle";
      state.postUserState = "idle";
      state.postUserResp = {};
      state.getEmailResp = {};
      state.sendEmailVerificationResp = {};
      state.emailInputValue = "";
      state.numberInputValue = "";
      state.nameInputValue = "";
      state.passwordInputValue = "";
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

    builder.addCase(sendEmailVerification.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.sendEmailVerificationResp = action.payload;
      }
    });

    builder.addCase(sendEmailVerification.rejected, (state, action) => {
      state.verifyUserResp = action.payload;
    });

    builder.addCase(verifyUser.fulfilled, (state, action) => {
      if (action.payload?.statusCode?.toString().startsWith("2")) {
        state.verifyUserResp = action.payload;
      }
    });

    builder.addCase(verifyUser.rejected, (state, action) => {
      state.verifyUserResp = action.payload;
    });
  },
});

export const {
  setGetEmailState,
  setEmailInputValue,
  setPasswordInputValue,
  setNameInputValue,
  setNumberInput,
  resetInput,
  resetUserState,
} = userSlice.actions;
export default userSlice.reducer;
