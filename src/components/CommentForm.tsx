import React, { useState } from "react";
import { type NewComment } from "~/types/comments";
import { SubmitButton } from "~/components/SubmitButton";
import { useUser } from "~/hooks/useUser";

interface CommentFormProps {
  onSubmit: (newComment: NewComment) => void
}

export const CommentForm = ({ onSubmit}: CommentFormProps) => {
  const [content, setContent] = useState("");
  const { user, setUser } = useUser();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ author: user, text: content });
    setContent('');
  }

  return (
    <form onSubmit={submit} className='w-full p-1 pt-3'>
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
        Commenting as
        <span contentEditable className='ml-1'
              onClick={()=>setUser('')}
              onBlur={(e) => setUser(e.target.textContent ?? '')}>
          {user}
        </span>:
      </label>
      <div className="border-gray-200 border-2 rounded">
        <textarea
          rows={4}
          name="comment"
          className="p-4 block w-full placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder='Add your comment...'
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className='bg-gray-200 flex flex-row items-center'>
          <SubmitButton disabled={!content || !user}>Reply</SubmitButton>
        </div>
      </div>
    </form>
  )
}

