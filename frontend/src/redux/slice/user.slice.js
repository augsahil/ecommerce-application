import { createSlice } from "@reduxjs/toolkit"; 

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, setLoading, setError, removeUser } = userSlice.actions;

export const UserSlicePath = (store) => store.userSlice.user;

// export default userSlice.reducer;