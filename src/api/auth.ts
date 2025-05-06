import type { LoginReqDto, LoginResDto } from "@/types/dto";
import API from "./base";

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResDto, Partial<LoginReqDto>>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    logout: build.mutation<any, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useLogoutMutation } = authApi;
