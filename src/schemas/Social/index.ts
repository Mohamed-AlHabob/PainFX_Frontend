// src/schemas/post.ts

import { z } from 'zod';
import { doctorSchema } from '../Doctor';
import { userProfileSchema } from '../user-profile';


export const PostTypeEnum = z.enum(['text', 'video']);

export const postSchema = z.object({
  id: z.string().uuid().optional(),
  doctor: doctorSchema.optional(),
  content: z.string().min(1, 'Content is required').optional(),
  type: PostTypeEnum.optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const postListSchema = z.array(postSchema);

export type Post = z.infer<typeof postSchema>;


export const postListResponseSchema = z.object({
  data: postListSchema,
  meta: z.object({
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
  }),
});

export const createUpdatePostSchema = z.object({
  content: z.string(),
  type: PostTypeEnum,
});
export type createUpdatePost = z.infer<typeof createUpdatePostSchema>;

export const videoSchema = z.object({
  id: z.string().uuid(),
  post: postSchema,
  videoUrl: z.string().url(),
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
  id: z.string().uuid(),
  post: postSchema,
  user: userProfileSchema,
  commentText: z.string().min(1, 'Comment text is required'),
  parentCommentId: z.string().uuid().optional(),
  createdAt: z.string().datetime(),
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
  post: postSchema,
  user: userProfileSchema,
  createdAt: z.string().datetime(),
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