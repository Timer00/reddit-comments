import { Comment } from "~/components/Comment";

export interface CommentThree {
  id: number;
  author: string;
  text: string;

  children?: CommentThree[]
}

// TODO: render only a limited amount of threads at a time to prevent long loading times and performance issues

export const Thread = (props: CommentThree) => {
  const { author, text, children } = props;

  return (
    <div className='ml-8 pl-1 border-l-2'>
      <Comment author={author} content={text} />
      {children?.map(child => <Thread key={child.id} {...child} />)}
    </div>
  )
}
