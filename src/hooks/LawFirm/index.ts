"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractErrorMessage } from "../error-handling";
import { useRouter } from "next/navigation";
import { createUpdateLawFirmSchema } from "@/features/LawFirm/schema";
import { useCreateLawFirmMutation, useDeleteLawFirmMutation, useUpdateLawFirmMutation } from "@/redux/features-slices/LawFirmApiSlice";


export const useCreateLawFirm = () => {
  const router = useRouter();

  type CreateLawFirmFormValues = z.infer<typeof createUpdateLawFirmSchema>;

  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateLawFirmFormValues>({
    resolver: zodResolver(createUpdateLawFirmSchema),
  });

  const [createLawFirm, { isLoading }] = useCreateLawFirmMutation();

  const onCreateLawFirm = handleSubmit(async (values) => {
    try {
      toast.promise(
        createLawFirm(values).unwrap(),
        {
          loading: "Creating law firm...",
          success: (response) => {
            reset();
            router.push(`/lawfirms/${response.id}`);
            return "Law firm created successfully!";
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
    onCreateLawFirm,
    isPending: isLoading,
    register,
    errors,
  };
};


export const useDeleteLawFirm = () => {
    const [deleteLawFirm] = useDeleteLawFirmMutation();
  
    const onDeleteLawFirm = async (lawFirmId: number) => {
      try {
        await toast.promise(deleteLawFirm(lawFirmId).unwrap(), {
          loading: "Deleting law firm...",
          success: () => "Law firm deleted successfully!",
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
  
    return { onDeleteLawFirm };
  };

  export const useUpdateLawFirm = (lawFirmId: number) => {
    type UpdateLawFirmFormValues = z.infer<typeof createUpdateLawFirmSchema>;
  
    const {
      reset,
      handleSubmit,
      formState: { errors },
      register,
    } = useForm<UpdateLawFirmFormValues>({
      resolver: zodResolver(createUpdateLawFirmSchema),
    });
  
    const [updateLawFirm, { isLoading }] = useUpdateLawFirmMutation();
  
    const onUpdateLawFirm = handleSubmit(async (values) => {
      try {
        await toast.promise(
          updateLawFirm({ id: lawFirmId, ...values }).unwrap(),
          {
            loading: "Updating law firm...",
            success: () => {
              reset();
              return "Law firm updated successfully!";
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
      onUpdateLawFirm,
      isPending: isLoading,
      register,
      errors,
    };
  };