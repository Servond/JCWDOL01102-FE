import { createSlice } from "@reduxjs/toolkit";

interface INavbarState {
  currentPageIndex: number;
}

const NavbarSlice = createSlice({
  name: "navbar",
  initialState: {
    currentPageIndex: 0,
  } as INavbarState,
  reducers: {
    setCurrentPageIndex: (state, action) => {
      state.currentPageIndex = action.payload;
    },
  },
});

export const { setCurrentPageIndex } = NavbarSlice.actions;
export default NavbarSlice.reducer;
