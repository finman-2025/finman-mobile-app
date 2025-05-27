import type {
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
    getProfile: build.query<UserDto, void>({
      query: () => "/auth/profile",
      providesTags: [QUERY_TAG.PROFILE],
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;
