import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TAGS = {
  USER: 'User',
  LINK: 'Link',
  FILE: 'File',
};

export const appApi = createApi({
  reducerPath: 'app',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: async (headers, { endpoint }) => {
      if (
        endpoint === 'getPublicProfileByUsername' ||
        endpoint === 'registerLinkClick'
      ) {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        headers.set('X-User-IP', data.ip);
        headers.set(
          'X-User-Screen-Resolution',
          `${window.screen.width}x${window.screen.height}`
        );
      }

      return headers;
    },
  }),
  keepUnusedDataFor: 60,
  tagTypes: Object.values(TAGS),
  endpoints: () => ({}),
});
