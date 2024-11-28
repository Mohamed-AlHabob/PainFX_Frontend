
import { createUpdateInvoiceSchema, invoiceListSchema } from '@/features/Invoice/schema';
import { apiSlice } from '../services/apiSlice';

// API slice for Invoices
export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => 'invoices/',
      transformResponse: (response) => {
        try {
          invoiceListSchema.parse(response);
          return response;
        } catch (error) {
          console.error('Validation error:', error);
          throw error;
        }
      },
    }),
    createInvoice: builder.mutation({
      query: (invoiceData) => ({
        url: 'invoices/',
        method: 'POST',
        body: invoiceData,
      }),
      onQueryStarted: async (request, { queryFulfilled }) => {
        try {
          createUpdateInvoiceSchema.parse(request);
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    updateInvoice: builder.mutation({
      query: ({ invoiceId, ...invoiceData }) => ({
        url: `invoices/${invoiceId}/`,
        method: 'PATCH',
        body: invoiceData,
      }),
      onQueryStarted: async (request, { queryFulfilled }) => {
        try {
          createUpdateInvoiceSchema.parse(request);
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    deleteInvoice: builder.mutation({
      query: (invoiceId) => ({
        url: `invoices/${invoiceId}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApiSlice;
