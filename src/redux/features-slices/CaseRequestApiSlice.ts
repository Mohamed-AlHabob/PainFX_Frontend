import { caseRequestListSchema, createUpdateCaseRequestSchema } from '@/schemas/Case';
import { apiSlice } from '../services/apiSlice';
import { z } from 'zod';



type caseRequestLis = z.infer<typeof caseRequestListSchema>;
// API slice for Case Requests
export const caseRequestsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCaseRequests: builder.query<caseRequestLis, void>({
      query: () => 'case-requests/',
      transformResponse: (response: unknown) => {
        try {
          const parsedResponse = caseRequestListSchema.parse(response);
          return parsedResponse;
        } catch (error) {
          console.error('Validation error:', error);
          throw error;
        }
      },
    }),
    createCaseRequest: builder.mutation({
      query: (caseRequestData) => ({
        url: 'case-requests/',
        method: 'POST',
        body: caseRequestData,
      }),
      onQueryStarted: async (request, { queryFulfilled }) => {
        try {
          createUpdateCaseRequestSchema.parse(request);
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    updateCaseRequest: builder.mutation({
      query: ({ requestId="7fb00aba-f348-4ec9-afc4-796617c82612", ...caseRequestData }) => ({
        url: `case-requests/${requestId}/`,
        method: 'PATCH',
        body: caseRequestData,
      }),
      onQueryStarted: async (request, { queryFulfilled }) => {
        try {
          createUpdateCaseRequestSchema.parse(request);
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    deleteCaseRequest: builder.mutation({
      query: (requestId) => ({
        url: `case-requests/${requestId}/`,
        method: 'DELETE',
      }),
    }),
  }),  overrideExisting: false,
});

// Export hooks for usage in functional components
export const {
  useGetCaseRequestsQuery,
  useCreateCaseRequestMutation,
  useUpdateCaseRequestMutation,
  useDeleteCaseRequestMutation,
} = caseRequestsApiSlice;
