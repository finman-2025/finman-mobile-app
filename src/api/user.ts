import type { UpdateUserDto, UserDto } from "@/types/dto";
import type { IImageFile } from "@/types/frontend";
import API from "./base";
import { QUERY_TAG } from "@/constants";

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<UserDto, void>({
      query: () => "/auth/profile",
      providesTags: [QUERY_TAG.PROFILE],
    }),

    updateProfile: build.mutation<any, UpdateUserDto>({
      query: (body) => ({ url: "/users", method: "PATCH", body }),
      invalidatesTags: [QUERY_TAG.PROFILE],
    }),

    changeAvatar: build.mutation<any, IImageFile>({
      query: (avatar) => {
        const body = new FormData();
        body.append("file", avatar as any);
        return {
          url: "/users/avatar",
          method: "PUT",
          body,
          headers: { "Content-type": "multipart/form-data" },
        };
      },
      invalidatesTags: [QUERY_TAG.PROFILE],
    }),

    deleteAvatar: build.mutation<any, void>({
      query: () => ({ url: "/users/avatar", method: "DELETE" }),
      invalidatesTags: [QUERY_TAG.PROFILE],
    }),
  }),
  overrideExisting: true,
});

export const {
  useChangeAvatarMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = userApi;
