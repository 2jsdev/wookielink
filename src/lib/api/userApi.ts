import { appApi, TAGS } from '@/lib/api/app';

const { USER } = TAGS;

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  image: string;
  links?: { url: string; label: string }[];
};

export const usersApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    checkUsernameAvailability: build.query<{ isAvailable: boolean }, string>({
      query: (username) => ({
        url: `/users/check-username?username=${username}`,
        method: 'GET',
      }),
    }),
    getPublicProfileByUsername: build.query<User, string>({
      query: (username) => ({
        url: `/users/${username}/profile`,
        method: 'GET',
      }),
    }),
    getUserProfile: build.query<User, void>({
      query: () => ({
        url: '/users/me/profile',
        method: 'GET',
      }),
      providesTags: (result) => [{ type: USER }],
    }),
    updateUserProfile: build.mutation<User, Partial<User>>({
      query: (data) => ({
        url: '/users/me/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    uploadUserProfilePhoto: build.mutation<
      { uploadedFile: { filename: string; path: string } },
      FormData
    >({
      query: (formData) => ({
        url: '/users/me/profile/photo',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: USER }],
    }),
    deleteUserProfilePhoto: build.mutation<void, void>({
      query: () => ({
        url: '/users/me/profile/photo',
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: USER }],
    }),
  }),
});

export const {
  useCheckUsernameAvailabilityQuery,
  useGetPublicProfileByUsernameQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadUserProfilePhotoMutation,
  useDeleteUserProfilePhotoMutation,
} = usersApi;
