import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TAGS = {
  USER: 'User',
  LINK: 'Link',
  FILE: 'File',
};

export const appApi = createApi({
  reducerPath: 'app',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  keepUnusedDataFor: 60,
  tagTypes: Object.values(TAGS),
  endpoints: () => ({}),
});
