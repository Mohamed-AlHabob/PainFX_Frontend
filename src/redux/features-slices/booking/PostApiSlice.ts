import { apiSlice } from "@/redux/services/apiSlice";
import { createUpdatePostSchema, postListResponseSchema } from "@/schemas/Social";


export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts/',
      transformResponse: (response) => {
        const parsedResponse = postListResponseSchema.parse(response);
        return {
          data: parsedResponse.results,
          meta: parsedResponse.pagination,
        };
      },
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: 'posts/',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(data, { queryFulfilled }) {
        createUpdatePostSchema.parse(data);
        await queryFulfilled;
      },
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `posts/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ id, ...data }, { queryFulfilled }) {
        createUpdatePostSchema.parse(data);
        await queryFulfilled;
      },
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
