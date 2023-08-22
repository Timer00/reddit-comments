import { util } from "zod";
import Omit = util.Omit;

export interface CommentThread {
  id: number;
  author: string;
  text: string;

  parentId?: number
  children?: CommentThread[]
}

export interface NewComment extends Omit<CommentThread, 'id'> {
  id?: number
}
//Todo: adapt typing of NewComment to reflect current usage
