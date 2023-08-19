import { type NextApiRequest, type NextApiResponse } from "next";
import { supabase } from "~/lib/supabase";
import { type NewComment } from "~/types/comments";
import { type Tables } from "~/lib/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { author, text, parentId = null  } = req.body as NewComment;

  const newComment: Omit<Tables<'comments'>, 'id'> = {author, text, parent_id: parentId}
  // The id will be defined by supabase

  const { error } = await supabase
    .from('comments')
    .insert(newComment)

  if (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit comment' });
    throw Error;
  }

  res.status(200).json({ success: true });
}
