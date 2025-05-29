import type {
  ChangePasswordDto,
  LoginReqDto,
  LoginResDto,
  RegisterDto,
  UserDto,
} from "@/types/dto";
import API from "./base";
import { QUERY_TAG } from "@/constants";

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<any, RegisterDto>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    login: build.mutation<LoginResDto, LoginReqDto>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    logout: build.mutation<any, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),
    changePassword: build.mutation<any, ChangePasswordDto>({
      query: (body) => ({ url: "/auth/change-password", method: "POST", body }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;
