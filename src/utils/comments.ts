import { type CommentThread, type NewComment } from "~/types/comments";

export function addNestedComment(threads: CommentThread[], newComment: CommentThread): CommentThread[] {
  return threads.map(comment => {
    // If the comment ID matches the parentId of the new comment
    if (comment.id === newComment.parentId) {
      // Append the new comment to the children and return the comment with its updated children
      const updatedChildren = comment.children ? [...comment.children, newComment] : [newComment];
      return { ...comment, children: updatedChildren };
    }

    // If the comment has children, search within them
    if (comment.children) {
      return { ...comment, children: addNestedComment(comment.children, newComment) };
    }

    // Return the comment as is if no match is found
    return comment;
  });
}
