import { configureStore } from '@reduxjs/toolkit';
import { UserSlice } from './slice/user.slice';
import { SidebarSlice } from './slice/sidebar.slice';

export const store = configureStore({
  reducer: {
    [UserSlice.name]: UserSlice.reducer,
    [SidebarSlice.name]: SidebarSlice.reducer,
  },
});
