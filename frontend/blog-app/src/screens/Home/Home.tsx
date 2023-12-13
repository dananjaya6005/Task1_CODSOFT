import axios from 'axios';
import { useState,useEffect } from 'react';
import TopHeaderCard from '../../components/TopHeaderCard';

export interface Post {
  _id: number;
  title: string;
  username: string;
  imageURL: string;
  published: boolean;
  content: string;
  summary: string;
  created_at: string;


}


export default function Home() {

  const [posts, setPosts] = useState([] as Post[]);

  useEffect (()=>{
    axios.get("http://localhost:3000/blog/getpostall/")
    .then((response) => {
     
      setPosts(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

   console.log(posts);



  return (
    <>
    <div className='min-h-screen relative '>
    <h2>Home</h2>
    <TopHeaderCard/>

    <div className='bg-gray-200 h-fu'>

    </div>
    {/* <div>
      {
        posts && posts.map((post:any)=>{
          return(
            <div>
              <h1>{post.title}</h1>
              <h3>{post.author}</h3>
              <p>{post.summary}</p>
              <img src={post.imageURL} alt="image" />
            </div>
          )
        })
      }
   
   
    </div> */}
    </div>
    </>
  )
}
