import { type NextApiRequest, type NextApiResponse } from "next";
import { supabase } from "~/lib/supabase";
import { mapCommentsToThreads } from "~/mappers/comments";
import { type Tables } from "~/lib/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')

  if (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch comments' });
    throw Error;
  }

  if (!comments) {
    res.status(404).json({ error: 'No comments found' });
    return;
  }

  const threads = mapCommentsToThreads(comments as Tables<'comments'>[]);

  res.status(200).json(threads);
}
