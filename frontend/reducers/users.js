import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    peopleLogin: (state, action) => {
      state.value = {
        ...state.value,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
      };
    },
    peopleLogout: (state) => {
      state.value = {
        ...state.value,
        firstname: null,
        lastname: null,
      };
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
