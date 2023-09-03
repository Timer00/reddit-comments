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
import { addNestedComment, isDuplicateComment } from "~/utils/comments";
import { type Tables } from "~/lib/schema";

export default function Home() {
  const [isDark, flip] = useDarkMode();
  const [threads, setThreads] = useState<CommentThread[]>([]);

  useEffect(() => {
    void fetchThreads();
  }, [])

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
          const { text, author, id, parent_id: parentId } = payload.new as Tables<'comments'>;
          const newComment = { text, author, id, parentId, children: [] };
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
    setThreads(prevThreads => {
      if (isDuplicateComment(prevThreads, newCommentWithId)) return prevThreads;

      if (!newCommentWithId.parentId) {
        return [...prevThreads, newCommentWithId];
      } else {
        return addNestedComment(prevThreads, newCommentWithId);
      }
    })
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
      const response: ApiResponse = await submitComment({ author, text, parentId, children: [] });

      if (response.success && response.result) {
        console.log('Comment submitted successfully!')
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
        <title>Pocket Reddit</title>
        <meta name="description" content="Reddit comments for Inkitt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-secondary text-primary">
        <LightDarkToggle switchMode={flip}
                         className='absolute top-[2vh] sm:top-[2vh] right-[20vw] sm:right-[8vw] z-10' />
        <div
          className="m-auto container flex flex-col items-center justify-center gap-12 px-4 py-16 z-0 min-w-full min-h-screen">
          <Image src={logo} alt={'pocket-reddit'} className={`${isDark ? '' : 'invert'}`} />
          <div className='w-[90vw]'>
            {/*TODO: Prevent layout jumping before and after loading*/}
            <CommentForm onSubmit={handleCommentSubmission} />

            <div className='py-5' />

            <div className='min-h-screen overflow-x-scroll'>
              {threads
                .sort((a, b) => b.id - a.id)
                .map((props, i) =>
                  <Thread key={props.id} alternateColor={i % 2 !== 0}
                          onSubmitReply={handleCommentSubmission} {...props} />)}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
