import Head from "next/head";
import { useState } from "react";
import { Thread } from "~/components/Thread";
import { CommentForm } from "~/components/CommentForm";

//TODO: write comment related functionality in different file(s)
export interface CommentThree {
  id: number;
  author: string;
  text: string;

  children?: CommentThree[]
}

const CommentThrees = [
  {
    id: 1,
    text: 'This is the root comment',
    author: 'Greg',
    children: [
      {
        id: 2,
        text: 'This is a direct reply to the root comment',
        author: 'Tim',
        children: [
          {
            id: 4,
            text: 'This is a nested reply to comment 2',
            author: 'Alice',
            children: [
              {
                id: 5,
                text: 'This is a nested reply to comment 4',
                author: 'Bob',
              }
            ]
          },
          {
            id: 6,
            text: 'Another nested reply to comment 2',
            author: 'Eve',
          }
        ]
      },
      {
        id: 3,
        text: 'Another direct reply to the root comment',
        author: 'John',
        children: [
          {
            id: 7,
            text: 'A nested reply to comment 3',
            author: 'Charlie',
            children: [
              {
                id: 8,
                text: 'A deep nested reply to comment 7',
                author: 'David',
              }
            ]
          }
        ]
      },
      {
        id: 9,
        text: 'Third direct reply to the root comment',
        author: 'Hannah'
      }
    ]
  },
  {
    id: 10,
    text: 'Another root comment',
    author: 'Isaac',
    children: [
      {
        id: 11,
        text: 'Reply to the second root comment',
        author: 'Jack',
      },
      {
        id: 12,
        text: 'Another reply to the second root comment',
        author: 'Kelly',
        children: [
          {
            id: 13,
            text: 'Nested reply to comment 12',
            author: 'Liam',
          }
        ]
      }
    ]
  },
  {
    id: 14,
    text: 'Yet another root comment',
    author: 'Mia',
    children: [
      {
        id: 15,
        text: 'Reply to the third root comment',
        author: 'Noah',
      },
      {
        id: 16,
        text: 'Another reply to the third root comment',
        author: 'Olivia',
        children: [
          {
            id: 17,
            text: 'Nested reply to comment 16',
            author: 'Peyton',
          },
          {
            id: 18,
            text: 'Another nested reply to comment 16',
            author: 'Quinn',
            children: [
              {
                id: 19,
                text: 'Deep nested reply to comment 18',
                author: 'Riley',
              }
            ]
          }
        ]
      }
    ]
  }
] as CommentThree[];

// interface NewComment extends Omit<CommentThree, 'id'> {
interface NewComment extends CommentThree {
  parentId?: number
}

function addNestedComment(threads: CommentThree[], newComment: NewComment): CommentThree[] {
  return threads.map(comment => {
    // If the comment ID matches the parentId of the new comment
    if (comment.id === newComment.parentId) {
      // Append the new comment to the children and return the comment with its updated children
      const updatedChildren = comment.children ? [...comment.children, newComment] : [newComment];
      return { ...comment, children: updatedChildren };
    }

    // If the comment has children, search within them
    if (comment.children) {
      return { ...comment, children: addNestedComment(comment.children, newComment) };
    }

    // Return the comment as is if no match is found
    return comment;
  });
}

export default function Home() {
  const [threads, setThreads] = useState(CommentThrees);
  const [lastId, setLastId] = useState(19);
  //TODO: find a better way to fetch the initial lastId, it should come from somewhere not be set manually

  const submitNewComment = (user: string, content: string) => {
    addNewComment({ author: user, text: content, id: lastId + 1 });
    setLastId(lastId + 1);
  }

  const addNewComment = (newComment: NewComment) => {
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
