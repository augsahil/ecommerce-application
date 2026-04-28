import { createSlice } from '@reduxjs/toolkit';
export const SidebarSlice = createSlice({
  initialState: {
    isToggle: false,
    isCollapse: false,
  },
  name: 'SidebarSlice',
  reducers: {
    setToggle(state) {
      state.isCollapse = false;
      state.isToggle = !state.isToggle;
    },
    setCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
});

export const { setCollapse, setToggle } = SidebarSlice.actions;
export const SidebarSlicePath = (store) => store.SidebarSlice;
