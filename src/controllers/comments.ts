import { nextApiRequest } from "~/utils";
import { type CommentThread, type NewComment } from "~/types/comments";
import { type ApiResponse } from "~/types";

export const getThreads: () => Promise<CommentThread[]> = async () => {
  return await nextApiRequest('get-threads');
};

export const submitComment: (newComment: NewComment)=> Promise<ApiResponse> = async (newComment: NewComment) => {
  return await nextApiRequest('submit-comment', 'POST', newComment);
}
