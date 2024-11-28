import { caseMembershipListSchema, createUpdateCaseMembershipSchema } from '@/schemas/CaseMembership';
import { apiSlice } from '../services/apiSlice';

// API slice for Case Memberships
export const caseMembershipApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCaseMemberships: builder.query({
      query: (caseId) => `cases/${caseId}/memberships/`, // Get memberships for a specific case
      transformResponse: (response) => {
        try {
          caseMembershipListSchema.parse(response); // Validate response
          return response;
        } catch (error) {
          console.error('Validation error:', error);
          throw error;
        }
      },
    }),
    createCaseMembership: builder.mutation({
      query: ({ caseId, membershipData }) => ({
        url: `cases/${caseId}/memberships/`,
        method: 'POST',
        body: membershipData,
      }),
      async onQueryStarted({ membershipData }, { queryFulfilled }) {
        try {
          createUpdateCaseMembershipSchema.parse(membershipData); // Validate membership data
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    updateCaseMembership: builder.mutation({
      query: ({ caseId, membershipId, membershipData }) => ({
        url: `cases/${caseId}/memberships/${membershipId}/`,
        method: 'PATCH',
        body: membershipData,
      }),
      async onQueryStarted({ membershipData }, { queryFulfilled }) {
        try {
          createUpdateCaseMembershipSchema.parse(membershipData); // Validate membership data
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    deleteCaseMembership: builder.mutation({
      query: ({ caseId, membershipId }) => ({
        url: `cases/${caseId}/memberships/${membershipId}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components
export const {
  useGetCaseMembershipsQuery,
  useCreateCaseMembershipMutation,
  useUpdateCaseMembershipMutation,
  useDeleteCaseMembershipMutation,
} = caseMembershipApiSlice;
