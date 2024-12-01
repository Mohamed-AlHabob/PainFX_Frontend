import { apiSlice } from "@/redux/services/apiSlice";
import { createUpdateLikeSchema, likeListSchema } from "@/schemas/Social";

export const likeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLikes: builder.query({
      query: (postId) => `likes/?post_id=${postId}`,
      transformResponse: (response) => {
        likeListSchema.parse(response); // Validate response
        return response;
      },
    }),
    likePost: builder.mutation({
      query: (data) => ({
        url: 'likes/',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(data, { queryFulfilled }) {
        try {
          createUpdateLikeSchema.parse(data); // Validate request body
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    unlikePost: builder.mutation({
      query: (id) => ({
        url: `likes/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLikesQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} = likeApiSlice;
