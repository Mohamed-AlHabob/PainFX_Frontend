
import { createUpdateDocumentSchema, documentListSchema } from '@/schemas/Document';
import { apiSlice } from '../services/apiSlice';

// API slice for Documents
export const documentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: () => 'documents/',
      transformResponse: (response) => {
        try {
          documentListSchema.parse(response);
          return response;
        } catch (error) {
          console.error('Validation error:', error);
          throw error;
        }
      },
    }),
    createDocument: builder.mutation({
      query: (documentData) => {
        const formData = new FormData();
        Object.entries(documentData).forEach(([key, value]) => {
          formData.append(key, value as Blob | string);
        });
        return {
          url: 'documents/',
          method: 'POST',
          body: formData,
        };
      },
      onQueryStarted: async (request, { queryFulfilled }) => {
        try {
          createUpdateDocumentSchema.parse(request);
          await queryFulfilled;
        } catch (error) {
          console.error('Validation or query error:', error);
          throw error;
        }
      },
    }),
    deleteDocument: builder.mutation({
      query: (documentId) => ({
        url: `documents/${documentId}/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDocumentsQuery,
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
} = documentApiSlice;
