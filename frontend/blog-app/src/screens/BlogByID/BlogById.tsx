//@ts-nocheck

import axios from "axios";
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function BlogById() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  console.log(id);

  useEffect(() => {

    if(id){
        axios.get(`https://blop-app-codsoft-backend.onrender.com/blog/getpostbyid/${id}`)
        .then((response) => {
            console.log(response.data);
            setPost(response.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

  }, []);

  return (
    <>
      <div className="relative min-h-min ">
        <div className="m-10 bg-white shadow-lg rounded-lg  text-gray-700 ">
            <div className="p-8">
            <h3 className="font-bold">{post.title}</h3>
            <h4 className="italic text-gray-500 font-semibold my-2"> Written by {post.author}</h4>
            <h5 className="italic text-gray-500 text-sm font-nromal my-2" >{post.created_at}</h5>
            <img src={post.imageURL} alt="image" className="w-1/2 h object-cover object-center rounded-lg shadow-lg" />
             
             <div className="relative my-5 " dangerouslySetInnerHTML={{ __html: post.content}} ></div>
            
            </div>
        </div>


      </div>
    </>
  );
}
