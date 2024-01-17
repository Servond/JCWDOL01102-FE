import { createSlice } from "@reduxjs/toolkit";

const animationSlicer = createSlice({
  name: "animation",
  initialState: {
    drawer: false,
    isRender: false,
  },
  reducers: {
    setDrawer: (state, action) => {
      state.drawer = action.payload;
    },
    setRender: (state, action) => {
      state.isRender = action.payload;
    },
  },
});

export const { setDrawer, setRender } = animationSlicer.actions;
export default animationSlicer.reducer;
