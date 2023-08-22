import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Thread } from "~/components/Thread";
import { CommentForm } from "~/components/CommentForm";
import { type CommentThread, type NewComment } from "~/types/comments";
import useDarkMode from "~/hooks/useDarkMode";
import { LightDarkToggle } from "~/components/LightDarkToggle";
import Image from "next/image";
import logo from "~/assets/Stellar Soundwave - Vaporwave.png"
import { getThreads, submitComment } from "~/controllers/comments";
import { type ApiResponse } from "~/types";
import { supabase } from "~/lib/supabase";
import { addNestedComment } from "~/utils/comments";

export default function Home() {
  const [isDark, flip] = useDarkMode();
  const [threads, setThreads] = useState<CommentThread[]>([]);

  useEffect(()=>{
    void fetchThreads();
  },[])

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
        },
        (payload) => {
          const newComment = payload.new as CommentThread;
          addNewCommentToThread(newComment);
        }
      )
      .subscribe()

    return () => {
      // Clean up subscription on component unmount
      void supabase.removeChannel(channel);
    };
  }, []);

  const addNewCommentToThread = (newCommentWithId: CommentThread) => {
    if (!newCommentWithId.parentId)
      setThreads([...threads, newCommentWithId]);
    else
      setThreads(addNestedComment(threads, newCommentWithId));
  }

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
      <main className="min-h-screen bg-secondary text-primary">
        <LightDarkToggle switchMode={flip} className='absolute top-[2vh] sm:top-[2vh] right-[20vw] sm:right-[8vw]'/>
        <div className="m-auto container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Image src={logo} alt={'pocket-reddit'} className={isDark ? '' : 'invert'}/>
          <div className=''>
            {/*TODO: Prevent layout jumping before and after loading*/}
            <CommentForm onSubmit={handleCommentSubmission} />

            <div className='py-5' />

            <div className='min-h-screen'>
              {threads.map((props, i) =>
              <Thread key={props.id} alternateColor={i % 2 !== 0} onSubmitReply={handleCommentSubmission} {...props} />)}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
