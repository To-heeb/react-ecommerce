import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/LocalStorageUtils";

const getInitialState = (): UserState[] => {
  const userState: UserState[] = loadState("users");

  if (userState) {
    return userState;
  }

  // If no valid stored state, return the default initial state
  // password: Pa$$word1
  return [
    {
      id: "nWpWES-vFw1uSdeB9oVd3",
      name: "Yuusuf Muhammad",
      roleId: "nWpZU0-vFw1uSdeB9oVd3",
      email: "yuusuf@mail.com",
      password:
        "6ac70653c12bccb625e07be7a754b89a8a26356fc6e027dd64f5f7e416a8e22e",
    },
    {
      id: "nWpWES-vFw1ujfEW9oVd3",
      name: "Aadam Muslih",
      roleId: "nWpZU0-vw1udEdeB9oVd3",
      email: "muslih@mail",
      password:
        "6ac70653c12bccb625e07be7a754b89a8a26356fc6e027dd64f5f7e416a8e22e",
    },
    {
      id: "nWSder-vFw1uSdeB9oVd3",
      name: "Oyekola Toheeb",
      roleId: "nWpZU0-vFe4uSdeB9oVd3",
      email: "toheeb@mail.com",
      password:
        "6ac70653c12bccb625e07be7a754b89a8a26356fc6e027dd64f5f7e416a8e22e",
    },
  ];
};

interface UserState {
  id: string;
  roleId: string;
  name: string;
  email: string;
  password: string;
}

const initialState: UserState[] = getInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      action.payload.id = nanoid();
      state.push(action.payload);
      saveState("users", state);
    },
    updateUser(state, action) {
      const user = state.find((user) => user.id == action.payload.id);
      if (user) {
        user.name = action.payload.name;
        user.email = action.payload.email;
        user.roleId = action.payload.roleId;
      }
      saveState("users", state);
    },
    updateUserPassword(state, action) {
      const user = state.find((user) => user.id == action.payload.id);
      if (user) {
        user.name = action.payload.name;
        user.email = action.payload.email;
        user.password = action.payload.password;
      }
      saveState("users", state);
    },
    deleteUser(state, action) {
      const user = state.find((user) => user.id == action.payload.id);
      console.log(user);
      if (user) {
        const newState = state.filter((user) => user.id != action.payload.id);
        saveState("users", newState);
        return newState;
      }
    },
  },
});

export const getAllUsers = (state: { users: UserState[] }) => state.user;

export const { addUser, updateUser, deleteUser, updateUserPassword } =
  userSlice.actions;

export default userSlice.reducer;
