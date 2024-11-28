"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCreateCaseRequestMutation, useDeleteCaseRequestMutation, useUpdateCaseRequestMutation } from "@/redux/features-slices/CaseRequestApiSlice";
import { extractErrorMessage } from "@/hooks/error-handling";
import { createUpdateCaseRequestSchema } from "@/schemas/Case";

export const useCreateCaseRequest = () => {
  const router = useRouter();

  type CreateCaseRequestFormValues = z.infer<typeof createUpdateCaseRequestSchema>;

  const {
    reset,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateCaseRequestFormValues>({
    resolver: zodResolver(createUpdateCaseRequestSchema),
  });

  const [createCaseRequest, { isLoading }] = useCreateCaseRequestMutation();

  const onCreateCaseRequest = handleSubmit(async (values) => {
    try {
      toast.promise(
        createCaseRequest(values).unwrap(),
        {
          loading: "Creating case request... ",
          success: (response) => {
            reset();
            router.push(`/case-requests/${response.id}`);
            return "Case request created successfully!";
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
    onCreateCaseRequest,
    isPending: isLoading,
    register,
    errors,
  };
};

export const useDeleteCaseRequest = () => {
    const [deleteCaseRequest] = useDeleteCaseRequestMutation();
  
    const onDeleteCaseRequest = async (caseRequestId: string) => {
      try {
        await deleteCaseRequest(caseRequestId).unwrap();
        toast.success("Case request deleted successfully!");
      } catch (error) {
        const errorMessage = extractErrorMessage(error);
        toast.error(errorMessage);
      }
    };
  
    return {
      onDeleteCaseRequest,
    };
  };

  export const useUpdateCaseRequest = (caseRequestId: string) => {
    const {
      reset,
      handleSubmit,
      formState: { errors },
      register,
    } = useForm({
      resolver: zodResolver(createUpdateCaseRequestSchema),
    });
  
    const [updateCaseRequest, { isLoading }] = useUpdateCaseRequestMutation();
  
    const onUpdateCaseRequest = handleSubmit(async (values) => {
      try {
        await updateCaseRequest({ caseRequestId, ...values }).unwrap();
        reset();
        toast.success("Case request updated successfully!");
      } catch (error) {
        const errorMessage = extractErrorMessage(error);
        toast.error(errorMessage);
      }
    });
  
    return {
      onUpdateCaseRequest,
      isPending: isLoading,
      register,
      errors,
    };
  };