interface CommentForm {
  user: string
}

export const CommentForm = ({ user }: CommentForm) =>
  <div className='w-full'>
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
        />
      <div className='bg-gray-200 flex flex-row'>
        <button className='m-1 bg-white rounded text-xs px-2'>Comment</button>
      </div>
    </div>
  </div>
