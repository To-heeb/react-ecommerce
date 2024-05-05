
import { createSlice } from '@reduxjs/toolkit';
import { deleteState, loadState, saveState } from '../../utils/LocalStorageUtils';

// TODO(toheeb): find a better way to  persist user user details other than localStorage e.g redux-persist
const getInitialState = (): AccountState => {
    const storedState: AccountState  = loadState('authState');
  
    if (storedState) {
        return storedState;
    }
  
    // If no valid stored state, return the default initial state
    return {
        id: null,
        name: null,
        email: null,
        cart: 0,
        role: null,
        loggedIn: false,
        token: null
    };
  };

interface AccountState {
    id: number | string | null;
    email: string | null;
    name: string | null;
    role: string | number | null;
    cart:  number ;
    loggedIn: boolean;
    token: string | null;
}

const initialState: AccountState = getInitialState()

// const userRoles = ["Admin", "SuperAdmin", "User", "Manager"]
// userRoles[Math.floor(Math.random() * userRoles.length)]

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        login(accountState, action) {
            accountState.id = 1;
            accountState.email = action.payload.email;
            accountState.name = action.payload.name;
            accountState.role = action.payload.role;
            accountState.loggedIn = true;
            accountState.token = action.payload.token ? action.payload.token : action.payload.data.token ;

            saveState("authState", accountState)

        },
        updateLoggedIn(accountState, action) {
            accountState.id = action.payload.id;
            accountState.email = action.payload.email;
            accountState.name = action.payload.name;
            accountState.loggedIn = true;

            saveState("authState", accountState)

        },
        logout(accountState) {
            accountState.id = null;
            accountState.email = null;
            accountState.loggedIn = false;
            accountState.role = null;
            accountState.token = null;

            deleteState("authState")
        }
    }
});

export const AuthUser = (state: { account: AccountState }) => state.account;
export const getUserId = (state: AccountState) => state.account?.id;

export const { login, logout, updateLoggedIn } = accountSlice.actions;
export default accountSlice.reducer;