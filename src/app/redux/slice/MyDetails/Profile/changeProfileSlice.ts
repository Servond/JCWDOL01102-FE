import { createSlice } from "@reduxjs/toolkit";

interface IChangeProfileState {
  isOpen: boolean;
  label: string;
  value: string;
  field: string;
}

const initialState: IChangeProfileState = {
  isOpen: false,
  label: "",
  value: "",
  field: "",
};

export const changeProfileSlice = createSlice({
  name: "changeProfile",
  initialState,
  reducers: {
    openChangeProfile: (state) => {
      state.isOpen = true;
    },
    closeChangeProfile: (state) => {
      state.isOpen = false;
    },
    changeLabelProfile: (state, action) => {
      state.label = action.payload;
    },
    changeValueProfile: (state, action) => {
      state.value = action.payload;
    },
    changeFieldProfile: (state, action) => {
      state.field = action.payload;
    },
  },
});

export const {
  openChangeProfile,
  closeChangeProfile,
  changeLabelProfile,
  changeValueProfile,
  changeFieldProfile,
} = changeProfileSlice.actions;

export default changeProfileSlice.reducer;
