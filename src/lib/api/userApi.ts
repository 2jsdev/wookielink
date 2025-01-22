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
    getUserProfile: build.query<User, void>({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
      providesTags: (result) => [{ type: USER }],
    }),
    getPublicProfileByUsername: build.query<User, string>({
      query: (username) => ({
        url: `/users/${username}/profile`,
        method: 'GET',
      }),
    }),
    updateUserProfile: build.mutation<User, Partial<User>>({
      query: (data) => ({
        url: '/users/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: USER }],
    }),
  }),
});

export const {
  useCheckUsernameAvailabilityQuery,
  useGetUserProfileQuery,
  useGetPublicProfileByUsernameQuery,
  useUpdateUserProfileMutation,
} = usersApi;
