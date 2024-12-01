import { apiSlice } from "@/redux/services/apiSlice";
import { clinicSchema, createUpdateClinicSchema } from "@/schemas/Clinic";


export const clinicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClinics: builder.query({
      query: () => 'clinics/',
      transformResponse: (response) => {
        clinicSchema.parse(response);
        return response;
      },
    }),
    createClinic: builder.mutation({
      query: (data) => ({
        url: 'clinics/',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(data, { queryFulfilled }) {
        createUpdateClinicSchema.parse(data);
        await queryFulfilled;
      },
    }),
    updateClinic: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `clinics/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ id, ...data }, { queryFulfilled }) {
        createUpdateClinicSchema.parse(data);
        await queryFulfilled;
      },
    }),
    deleteClinic: builder.mutation({
      query: (id) => ({
        url: `clinics/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetClinicsQuery,
  useCreateClinicMutation,
  useUpdateClinicMutation,
  useDeleteClinicMutation,
} = clinicApiSlice;
