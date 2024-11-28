"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractErrorMessage } from "../error-handling";
import { useRouter } from "next/navigation";
import { useCreateDocumentMutation, useDeleteDocumentMutation } from "@/redux/features-slices/DocumentApiSlice";
import { createUpdateDocumentSchema } from "@/schemas/Document";


export const useCreateDocument = () => {
  const router = useRouter();

  type CreateDocumentFormValues = z.infer<typeof createUpdateDocumentSchema>;

  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateDocumentFormValues>({
    resolver: zodResolver(createUpdateDocumentSchema),
  });

  const [createDocument, { isLoading }] = useCreateDocumentMutation();

  const onCreateDocument = handleSubmit(async (values ) => {
    try {
      toast.promise(
        createDocument(values).unwrap(),
        {
          loading: "Creating document...",
          success: (response) => {
            reset();
            router.push(`/documents/${response.id}`);
            return "Document created successfully!";
          },
          error: (error) => {
            const errorMessage = extractErrorMessage(error);
            return errorMessage;
          },
        }
      );
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage);
    }
  });

  return {
    onCreateDocument,
    isPending: isLoading,
    register,
    errors,
  };
};


export const useDeleteDocument = () => {
    const [deleteDocument] = useDeleteDocumentMutation();
  
    const onDeleteDocument = async (documentId: number) => {
      try {
        await toast.promise(deleteDocument(documentId).unwrap(), {
          loading: "Deleting document...",
          success: () => "Document deleted successfully!",
          error: (error) => {
            const errorMessage = extractErrorMessage(error);
            return errorMessage;
          },
        });
      } catch (error) {
        const errorMessage = extractErrorMessage(error);
        toast.error(errorMessage);
      }
    };
  
    return { onDeleteDocument };
  };