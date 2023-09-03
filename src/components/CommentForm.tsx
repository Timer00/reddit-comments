import React, { useState } from "react";
import { type NewComment } from "~/types/comments";
import { SubmitButton } from "~/components/SubmitButton";
import { useUser } from "~/hooks/useUser";

interface CommentFormProps {
  onSubmit: (newComment: NewComment) => void
  reply?: boolean
}

export const CommentForm = ({ onSubmit, reply = false }: CommentFormProps) => {
  const [content, setContent] = useState("");
  const { user, setUser } = useUser();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ author: user, text: content });
    setContent('');
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Check for Enter key without Shift key
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default newline
      submit(event);
    }
  };

  return (
    <form onSubmit={submit} className='w-full p-1 pt-3'>
      <label className="block text-sm font-medium leading-6 text-deep-gray mb-1 dark:font-bold">
        Commenting as
        <span contentEditable className='ml-1 cursor-pointer'
              onClick={()=>setUser('')}
              onBlur={(e) => setUser(e.target.textContent ?? '')}>
          {user}
        </span>:
      </label>
      <div className="border-light-gray border-2 rounded">
        <textarea
          rows={4}
          name="comment"
          className="p-4 block w-full placeholder:text-dark-gray sm:text-sm sm:leading-6 bg-secondary"
          placeholder='Add your comment...'
          value={content}
          onKeyDown={handleKeyDown}
          onChange={e => setContent(e.target.value)}
        />
        <div className='bg-light-gray flex flex-row items-center cursor-default'>
          <SubmitButton disabled={!content || !user}>{ reply ? 'Reply' : 'Comment'}</SubmitButton>
        </div>
      </div>
    </form>
  )
}

