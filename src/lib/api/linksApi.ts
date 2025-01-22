import { Link } from '@/lib/store/slices/linksSlice.js';
import { appApi, TAGS } from '@/lib/api/app';

const { LINK } = TAGS;

export const linksApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getLinks: build.query<Link[], void>({
      query: () => '/links',
      providesTags: (result) => {
        if (!result) return [{ type: LINK, id: 'LIST' }];

        return result.map(({ id }) => ({ type: LINK, id }));
      },
    }),
    createLink: build.mutation<Link, Omit<Link, 'id'>>({
      query: (newLink) => ({
        url: '/links',
        method: 'POST',
        body: newLink,
      }),
      invalidatesTags: [LINK],
    }),
    updateLink: build.mutation<
      Link,
      { id: string; updatedLink: Partial<Link> }
    >({
      query: ({ id, updatedLink }) => ({
        url: `/links/${id}`,
        method: 'PUT',
        body: updatedLink,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: LINK, id }],
    }),
    deleteLink: build.mutation<void, string>({
      query: (id) => ({
        url: `/links/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: LINK, id }],
    }),
    archiveLink: build.mutation<Link, string>({
      query: (id) => ({
        url: `/links/${id}/archive`,
        method: 'PATCH',
        body: { archived: true },
      }),
      invalidatesTags: (result, error, id) => [{ type: LINK, id }],
    }),
    restoreLink: build.mutation<Link, string>({
      query: (id) => ({
        url: `/links/${id}/archive`,
        method: 'PATCH',
        body: { archived: false },
      }),
      invalidatesTags: (result, error, id) => [{ type: LINK, id }],
    }),
    reorderLinks: build.mutation<
      void,
      { orderedLinks: { id: string; order: number }[] }
    >({
      query: ({ orderedLinks }) => ({
        url: '/links/reorder',
        method: 'PATCH',
        body: { links: orderedLinks },
      }),
      invalidatesTags: [LINK],
    }),
  }),
});

export const {
  useGetLinksQuery,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
  useArchiveLinkMutation,
  useRestoreLinkMutation,
  useReorderLinksMutation,
} = linksApi;
