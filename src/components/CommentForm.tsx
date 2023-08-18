import React, { useState } from "react";
import { type NewComment } from "~/types/comments";
import { SubmitButton } from "~/components/SubmitButton";

interface CommentFormProps {
  user: string
  onSubmit: (newComment: NewComment) => void
}

export const CommentForm = ({ user, onSubmit }: CommentFormProps) => {
  const [content, setContent] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ author: user, text: content });
    setContent('');
  }

  return (
    <form onSubmit={submit} className='w-full'>
      <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
        Commenting as {user}:
      </label>
      <div className="border-gray-200 border-2 rounded">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="p-4 block w-full placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder='Add your comment...'
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className='bg-gray-200 flex flex-row'>
          <SubmitButton disabled={!content}>Reply</SubmitButton>
        </div>
      </div>
    </form>
  )
}

