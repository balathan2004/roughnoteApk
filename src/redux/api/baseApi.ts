// baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { User } from "@/src/components/interfaces";
import { setAccessToken } from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://rough-note.vercel.app/api",
  // no credentials here
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.userData.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const { data: responseData, error } = (await baseQuery(
      "/auth/refresh",
      api,
      extraOptions,
    )) as { data: any; error: any };
    if (responseData && responseData.data) {
      const data = responseData?.data as User;

      AsyncStorage.setItem("userData", JSON.stringify(data));
      AsyncStorage.setItem("accessToken", data.accessToken || "");
      api.dispatch({
        type: "authApi/setAccessToken",
        payload: data.accessToken,
      });
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.logout();
    }
  }
  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["docs"],
  endpoints: () => ({}),
});
