import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, HttpStatusCode } from "axios";
import { BaseUser, UserType } from "../../models/BaseUser";
import { AuthApiStatus, AuthApiStatusCode, AuthAttributes, TokenResponse } from "../../entities/api-util";
import { api, api_auth } from "../../utils/AxiosUtils";

export const signInUser = createAsyncThunk (
  "account/", 
  async (signInCreationData: AuthAttributes) => {
    try {
      const response = await api.post(
        "login",
        signInCreationData,
      );
      if(response.status == 200){
        return response
      }
    } catch (error: unknown) {
      // console.error(error);
      const err = error as AxiosError;
      const err_response = err.response?.data

      return err_response as {
        status: AuthApiStatus,
        user: undefined,
        requestTokenId: undefined
      }
    }
});

export const signUpUser = createAsyncThunk (
  "account/", 
  async (signUpCreationData: AuthAttributes) => {
   
    try {
      const response = await api.post(
        "register",
        signUpCreationData
      );
      if(response.status == HttpStatusCode.Ok){
        return response
      }
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      const err_response = err.response?.data

      return err_response as {
        status_code: AuthApiStatus,
        message: undefined,
      }
    }
});


  export const signOutUser = createAsyncThunk (
    "account/", 
    async () => {
      
      try {
        const response = await api_auth.post(
          "account/logout"
        );
        if(response.status == 200){
          return response
        }
      } catch (error) {
        console.error(error);
        const err = error as AxiosError;
        const err_response = err.response?.data

        return err_response as {
          status_code: AuthApiStatus,
          message: undefined,
        }
      }
  });


interface AuthState {
  user?: BaseUser;
  status: AuthApiStatusCode;
  token?: TokenResponse;
  isLoading: boolean;
  hasError: boolean;
  loggedIn: boolean;
  userType: UserType;
}

const initialState: AuthState = {
  user: undefined,
  status: AuthApiStatusCode.None,
  token: undefined,
  isLoading: false,
  hasError: false,
  loggedIn: false,
  userType: UserType.None,
};

const authSignInUserSlice = createSlice({
    name: "authSignInUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(signInUser.pending, (state) => {
          state.isLoading = true;
          state.hasError = false;
          state.loggedIn = false;
          // state.userType = UserType.Buyer;
        })
        .addCase(signInUser.fulfilled, (state, action) => {
          // state.status = action.payload.status;
          state.token = action.payload.data.token
          // state.user = action.payload.user;
          state.isLoading = false;
          state.hasError = false;
        })
        .addCase(signInUser.rejected, (state) => {
          state.hasError = true
          state.isLoading = false;
          state.loggedIn = true;
        })
      }
});


const authSignUpUserSlice = createSlice({
  name: "authSignUpUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.loggedIn = false;
        // state.userType = UserType.Buyer;
    })
      .addCase(signUpUser.fulfilled, (state, action) => {
        console.log(action.payload)
        // state.status = action.payload.status;
        // state.user = action.payload.user;
        // state.requestTokenId = action.payload.requestTokenId;
        state.isLoading = false;
        state.hasError = false;
        // state.userType = UserType.Buyer;

      })
      .addCase(signUpUser.rejected, (state) => {
        state.hasError = true
        state.isLoading = false;
        state.loggedIn = true;
      })
    }
});




// Selectors
export const getSignInAuthToken = (state: AuthState) => state.requestTokenId;
export const getSignInUser = (state: AuthState) => state.user;
export const getSignInUserId = (state: AuthState) => state.user?.id;
export const getSignInUserType = (state: AuthState) => state.userType;
export const getApiStatus = (state: AuthState) => state.status;
export const getLoadingState = (state: AuthState) => state.isLoading;
export const getErrorState = (state: AuthState) => state.hasError;


// add reducers
export const {  } = authSignUpUserSlice.actions;

export const signInUserReducer = authSignInUserSlice.reducer;
export const signUpUserReducer = authSignUpUserSlice.reducer;
