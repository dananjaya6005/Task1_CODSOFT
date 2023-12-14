//@ts-nocheck
import React, { useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function MyBlogs() {
  const { user } = useUser();
  const [postForUser, setPostForUser] = React.useState([]);
  const [needtoReload, setNeedtoReload] = React.useState(false);

  useEffect(() => {
    axios
      .get(`https://blop-app-codsoft-backend.onrender.com/blog/getpostbyusername/${user.username}`)
      .then((response) => {
        console.log(response.data);
        setPostForUser(response.data.data);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, [needtoReload]);


   function deletePost(id:string) {
    axios
      .delete(`https://blop-app-codsoft-backend.onrender.com/blog/deletepost/${id}`)
      .then((response) => {
         console.log(response.data);
         setTimeout(()=>{
          setNeedtoReload(!needtoReload)
        },1000)
      })
      .catch((err) => {
        console.log(err);
      });
   }


  return (
    <div className="min-h-screen relative">
      <div>

        <h3 className="m-5 font-medium text-gray-700 ">My Blogs ...</h3>

        <div className="deletePostcard">
          {postForUser.map((post, index) => {
            return (
              <div key={index}>
                <div className=" w-3/4	 bg-white shadow-lg m-4 rounded-xl font-mono ">
                  <div className="m-5 p-4">
                    <h4>Blog ID : {post._id}</h4>
                    <h4>Blog Title : {post.title}</h4>
                    <h4>Blog Author : {post.author}</h4>
                    <h5>Create Date : {post.created_at}</h5>
                    <h5>Last Update Date : {post.updated_at}</h5>
 
                    <div className="my-2">
                    <Link to={`/editblog/${post._id}`} className="text-blue-500 ">Update Blog </Link>
                    <button onClick={()=>{deletePost(post._id)}}  className="text-red-500 mx-5 ">Delete Blog</button>
                    <Link className="text-green-600" to={`/blog/${post._id}`} >View Blog</Link>

                    </div>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
