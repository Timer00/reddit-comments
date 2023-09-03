export interface CommentProps {
  author: string
  content: string
  className?: string
}

export const Comment = ({author, content, className}: CommentProps) =>
  <div className={className}>
    <div className='font-bold'>{author}</div>
    <p>{content}</p>
  </div>
