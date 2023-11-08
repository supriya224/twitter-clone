import React, { useEffect, useState } from "react";
import Head from "next/head";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { useRecoilState } from "recoil";
import { getProviders, useSession,getSession } from "next-auth/react";
import { modalState } from "../atoms/modalAtom";
import { useRouter } from "next/router";
import { db } from "../firebase";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import Login from "../components/Login";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Widgets from "../components/Widgets";


function postPage({ followResults, trendingResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [comments, setComments]=useState([])

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  if (!session) return <Login providers={providers} />;
  return (
    <div className="">
      <Head>
        <title>
          {" "}
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-r
           border-gray-700 text-[#d9d9d9] font-semibold text-xl 
           gap-x-4 sticky top-0 z-50 bg-black">
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0" onClick={()=> router.push("/")}>
              <AiOutlineArrowLeft className="text-white h-5"/>
            </div>
            Tweet
           </div>
           <Post id={id} post={post} postPage/>
           {comments.length> 0 &&(
            <div>
              {comments.map(comment=>(
                <Comment key ={comment.id} id={comment.id} comment={comment.data()}/>
              ))}
            </div>
           )}
        </div>
       
        {session.user.name}
        <Widgets trendingResults={trendingResults} followResults={followResults} />
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default postPage;

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );

  const providers = await getProviders();

  const session = await getSession(context);


  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
