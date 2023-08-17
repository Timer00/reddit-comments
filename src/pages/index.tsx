import Head from "next/head";
import { useState } from "react";
import { Thread } from "~/components/Thread";
import { CommentForm } from "~/components/CommentForm";
import commentThrees from "~/assets/mockData.json";
import { type CommentThree, type NewComment } from "~/types/comments";
import { addNestedComment } from "~/utils/comments";

export default function Home() {
  const [threads, setThreads] = useState(commentThrees as CommentThree[]);
  const [lastId, setLastId] = useState(19);
  //TODO: find a better way to fetch the initial lastId, it should come from somewhere not be set manually

  const submitNewComment = (user: string, content: string) => {
    addNewCommentToThree({ author: user, text: content, id: lastId + 1 });
    setLastId(lastId + 1);
  }

  const addNewCommentToThree = (newComment: NewComment) => {
    if (!newComment.parentId)
      setThreads([...threads, newComment]);
    else
      setThreads(addNestedComment(threads, newComment));
  }

  return (
    <>
      <Head>
        <title>Reddit comments for Inkitt</title>
        <meta name="description" content="Reddit comments for Inkitt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className='thread'>
            <CommentForm onSubmit={submitNewComment} user='Timer00' />

            <hr className='py-5' />

            {threads.map(props => <Thread key={props.id} {...props} />)}
          </div>
        </div>
      </main>
    </>
  );
}
