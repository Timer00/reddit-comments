export interface Comment {
  author: string
  content: string
}

export const Comment = ({author, content}: Comment) =>
  <div>
    <div className='font-bold'>{author}</div>
    <p>{content}</p>
  </div>
