import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/LocalStorageUtils";

const getInitialState = (): RoleState[] => {
  const roleState: RoleState[] = loadState("roles");

  if (roleState) {
    return roleState;
  }

  // If no valid stored state, return the default initial state
  return [
    { id: "nWpZU0-vFw1uSdeB9oVd3", name: "SuperAdmin" },
    { id: "nWpZU0-vFe4uSdeB9oVd3", name: "Admin" },
    { id: "depZU0-vFw1uSdeB9oVd3", name: "User" },
    { id: "nDeZU0-vFw1uSdeB9oVd3", name: "Customer" },
    { id: "nWpZU0-vw1udEdeB9oVd3", name: "Manager" },
  ];
};

interface RoleState {
  id: string;
  name: string;
}

const initialState: RoleState[] = getInitialState();

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    addRole(state, action) {
      action.payload.id = nanoid();
      state.push(action.payload);
      saveState("roles", state);
    },
    updateRole(state, action) {
      const role = state.find((role) => role.id == action.payload.id);
      if (role) {
        role.name = action.payload.name;
      }
      saveState("roles", state);
    },
    deleteRole(state, action) {
      const role = state.find((role) => role.id == action.payload.id);
      console.log(role);
      if (role) {
        const newState = state.filter((role) => role.id != action.payload.id);
        saveState("roles", newState);
        return newState;
      }
    },
  },
});

export const getAllRoles = (state: { roles: RoleState[] }) => state.role;

export const { addRole, updateRole, deleteRole } = roleSlice.actions;

export default roleSlice.reducer;
