import { createSlice } from "@reduxjs/toolkit";

interface ICategoriesState {
  currentCategoryIndex: number;
}

const LandingpageCategorySlice = createSlice({
  name: "landingPage/category",
  initialState: {
    currentCategoryIndex: 0,
  } as ICategoriesState,
  reducers: {
    setCurrentCategoryIndex: (state, action) => {
      state.currentCategoryIndex = action.payload;
    },
  },
});

export const { setCurrentCategoryIndex } = LandingpageCategorySlice.actions;
export default LandingpageCategorySlice.reducer;
