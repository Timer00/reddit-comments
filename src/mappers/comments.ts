import { type Tables } from "~/lib/schema";
import { type CommentThree } from "~/types/comments";

export const mapCommentsToThreads = (comments: Tables<'comments'>[]): CommentThree[] => {

  const findChildren = (parentId: number): CommentThree[] => {
    return comments
      .filter(comment => comment.parent_id === parentId)
      .map(comment => mapComment(comment, parentId));
  };

  const mapComment = (comment: Tables<'comments'>, parentId?: number): CommentThree => {
    return {
      id: comment.id,
      author: comment.author,
      text: comment.text,
      parentId: (parentId ?? comment.parent_id) ?? undefined, // If parent_id is null, then we set it as undefined in CommentThree
      children: findChildren(comment.id)
    };
  };

  return comments
    .filter(comment => comment.parent_id === null)
    .map(comment => mapComment(comment));
};
