"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractErrorMessage } from "../error-handling";
import { useRouter } from "next/navigation";

import { useCreateCaseMutation, useDeleteCaseMutation, useUpdateCaseMutation } from "@/redux/features-slices/CasesApiSlice";
import { createUpdateCaseSchema } from "@/schemas/Case";

export const useCreateCase = () => {
  const router = useRouter();

  type CreateCaseFormValues = z.infer<typeof createUpdateCaseSchema>;

  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateCaseFormValues>({
    resolver: zodResolver(createUpdateCaseSchema),
  });

  const [createCase, { isLoading }] = useCreateCaseMutation();

  const onCreateCase = handleSubmit(async (values) => {
    try {
      toast.promise(
        createCase(values).unwrap(),
        {
          loading: "Creating case... ",
          success: (response) => {
            reset();
            router.push(`/cases/${response.id}`);
            return "Case created successfully!";
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
    onCreateCase,
    isPending: isLoading,
    register,
    errors,
  };
};


export const useDeleteCase = () => {
    const [deleteCase] = useDeleteCaseMutation();
  
    const onDeleteCase = async (caseId: string) => {
      try {
        await deleteCase(caseId).unwrap();
        toast.success("Case deleted successfully!");
      } catch (error) {
        const errorMessage = extractErrorMessage(error);
        toast.error(errorMessage);
      }
    };
  
    return {
      onDeleteCase,
    };
  };

  export const useUpdateCase = (caseId: string) => {
    const {
      reset,
      handleSubmit,
      formState: { errors },
      register,
    } = useForm({
      resolver: zodResolver(createUpdateCaseSchema),
    });
  
    const [updateCase, { isLoading }] = useUpdateCaseMutation();
  
    const onUpdateCase = handleSubmit(async (values) => {
      try {
        await updateCase({ caseId, ...values }).unwrap();
        reset();
        toast.success("Case updated successfully!");
      } catch (error) {
        const errorMessage = extractErrorMessage(error);
        toast.error(errorMessage);
      }
    });
  
    return {
      onUpdateCase,
      isPending: isLoading,
      register,
      errors,
    };
  };