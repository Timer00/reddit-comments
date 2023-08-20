import { Comment } from "~/components/Comment";
import { type CommentThread, type NewComment } from "~/types/comments";
import React, { useState } from "react";
import { CommentForm } from "~/components/CommentForm";
import { Chat } from "~/assets/icons/Chat";
import { X } from "~/assets/icons/X";

export interface ThreadProps extends CommentThread {
  nestLevel?: number
  onSubmitReply: (newComment: NewComment) => void
  alternateColor: boolean;
}

// TODO: render only a limited amount of threads at a time to prevent long loading times and performance issues

export const Thread = ({ id, author, text, children, nestLevel = 0, onSubmitReply, alternateColor }: ThreadProps) => {
  const [showReply, setShowReply] = useState(false);

  const onSubmit = ({ author, text }: NewComment) => {
    onSubmitReply({ author, text, parentId: id });
    setShowReply(false);
  }

  return (
    <div
      className={`p-2 pl-4 m-2 my-4 rounded border-l-4 border-gray-300 ${alternateColor ? 'bg-white' : 'bg-gray-100'} ${nestLevel > 0 && 'pl-2 pt-2 ml-8 '}`}>
      <Comment author={author} content={text} />
      <div className='flex gap-2 mt-2'>
        <button onClick={() => setShowReply(!showReply)}
                className='text-xs flex gap-1 hover:bg-black hover:text-white border-2 rounded-2xl p-1 px-2'>
          {showReply ?
            <>
              Cancel
              <X className={`w-4 h-4 text-red-400`} />
            </>
            :
            <>
              Reply
              <Chat className={`w-4 h-4`} />
            </>
          }
        </button>
      </div>

      {showReply && <CommentForm onSubmit={onSubmit} />}

      {children?.map(child =>
        <Thread key={child.id} {...child} nestLevel={nestLevel + 1} onSubmitReply={onSubmitReply}
                alternateColor={!alternateColor} />)}
    </div>
  )
}
