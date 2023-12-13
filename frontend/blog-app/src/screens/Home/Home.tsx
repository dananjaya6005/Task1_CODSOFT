import axios from "axios";
import { useState, useEffect } from "react";
import TopHeaderCard from "../../components/TopHeaderCard";

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

  useEffect(() => {
    axios
      .get("http://localhost:3000/blog/getpostall/")
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(posts);

  return (
    <>
      <div className="min-h-screen relative  ">
        <div className="mt-10">


          <div className="">

          <div className="w-7/12 bg-slate-700 flex justify-center  ">
            <h2 className=" ml-10 text-2xl font-semibold text-gray-800">
              Explore the latest posts
            </h2>
            <p className="ml-10 mb-5 italic ">
              {" "}
              Here's what we've been up to recently{" "}
            </p>
          </div>

          </div>
        

          <TopHeaderCard />
        </div>
      </div>
    </>
  );
}
