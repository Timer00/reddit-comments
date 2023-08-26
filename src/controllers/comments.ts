import { nextApiRequest } from "~/utils";
import { type Tables } from "~/lib/schema";
import { type NewComment } from "~/types/comments";
import { type ApiResponse } from "~/types";

export const getThreads: () => Promise<Tables<'comments'>[]> = async () => {
  return await nextApiRequest('get-threads');
};

export const submitComment: (newComment: NewComment)=> Promise<ApiResponse> = async (newComment: NewComment) => {
  return await nextApiRequest('submit-comment', 'POST', newComment);
}
