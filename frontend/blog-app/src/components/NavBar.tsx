import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import {UserButton, useUser} from "@clerk/clerk-react"
import axios from "axios";
import { Post } from "../screens/Home/Home";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "My Blogs", href: "/myblogprotected", current: false },
  { name: "Create Blogs", href: "/createpostprotected", current: false },
  { name: "FAQs", href: "/FAQs", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [posts, setPosts] = useState([] as Post[]);
  const [filteredData, setFilteredData] = useState([] as Post[]);

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


  const handleFilterData = (text: string) => {
    const newData = posts.filter((post) => post.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(newData);

    if(text === ""){
      setFilteredData([]);
    }
};


  return (
    <>
    <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>

      <Disclosure
        as="nav"
        className=" bg-white  border-b-2  border-gray-200 z-10 relative p-0 m-0 "
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8  ">
              {/* <button onClick={handleThemeChange} className="text-black dark:text-white">Theme</button> */}
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-black ">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    {/* <img
                    className="h-10 w-auto"
                    src={logo}
                    alt="Your Company"
                  /> */}
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          onClick={() => {
                            navigate(item.href);

                            navigation.forEach((item) => {
                              item.current = false;
                            });

                            item.current = true;
                          }}
                          className={classNames(
                            item.current
                              ? "bg-gray-200 text-black"
                              : "text-gray-600 hover:bg-gray-200 hover:text-black",
                            "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {
                    <div className="pl-10 max-[600px]:hidden">
                          <form>   
                            
                              <div className="relative">
                                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                      </svg>
                                  </div>
                                  <input onChange={(e)=>{handleFilterData(e.target.value)}} type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search Blogs ..." />
                              </div>
                          </form>


                        <div className="absolute bg-gray-100 bg-opacity-70 shadow-lg rounded-lg ">
                          {
                            filteredData.map((post)=>{
                              return(
                                <Link to={`/blog/${post._id}`}>
                                <div className="bg-white rounded m-2 shadow-xm p-1 ">
                                  <div>
                                  <p className="text-gray-800 italic">• {" "}{post.title}</p>
                                  
                                  </div>
        
                                </div>
                                </Link>
                              )
                            })
                          }
                        </div>
                          

                          

                    </div>

                  }

                  
                  

                  
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
               
                {
                  !isSignedIn ? (
                    <button onClick={()=>{navigate('/login')}} className="bg-gray-700 px-5 py-2 rounded-lg text-white hover:bg-slate-500 ease-in transition-all duration-800 " >Sign In</button>
                  ) : (
                    <UserButton afterSignOutUrl='/' />
                  )

                }

                
                
                  {/* Profile dropdown */}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    onClick={() => {
                      navigate(item.href);

                      navigation.forEach((item) => {
                        item.current = false;
                      });

                      item.current = true;
                    }}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
