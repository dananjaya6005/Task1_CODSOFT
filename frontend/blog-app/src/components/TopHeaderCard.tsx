import {FormOutlined} from "@ant-design/icons/lib/icons";
import { Button, FloatButton, ConfigProvider, Carousel, Tooltip } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { useEffect, useState } from "react";
import { Post } from "../screens/Home/Home"
import axios from "axios";
import { Link ,useNavigate } from "react-router-dom";



export default function TopHeaderCard() {

 const [latestPost, setLatestPost] = useState([] as Post[]);
 const [takeLeast5Post , setTakeLeast5Post] = useState([] as Post[]);


  useEffect(() => {
    setTakeLeast5Post(latestPost.reverse().slice(0, 4));
  }, [latestPost]);

  useEffect (()=>{

    axios.get("http://localhost:3000/blog/getpostall/")
    .then((response) => {
      console.log(response.data);
      setLatestPost(response.data.data);
     
    })
    .catch((err) => {
      console.log(err);
    });
   
  },[])
  
 

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0369a1",
          },
        }}
      >
        <StyleProvider hashPriority="high">

        <div className=" flex justify-center  ">
          <div className="w-7/12  rounded-lg ">
            <Carousel
             
            draggable={true}

              swipe={true}
            touchMove={true}
             pauseOnDotsHover={false}  
              className="w-full shadow-lg rounded-lg cursor-move "
              
              autoplay
            >
              {takeLeast5Post.map((item, index) => {
                
                return (
                  <div>
                    <SlideShowContext
                      id={item._id}
                      title={item.title}
                      author={item.author}
                      description={item.summary}
                      image={item.imageURL}
                      date={item.created_at}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>

          </div>

          <div>
            <FloatButton
              shape="circle"
              badge={{ dot: true }}
              icon={<FormOutlined />}
            />
          </div>
        </StyleProvider>
      </ConfigProvider>
    </>
  );
}

export function SlideShowContext(props: any) {
  
  return (
    <div className="bg-white w-full  shadow-lg rounded-lg  flex flex-row ">
      <img
        className="w-1/2  object-contain rounded-md  "
        src={props.image}
        alt="image"
      />
      
      <div className=" m-4  grid 2xl:my-10 ">
      <Tooltip title={props.title} >
        <h4 className="text-xl font-bold text-gray-800 2xl:text-3xl">
          {props.title?.length > 45
            ? props.title?.substring(0, 45) + "..."
            : props.title}
        </h4>
        </Tooltip>
        <div className="flex flex-row justify-between 2xl:my-3">
          <p className="text-sm my-1 text-gray-500 italic 2xl:text-xl">
           {props.author}
          </p>
          <p className="text-xs my-1 text-gray-500 italic 2xl:text-base">
            2023.12.12{" "}
          </p>
          <div></div>
        </div>
        <div className="mt-1">
          {" "}
          <p className="text-sm 2xl:text-lg">
            {props.description?.length > 200
              ? props.description.substring(0, 200) + "..."
              : props.description}
          </p>
        </div>

        <Link to={`/blog/${props.id}`} className="flex justify-end 2xl:text-lg mr-5  ">
          Read more
        </Link>
  
        
      </div>
    </div>
  );
}
