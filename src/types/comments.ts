import { util } from "zod";
import Omit = util.Omit;

export interface CommentThree {
  id: number;
  author: string;
  text: string;

  parentId?: number
  children?: CommentThree[]
}

export interface NewComment extends Omit<CommentThree, 'id'> {
  id?: number
}
