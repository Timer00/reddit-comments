export interface CommentThree {
  id: number;
  author: string;
  text: string;

  children?: CommentThree[]
}

export interface NewComment extends CommentThree {
  parentId?: number
}
