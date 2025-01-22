import { appApi, TAGS } from '@/lib/api/app';

const { FILE } = TAGS;

export const filesApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    uploadFiles: build.mutation<
      { uploadedFiles: { filename: string; path: string }[] },
      FormData
    >({
      query: (formData) => ({
        url: '/files/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [FILE],
    }),
    deleteFile: build.mutation<void, string>({
      query: (filePath) => ({
        url: `/files/delete`,
        method: 'DELETE',
        body: { path: filePath },
      }),
      invalidatesTags: [FILE],
    }),
    listFiles: build.query<{ filename: string; path: string }[], void>({
      query: () => '/files',
      providesTags: (result) => {
        if (!result) return [{ type: FILE, id: 'LIST' }];
        return result.map(({ path }) => ({ type: FILE, id: path }));
      },
    }),
  }),
});

export const {
  useUploadFilesMutation,
  useDeleteFileMutation,
  useListFilesQuery,
} = filesApi;
