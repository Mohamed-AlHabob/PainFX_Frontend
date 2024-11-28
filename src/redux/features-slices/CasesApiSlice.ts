
import { caseListSchema, createUpdateCaseSchema } from '@/schemas/Case';
import { apiSlice } from '../services/apiSlice';

// API slice for Cases
export const casesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCases: builder.query({
      query: () => 'cases/',
      transformResponse: (response) => {
        try {
          caseListSchema.parse(response);
          return response;
        } catch (error) {
          console.error('Validation error:', error);
          throw error;
        }
      },
    }),
    getAllCases: builder.query({
      query: () => 'cases/',  // Ensure this is correct and does not require parameters
      transformResponse: (response) => {
        try {
          caseListSchema.parse(response);
          return response;
        } catch (error) {
          console.error('Validation error:', error);
          throw error;
        }
      },
    }),
    createCase: builder.mutation({
      query: (caseData) => ({
        url: 'cases/',
        method: 'POST',
        body: caseData,
      }),
      onQueryStarted: async (request, { queryFulfilled }) => {
        try {
          createUpdateCaseSchema.parse(request);
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    updateCase: builder.mutation({
      query: ({ caseId, ...caseData }) => ({
        url: `cases/${caseId}/`,
        method: 'PATCH',
        body: caseData,
      }),
      onQueryStarted: async (request, { queryFulfilled }) => {
        try {
          createUpdateCaseSchema.parse(request);
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    deleteCase: builder.mutation({
      query: (caseId) => ({
        url: `cases/${caseId}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCasesQuery,
  useGetAllCasesQuery,  // Export the new hook
  useCreateCaseMutation,
  useUpdateCaseMutation,
  useDeleteCaseMutation,
} = casesApiSlice;
