import React, { useState } from "react";

interface CommentFormProps {
  user: string
  onSubmit: (user: string, content: string) => void
}

export const CommentForm = ({ user, onSubmit }: CommentFormProps) => {
  const [content, setContent] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user, content);
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
          <button disabled={!content}
                  className='disabled:opacity-50 disabled:cursor-not-allowed m-1 bg-white rounded text-xs px-2 font-bold'>
            Comment
          </button>
        </div>
      </div>
    </form>
  )
}

