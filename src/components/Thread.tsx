import { Comment } from "~/components/Comment";
import { type CommentThree } from "~/pages";

export interface ThreadProps extends CommentThree {
  nestLevel?: number;
}

// TODO: render only a limited amount of threads at a time to prevent long loading times and performance issues

export const Thread = ({ author, text, children, nestLevel = 0 }: ThreadProps) => {

  return (
    <div className={`${nestLevel > 0 && 'pl-1 ml-8 border-l-2'}`}>
      <Comment author={author} content={text} />
      {children?.map(child => <Thread key={child.id} {...child} nestLevel={nestLevel + 1} />)}
    </div>
  )
}
