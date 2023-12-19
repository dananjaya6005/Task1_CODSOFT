//@ts-nocheck
import axios from "axios";
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from 'antd';
import { useUser } from "@clerk/clerk-react";

export default function BlogById() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { TextArea } = Input;
  const [needUpdate, setNeedUpdate] = useState(false); 
  const [comment, setComment] = useState("");
  const { user } = useUser();


  useEffect(() => {

    if(id){
        axios.get(`https://blop-app-codsoft-backend.onrender.com/blog/getpostbyid/${id}`)
        .then((response) => {
            console.log(response.data);
            setPost(response.data.data);

            setTimeout(()=>{
                setNeedUpdate(!needUpdate);
            },2000)
        })
        .catch((err) => {
            console.log(err);
        });
    }

  }, []);


  function postComment (){

    axios.post(`https://blop-app-codsoft-backend.onrender.com/blog/addcomment/`, {
      username:  user?.username || "anonymous",
      comment: comment,
      id: id
    })
    .then((response)=>{
      console.log(response.data.data);

      setTimeout(()=>{
        window.open(`/blog/${id}`,"_self")
      },2000)
    })
    .catch((err)=>{
      console.log(err);
    })

  }



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

        <div className="m-10" >
          <h3 className=" font-medium text-gray-700 ">comments</h3>

          <div className="w-3/5	my-5">
          <TextArea onChange={(e)=>{setComment(e.target.value)}} rows={4} placeholder="write your comment here"/>
          <button onClick={postComment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5">
            Submit  
          </button>
          </div>

          

          {
            post.comments && post.comments.map((comment) => (
              <div className="bg-white shadow-sm rounded-3xl  text-gray-700 " key={comment._id}>
            <div className="py-2 px-5 my-3">
          
              <h4 className="italic text-gray-500 font-semibold my-2">
                
                Comment by {comment.username}
              </h4>
              <h5 className="italic text-gray-500 text-sm font-nromal my-2">
                
                {comment.date}
              </h5>

              <p className="my-5">
                {comment.comment}
              </p>
            </div>
            </div>
            ))

          }

        </div>



      </div>
    </>
  );
}
