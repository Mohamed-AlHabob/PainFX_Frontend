"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createUpdatePostSchema } from "@/schemas";
import { useCreatePostMutation } from "@/redux/features-slices/booking/PostApiSlice";

export const useCreateDocterPost = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(createUpdatePostSchema),
  });

  const [createPost, { isLoading }] = useCreatePostMutation();

  // Rich-text content states
  const [onDescription, setOnDescription] = useState("");
  const [onHtmlDescription, setOnHtmlDescription] = useState("");
  const [onJsonDescription, setJsonDescription] = useState("");

  const onCreatePost = handleSubmit(async (values) => {
    try {
      toast.promise(
        createPost({
          ...values,
          content: onDescription,
          html_content: onHtmlDescription,
          json_content: onJsonDescription,
        }).unwrap(),
        {
          loading: "Creating post...",
          success: "Post created successfully!",
          error: (error) => error?.data?.detail || "Failed to create post.",
        }
      );
      reset();
      setOnDescription("");
      setOnHtmlDescription("");
      setJsonDescription("");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the post.");
    }
  });

  return {
    onCreatePost,
    isPending: isLoading,
    register,
    errors,
    onDescription,
    setOnDescription,
    onHtmlDescription,
    setOnHtmlDescription,
    onJsonDescription,
    setJsonDescription,
  };
};
