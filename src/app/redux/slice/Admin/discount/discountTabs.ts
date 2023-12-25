import { createSlice } from "@reduxjs/toolkit";

interface IDiscountTabsState {
  currentTab: number;
}

const discountTabsSlice = createSlice({
  name: "discountTab",
  initialState: {
    currentTab: 0,
  } as IDiscountTabsState,
  reducers: {
    setDiscountTabsCurrent: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setDiscountTabsCurrent } = discountTabsSlice.actions;
export default discountTabsSlice.reducer;
