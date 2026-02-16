import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "@/src/components/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  userData: {
    display_name: "",
    email: "",
    profile_url: "",
    uid: "",
    createdAt: 0,
    accessToken: "",
  } as User,
};

const authSlice = createSlice({
  initialState: initialState,
  name: "authSlice",
  reducers: {
    setAccessToken: (state, action) => {
      state.userData.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    (builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.userData = payload.data;

        AsyncStorage.setItem("accessToken", payload.data?.accessToken || "");
      },
    ),
      builder.addMatcher(
        authApi.endpoints.getLoginCred.matchFulfilled,
        (state, { payload }) => {
          state.userData = payload.data;
        },
      ));
  },
});

export const { setAccessToken } = authSlice.actions;

export const useAuth = () => {
  const dispatch = useDispatch();

  const changeAccessToken = (token: string) => {
    dispatch(setAccessToken(token));
  };

  const data = useSelector((state: RootState) => state.auth);

  return { ...data, changeAccessToken };
};

export default authSlice.reducer;
