import { Comment } from "~/components/Comment";
import { type CommentThree, type NewComment } from "~/types/comments";
import React, { useState } from "react";
import { CommentForm } from "~/components/CommentForm";

export interface ThreadProps extends CommentThree {
  nestLevel?: number
  onSubmitReply: (newComment: NewComment) => void
}

// TODO: render only a limited amount of threads at a time to prevent long loading times and performance issues

export const Thread = ({ id, author, text, children, nestLevel = 0, onSubmitReply }: ThreadProps) => {
  const [showReply, setShowReply] = useState(false);

  const onSubmit = ({ author, text }: NewComment) => {
    onSubmitReply({ author, text, parentId: id });
    setShowReply(false);
  }

  return (
    <div className={`${nestLevel > 0 && 'pl-1 ml-8 border-l-2'}`}>
      <Comment author={author} content={text} />
      <div className='flex gap-2'>
        <button>up</button>
        <div>{nestLevel}</div>
        <button>down</button>
        {/* These are placeholders for vote logic */}

        <button onClick={() => setShowReply(!showReply)} className='border-2 rounded-2xl p-1'>{showReply ? 'Cancel' : 'Reply'}</button>
      </div>

      {showReply && <CommentForm user={'Timer00'} onSubmit={onSubmit}/>}

      {children?.map(child =>
        <Thread key={child.id} {...child} nestLevel={nestLevel + 1} onSubmitReply={onSubmitReply} />)}
    </div>
  )
}
