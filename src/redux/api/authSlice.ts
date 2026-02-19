import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Doc, User } from "@/src/components/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  user: User | null;
  docs: Doc[];
};

const initialState: AuthState = {
  user: null,
  docs: [],
};

const authSlice = createSlice({
  initialState: initialState,
  name: "authSlice",
  reducers: {
    setAccessToken: (state, action) => {
      if (state.user) {
        state.user.accessToken = action.payload;
      }
    },
    setDocs: (state, action) => {
      state.docs = [...state.docs, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    (builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data;

        AsyncStorage.setItem("accessToken", payload.data?.accessToken || "");
      },
    ),
      builder.addMatcher(
        authApi.endpoints.getLoginCred.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.data;
        },
      ));
  },
});

export const { setAccessToken, setDocs } = authSlice.actions;

export const useAuth = () => {
  const dispatch = useDispatch();

  const changeAccessToken = (token: string) => {
    dispatch(setAccessToken(token));
  };

  const addDocs = (docs: Doc[]) => {
    dispatch(setDocs(docs));
  };

  const data = useSelector((state: RootState) => state.auth);

  return { ...data, changeAccessToken, addDocs };
};

export default authSlice.reducer;
