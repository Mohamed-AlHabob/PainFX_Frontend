
import { createUpdateLawFirmSchema, lawFirmListSchema } from '@/features/LawFirm/schema';
import { apiSlice } from '../services/apiSlice';

// API slice for Law Firms
export const lawFirmApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLawFirms: builder.query({
      query: () => 'lawfirms/',
      transformResponse: (response) => {
        try {
          lawFirmListSchema.parse(response);
          return response;
        } catch (error) {
          console.error('Validation error:', error);
          throw error;
        }
      },
    }),
    createLawFirm: builder.mutation({
      query: (lawFirmData) => ({
        url: 'lawfirms/',
        method: 'POST',
        body: lawFirmData,
      }),
      onQueryStarted: async (request, { queryFulfilled }) => {
        try {
          createUpdateLawFirmSchema.parse(request);
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    updateLawFirm: builder.mutation({
      query: ({ lawFirmId, ...lawFirmData }) => ({
        url: `lawfirms/${lawFirmId}/`,
        method: 'PATCH',
        body: lawFirmData,
      }),
      onQueryStarted: async (request, { queryFulfilled }) => {
        try {
          createUpdateLawFirmSchema.parse(request);
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    deleteLawFirm: builder.mutation({
      query: (lawFirmId) => ({
        url: `lawfirms/${lawFirmId}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLawFirmsQuery,
  useCreateLawFirmMutation,
  useUpdateLawFirmMutation,
  useDeleteLawFirmMutation,
} = lawFirmApiSlice;
