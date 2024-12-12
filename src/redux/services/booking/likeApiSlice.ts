import { apiSlice } from '../../services/apiSlice';
import { likeListSchema, createUpdateLikeSchema, Like } from '../../../schemas/Social';


export interface LikeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Like[];
}

export interface CreateLikeRequest {
  post: string;
}

export interface UnlikeLikeRequest {
  id: string;
}

export const likeApiSlice = apiSlice.injectEndpoints({
  
  endpoints: (builder) => ({
    getLikes: builder.query<LikeListResponse, { postId: string; page?: number }>({
      query: ({ postId, page = 1 }) => `likes/?post_id=${postId}&page=${page}`,
      transformResponse: (response: LikeListResponse) => {
        likeListSchema.parse(response);
        return response;
      },
      providesTags: (result,) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Like' as const, id })),
              { type: 'Like', id: 'LIST' },
            ]
          : [{ type: 'Like', id: 'LIST' }],
    }),
    getUserLike: builder.query<Like | null, { postId: string; userId: string }>({
      query: ({ postId, userId }) => `likes/?post_id=${postId}&user=${userId}`,
      transformResponse: (response: LikeListResponse) => {
        likeListSchema.parse(response);
        return response.results[0] || null;
      },
      providesTags: (result) =>
        result
          ? [{ type: 'Like', id: result.id }]
          : [{ type: 'Like', id: 'LIST' }],
    }),
    likePost: builder.mutation<Like, CreateLikeRequest>({
      query: (data) => ({
        url: 'likes/',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: Like) => {
        createUpdateLikeSchema.parse(response);
        return response;
      },
      invalidatesTags: [{ type: 'Like', id: 'LIST' }],
      async onQueryStarted({ post }, { dispatch, queryFulfilled }) {
        const userId = "4121ee66-153c-4200-906c-88337e53dea1";

        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getLikes', { postId: post, page: 1 }, (draft) => {
            draft.results.push({
              id: Math.random(),
              post,
              user: userId || 0,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
            draft.count += 1;
          })
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData('getLikes', { postId: post, page: 1 }, (draft) => {
              const index = draft.results.findIndex((like) => like.id === Math.random());
              if (index !== -1) {
                draft.results[index] = data;
              }
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
    unlikePost: builder.mutation<{ success: boolean; id: string }, UnlikeLikeRequest>({
      query: ({ id }) => ({
        url: `likes/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ({ id }) => [{ type: 'Like', id }],
      async onQueryStarted({ id, postId }, { dispatch, queryFulfilled }) {
        // Optimistic Update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getLikes', { postId, page: 1 }, (draft) => {
            draft.results = draft.results.filter((like) => like.id !== id);
            draft.count -= 1;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLikesQuery,
  useGetUserLikeQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} = likeApiSlice;
