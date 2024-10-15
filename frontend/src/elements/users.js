import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    firstname: null,
    lastname: null,
  },
};

export const userSlice = createSlice({
  name: "people",
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

export const { peopleLogin, peopleLogout } = userSlice.actions;
export default userSlice.reducer;
