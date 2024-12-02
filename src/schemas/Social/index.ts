// src/schemas/post.ts

import { z } from 'zod';
import { doctorSchema } from '../Doctor';
import { userProfileSchema } from '../user-profile';
import { title } from 'process';



export const postSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().optional(),
  doctor: doctorSchema.optional(),
  content: z.string().optional(),
  html_content: z.string().optional(),
  json_content: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const postListSchema = z.array(postSchema);

export type Post = z.infer<typeof postSchema>;


export const postListResponseSchema = z.object({
  results: z.array(postSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
  }).optional(),
});


export const createUpdatePostSchema = z.object({
  content: z.string(),
});
export type createUpdatePost = z.infer<typeof createUpdatePostSchema>;

export const videoSchema = z.object({
  post: postSchema.optional(),
  videoUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
});

export const videoListSchema = z.array(videoSchema);

export type Video = z.infer<typeof videoSchema>;

export const createUpdateVideoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  videoUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
});
export type createUpdateVideo = z.infer<typeof createUpdateVideoSchema>;


export const commentSchema = z.object({
  post: postSchema.optional(),
  user: userProfileSchema.optional(),
  commentText: z.string().optional(),
  parentCommentId: z.string().uuid().optional(),
  createdAt: z.string().datetime().optional(),
});

export const commentListSchema = z.array(commentSchema);

export type Comment = z.infer<typeof commentSchema>;


export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

export const categoryListSchema = z.array(categorySchema);

export type Category = z.infer<typeof categorySchema>;



export const createUpdateCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});
export type createUpdateCategory = z.infer<typeof createUpdateCategorySchema>;

export const likeSchema = z.object({
  id: z.string().uuid(),
  post: z.string().optional(),
  user: z.number().optional(),
  createdAt: z.string().datetime().optional(),
});

export const likeListSchema = z.array(likeSchema);

export type Like = z.infer<typeof likeSchema>;


export const createUpdateLikeSchema = z.object({
  postId: z.string().uuid(),
});
export type createUpdateLike = z.infer<typeof createUpdateLikeSchema>;

export const createUpdateCommentSchema = z.object({
  postId: z.string().uuid(),
  commentText: z.string(),
  parentCommentId: z.string().uuid().nullable().optional(),
});

export type createUpdateComment = z.infer<typeof createUpdateCommentSchema>;