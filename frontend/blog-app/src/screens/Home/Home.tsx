import axios from "axios";
import { useState, useEffect } from "react";
import TopHeaderCard from "../../components/TopHeaderCard";
import PostCard from "../../components/PostCard";
import { Link } from "react-router-dom";

export interface Post {
  _id: number;
  title: string;
  username: string;
  author: string;
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
      .get("https://blop-app-codsoft-backend.onrender.com/blog/getpostall/")
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


 
  return (
    <>

      <div className="min-h-screen relative  ">
        <SearchBarForHome posts={posts} />
        <div className="mt-5">
          <div className="justify-center flex">
            <div className="w-7/12 max-[500px]:w-10/12  ">
              <h2
                className="text-3xl font-semibold text-gray-800 max-[500px]:text-2xl 
              max-[500px]:my-3
              "
              >
                Explore the Latest Blogs from our community
              </h2>
              <p className=" mb-5 italic ">
                {" "}
                Here's what we've been up to recently{" "}
              </p>
            </div>
          </div>

          <TopHeaderCard />
        </div>

        <div className="ml-10 mt-10">
          <div>
            <h3 className=" font-medium text-gray-700 ">Propular Articles </h3>
            <p>
              We share common trend,ideas,opinions,short and long stories from
              our community
            </p>
          </div>
        </div>

        <div className="flex justify-center  ">
  <div className="mt-10 flex-wrap flex w-fit justify-center ">
    {posts &&
      posts.map((post) => (
        post.published === true ?
        (
          <div className="m-4">
            <PostCard
              _id={post._id}
              title={post.title}
              author={post.author}
              imageURL={post.imageURL}
              content={post.content}
              summary={post.summary}
              created_at={post.created_at}
              published={post.published}
              username={post.username}
            />
          </div>
        )
        : null
      ))}
  </div>
</div>


        <div className="flex justify-center my-7 ">
          <button className="bg-pink-900 hover:bg-pink-700 duration-700 text-white font-medium py-2 px-4 rounded-xl">
            Load More
          </button>
        </div>

        <div className="py-10">
          <div className="m-20 max-[640px]:m-7 ">
            <h3 className="text-gray-700 font-medium ">
              Embark on the Journey of Discovery with Dhananjaya’s Digest!
            </h3>
            <p className="my-5">
              Step into the vibrant world of <b>Dhananjaya’s Digest </b> , a
              place where curiosity meets knowledge, and ideas come to life. Our
              community is a tapestry of diverse voices, each adding unique
              threads to the rich narrative we weave. Here, every story matters,
              every perspective counts. By joining us, you’re not just signing
              up for a blog, you’re embarking on a journey of discovery. A
              journey where you can explore new horizons, engage in enlightening
              discussions, and share your unique insights. So why wait? Join
              Dhananjaya’s Digest today and let’s write the future, one post at
              a time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function SearchBarForHome({ posts }: { posts: Post[] }) {
  const [filteredData, setFilteredData] = useState([] as Post[]);

  const handleFilterData = (text: string) => {
    const newData = posts.filter((post) =>
      post.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(newData);

    if (text === "") {
      setFilteredData([]);
    }
  };

  return (
    <>
      
        <div className="m-5 sm:hidden ">
          <form>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  handleFilterData(e.target.value);
                }}
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 bg-opacity-50"
                placeholder="Search Blogs ..."
              />
            </div>
          </form>

          <div className="absolute bg-gray-100 bg-opacity-70 shadow-lg rounded-lg ">
            {filteredData.map((post) => {
              return (
                <Link to={`/blog/${post._id}`}>
                  <div className="bg-white rounded m-2 shadow-xm p-1 ">
                    <div>
                      <p className="text-gray-800 italic">• {post.title}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
        </div>
  
    </>
  );
}

