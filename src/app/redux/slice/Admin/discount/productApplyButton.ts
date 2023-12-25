import { createSlice } from "@reduxjs/toolkit";

interface IProductApplyButtonInitialState {
  isEnable: boolean;
}

const productApplyButtonSlice = createSlice({
  name: "productApplyButton",
  initialState: {
    isEnable: true,
  } as IProductApplyButtonInitialState,
  reducers: {
    setApplyButtonState: (state, action) => {
      state.isEnable = action.payload;
    },
  },
});

export const { setApplyButtonState } = productApplyButtonSlice.actions;
export default productApplyButtonSlice.reducer;
