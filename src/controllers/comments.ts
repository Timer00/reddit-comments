import { nextApiRequest } from "~/utils";
import { type Tables } from "~/lib/schema";

export const getThreads: () => Promise<Tables<'comments'>[]> = async () => {
  return await nextApiRequest('get-threads');
};
