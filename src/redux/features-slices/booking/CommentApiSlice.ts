import { apiSlice } from "@/redux/services/apiSlice";
import { commentSchema, createUpdateCommentSchema } from "@/schemas/Social";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => 'comments/',
      transformResponse: (response) => {
        commentSchema.parse(response);
        return response;
      },
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: 'comments/',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(data, { queryFulfilled }) {
        createUpdateCommentSchema.parse(data);
        await queryFulfilled;
      },
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApiSlice;
