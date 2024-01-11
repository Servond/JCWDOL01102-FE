/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

export const handleAsyncThunkError = (error: AxiosError, thunkAPI: any) => {
  if (error.response) {
    thunkAPI.rejectWithValue({
      error: error.response.data,
      status: error.response.status,
    });
  } else if (error.request) {
    thunkAPI.rejectWithValue({
      error: "No response received from the server",
      status: 500,
    });
  } else {
    thunkAPI.rejectWithValue({
      error: "An error occurred while setting up the request",
      status: 500,
    });
  }
};
