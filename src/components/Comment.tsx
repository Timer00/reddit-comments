export interface CommentProps {
  author: string
  content: string
}

export const Comment = ({author, content}: CommentProps) =>
  <div>
    <div className='font-bold'>{author}</div>
    <p>{content}</p>
  </div>
