import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Thread } from "~/components/Thread";
import { CommentForm } from "~/components/CommentForm";
import { type CommentThree, type NewComment } from "~/types/comments";
import { addNestedComment } from "~/utils/comments";
import { getThreads } from "~/controllers/comments";

export default function Home() {
  const [threads, setThreads] = useState<CommentThree[]>([]);
  const [lastId, setLastId] = useState(19);
  //TODO: find a better way to fetch the initial lastId, it should come from somewhere not be set manually

  useEffect(()=>{
    void fetchThreads();
  },[])

  const fetchThreads = async () => {
    try {
      const comments = await getThreads();
      setThreads(comments)
    } catch (error) {
      console.error(error);
    }
  }

  const submitRootComment = ({ author, text }: NewComment) => {
    addNewCommentToThree({ author, text, id: lastId + 1 });
  }

  const submitNestedComment = ({ author, text, parentId }: NewComment) => {
    addNewCommentToThree({ author, text, parentId, id: lastId + 1 });
  }

  const addNewCommentToThree = (newCommentWithId: CommentThree) => {
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
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className=''>
            {/*TODO: Prevent layout jumping before and after loading*/}
            <CommentForm onSubmit={submitRootComment} />

            <hr className='py-5' />

            <div className='min-h-screen'>
              {threads.map(props => <Thread key={props.id} onSubmitReply={submitNestedComment} {...props} />)}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
