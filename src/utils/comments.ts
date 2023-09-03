import { type CommentThread } from "~/types/comments";

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

export function isDuplicateComment(threads: CommentThread[], newComment: CommentThread): boolean {
  for (const comment of threads) {
    // If both comment IDs match
    if (comment.id === newComment.id) {
      return true;
    }

    // If the comment has children, search within them
    if (comment.children) {
      return isDuplicateComment(comment.children, newComment)
    }
  }
  // Return the false if no match is found
  return false;
}

export function threadLayerDeepness(children: CommentThread[], count = 0) {
  if (children.length === 0)
    return count

  count += 1;
  for (const c of children){
    const layersDeep = threadLayerDeepness(c.children, count);
    if (layersDeep > count) count = layersDeep
  }

  return count;
}
