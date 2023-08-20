import Head from "next/head";
import React, { useState } from "react";
import { Thread } from "~/components/Thread";
import { CommentForm } from "~/components/CommentForm";
import commentThreads from "~/assets/mockData.json";
import { type CommentThread, type NewComment } from "~/types/comments";
import { addNestedComment } from "~/utils/comments";

export default function Home() {
  const [threads, setThreads] = useState(commentThreads as CommentThread[]);
  const [lastId, setLastId] = useState(19);

  //TODO: find a better way to fetch the initial lastId, it should come from somewhere not be set manually

  const submitRootComment = ({ author, text }: NewComment) => {
    addNewCommentToThread({ author, text, id: lastId + 1 });
  }

  const submitNestedComment = ({ author, text, parentId }: NewComment) => {
    addNewCommentToThread({ author, text, parentId, id: lastId + 1 });
  }

  const addNewCommentToThread = (newCommentWithId: CommentThread) => {
    if (!newCommentWithId.parentId)
      setThreads([...threads, newCommentWithId]);
    else
      setThreads(addNestedComment(threads, newCommentWithId));
    setLastId(lastId + 1);
  }

  return (
    <>
      <Head>
        <title>Reddit comments for Inkitt</title>
        <meta name="description" content="Reddit comments for Inkitt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen  flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className='thread'>
            <CommentForm onSubmit={submitRootComment} />

            <hr className='py-5' />

            {threads.map(props => <Thread key={props.id} onSubmitReply={submitNestedComment} {...props} />)}
          </div>
        </div>
      </main>
    </>
  );
}
