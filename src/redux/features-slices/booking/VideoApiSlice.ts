import { apiSlice } from "@/redux/services/apiSlice";
import { createUpdateVideoSchema, videoListSchema, videoSchema } from "@/schemas/Social";


export const videoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => 'videos/',
      transformResponse: (response) => {
        videoListSchema.parse(response); // Validate response
        return response;
      },
    }),
    getVideoById: builder.query({
      query: (id) => `videos/${id}/`,
      transformResponse: (response) => {
        videoSchema.parse(response); // Validate single video
        return response;
      },
    }),
    createVideo: builder.mutation({
      query: (videoData) => {
        const formData = new FormData();
        Object.entries(videoData).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (typeof value === 'string' || value instanceof Blob) {
              formData.append(key, value);
            } else if (typeof value === 'object') {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, String(value));
            }
          }
        });

        return {
          url: 'videos/',
          method: 'POST',
          body: formData,
        };
      },
      async onQueryStarted(videoData, { queryFulfilled }) {
        try {
          createUpdateVideoSchema.parse(videoData); // Validate request body
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    updateVideo: builder.mutation({
      query: ({ id, ...videoData }) => {
        const formData = new FormData();
        Object.entries(videoData).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (typeof value === 'string' || value instanceof Blob) {
              formData.append(key, value);
            } else if (typeof value === 'object') {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, String(value));
            }
          }
        });

        return {
          url: `videos/${id}/`,
          method: 'PATCH',
          body: formData,
        };
      },
      async onQueryStarted({ id, ...videoData }, { queryFulfilled }) {
        try {
          createUpdateVideoSchema.parse(videoData); // Validate request body
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `videos/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videoApiSlice;
