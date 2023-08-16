import Head from "next/head";
import { useState } from "react";
import { Thread } from "~/components/Thread";

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
];

export default function Home() {
  const [threads,] = useState(CommentThrees);

  return (
    <>
      <Head>
        <title>Reddit comments for Inkitt</title>
        <meta name="description" content="Reddit comments for Inkitt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          Comment as Timer00
          <input placeholder='What are your thoughts?' className='border-solid border-black border-b-2'/>
          <div className='thread'>
            {threads.map(props => <Thread key={props.id} {...props} />)}
          </div>
        </div>
      </main>
    </>
  );
}
