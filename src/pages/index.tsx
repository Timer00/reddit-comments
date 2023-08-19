import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Thread } from "~/components/Thread";
import { CommentForm } from "~/components/CommentForm";
import { type CommentThree, type NewComment } from "~/types/comments";
import { getThreads, submitComment } from "~/controllers/comments";
import { type ApiResponse } from "~/types";

export default function Home() {
  const [threads, setThreads] = useState<CommentThree[]>([]);

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

  const submitNewComment = async ({ author, text, parentId }: NewComment) => {
    try {
      const response: ApiResponse = await submitComment({ author, text, parentId });
      if (response.success) {
        console.log('Comment submitted successfully!')
        void fetchThreads();
      } else {
        // Handle specific failure based on 'response.error' if provided.
      }
    } catch (error) {
      // Handle unexpected errors.
      console.error("Error submitting comment:", error);
    }
  }

  const handleCommentSubmission = (a: NewComment) => void submitNewComment(a)

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
            <CommentForm onSubmit={handleCommentSubmission} />

            <hr className='py-5' />

            <div className='min-h-screen'>
              {threads.map(props => <Thread key={props.id} onSubmitReply={handleCommentSubmission} {...props} />)}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
