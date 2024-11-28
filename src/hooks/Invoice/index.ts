"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractErrorMessage } from "../error-handling";
import { useRouter } from "next/navigation";
import { useCreateInvoiceMutation, useDeleteInvoiceMutation, useUpdateInvoiceMutation } from "@/redux/features-slices/InvoiceApiSlice";
import { createUpdateInvoiceSchema } from "@/schemas/Invoice";

export const useCreateInvoice = () => {
  const router = useRouter();

  type CreateInvoiceFormValues = z.infer<typeof createUpdateInvoiceSchema>;

  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateInvoiceFormValues>({
    resolver: zodResolver(createUpdateInvoiceSchema),
  });

  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  const onCreateInvoice = handleSubmit(async (values) => {
    try {
      toast.promise(
        createInvoice(values).unwrap(),
        {
          loading: "Creating invoice...",
          success: (response) => {
            reset();
            router.push(`/invoices/${response.id}`);
            return "Invoice created successfully!";
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
    onCreateInvoice,
    isPending: isLoading,
    register,
    errors,
  };
};


export const useDeleteInvoice = () => {
    const [deleteInvoice] = useDeleteInvoiceMutation();
  
    const onDeleteInvoice = async (invoiceId: number) => {
      try {
        await toast.promise(deleteInvoice(invoiceId).unwrap(), {
          loading: "Deleting invoice...",
          success: () => "Invoice deleted successfully!",
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
  
    return { onDeleteInvoice };
  };

  export const useUpdateInvoice = (invoiceId: number) => {
    type UpdateInvoiceFormValues = z.infer<typeof createUpdateInvoiceSchema>;
  
    const {
      reset,
      handleSubmit,
      formState: { errors },
      register,
    } = useForm<UpdateInvoiceFormValues>({
      resolver: zodResolver(createUpdateInvoiceSchema),
    });
  
    const [updateInvoice, { isLoading }] = useUpdateInvoiceMutation();
  
    const onUpdateInvoice = handleSubmit(async (values) => {
      try {
        await toast.promise(
          updateInvoice({ id: invoiceId, ...values }).unwrap(),
          {
            loading: "Updating invoice...",
            success: () => {
              reset();
              return "Invoice updated successfully!";
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
      onUpdateInvoice,
      isPending: isLoading,
      register,
      errors,
    };
  };