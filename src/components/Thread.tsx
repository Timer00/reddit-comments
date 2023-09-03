import { Comment } from "~/components/Comment";
import { type CommentThread, type NewComment } from "~/types/comments";
import React, { useState } from "react";
import { CommentForm } from "~/components/CommentForm";
import { Chat } from "~/assets/icons/Chat";
import { X } from "~/assets/icons/X";

export interface ThreadProps extends CommentThread {
  onSubmitReply: (newComment: NewComment) => void
  alternateColor: boolean;
  nestLevel?: number
}

// TODO: render only a limited amount of threads at a time to prevent long loading times and performance issues

export const Thread = ({ id, author, text, children, nestLevel = 0, onSubmitReply, alternateColor }: ThreadProps) => {
  const [showReplyForm, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const onSubmit = ({ author, text }: NewComment) => {
    onSubmitReply({ author, text, parentId: id });
    setShowReply(false);
  }

  const handleToggleReplies = (e: React.MouseEvent) => {
    if (children?.length === 0) return;

    if (e.target !== e.currentTarget) return;

    setShowReplies(!showReplies);
  };

  const onReply = () => {
    setShowReply(!showReplyForm)
  }

  return (
    <div
      onClick={handleToggleReplies}
      className={`thread p-2 pl-4 m-2 my-4 rounded border-l-4 border-mid-gray hover:border-deep-gray overflow-x-auto min-w-[130px]
      ${children?.length === 0 && '!cursor-default'}
      ${alternateColor ? 'bg-secondary' : 'bg-pale-gray'} 
      ${nestLevel > 0 ? 'pl-2 pt-2 ml-8 w-fit' : ''}`}>
      <Comment author={author} content={text} className='max-w-[80vw]' />
      <div className='flex gap-2 mt-2'>
        <button onClick={onReply}
                className='text-xs flex gap-1 hover:bg-primary hover:text-secondary border-2 rounded-2xl p-1 px-2'>
          {showReplyForm ?
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

      {showReplyForm && <CommentForm onSubmit={onSubmit} reply />}

      {showReplies ?
        children?.map(child =>
          <Thread key={child.id} {...child} nestLevel={nestLevel + 1} onSubmitReply={onSubmitReply}
                  alternateColor={!alternateColor} />)
        :
        "..."
      }
    </div>
  )
}
