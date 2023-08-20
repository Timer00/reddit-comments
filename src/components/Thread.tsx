import { Comment } from "~/components/Comment";
import { type CommentThread, type NewComment } from "~/types/comments";
import React, { useState } from "react";
import { CommentForm } from "~/components/CommentForm";
import { Chat } from "~/assets/icons/Chat";

export interface ThreadProps extends CommentThread {
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
    <div className={`${nestLevel > 0 && 'pl-2 pt-2 ml-8 border-l-2 border-gray-300'}`}>
      <Comment author={author} content={text} />
      <div className='flex gap-2 mt-1'>
        <button onClick={() => setShowReply(!showReply)} className='flex gap-1 hover:bg-black hover:text-white border-2 rounded-2xl p-1'>
          {showReply ? 'Cancel' : 'Reply'}
          <Chat className={`w-6 h-6 ${showReply && 'text-red-400'}`} />
        </button>
      </div>

      {showReply && <CommentForm onSubmit={onSubmit}/>}

      {children?.map(child =>
        <Thread key={child.id} {...child} nestLevel={nestLevel + 1} onSubmitReply={onSubmitReply} />)}
    </div>
  )
}
