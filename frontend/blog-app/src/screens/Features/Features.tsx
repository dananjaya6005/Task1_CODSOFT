//@ts-nocheck
import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Input, Form, Button } from "antd";
import { useUser } from "@clerk/clerk-react";
import { Space, Tag, ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Switch,Checkbox,Alert } from "antd";
import ImgCrop from "antd-img-crop";



let size: any;

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};


export default function Features() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(true);
  const [imageSelected, setImageSelected] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [showIsimageUpload, setShowIsimageUpload] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  

  
  const {user } = useUser();
  const screens = useBreakpoint();
  const { TextArea } = Input;

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "bqdafsjg");

    axios
      .post("https://api.cloudinary.com/v1_1/ddgxrcylr/image/upload", formData)
      .then((response) => {
        console.log(response.data);
        setImageURL(response.data.secure_url);
        setShowIsimageUpload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function cretepost() {
    await axios
      .post("https://blop-app-codsoft-backend.onrender.com/blog/createpost/", {
        title: title,
        username: user.username,
        content: content,
        summary: summary,
        author: author,
        imageURL: imageURL,
        published: published,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.success === true) {

          setShowAlert(true);
          setTimeout(()=>{
            setShowAlert(false);
          },4000)
        } 
      })
      .catch(function (error) {
        setShowAlertError(true);
        setTimeout(()=>{
          setShowAlertError(false);
        },4000)
        console.log(error);
      });
  }

  console.log(screens);

  useEffect(() => {
    if (screens.xs) {
      size = "large";
    } else if (screens.sm) {
      size = "sm";
    } else if (screens.md) {
      size = "md";
    } else if (screens.lg) {
      size = "lg";
    } else if (screens.xl) {
      size = "xl";
    } else if (screens.xxl) {
      size = "xxl";
    }
  }, [screens]);



  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file selected successfully`);
        setImageSelected(info.file.originFileObj);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  function showPreviewRender(){
    if(showPreview){
      return(
        <div className="mt-4">
                <h2 className="text-xl font-bold">Rendered preview</h2>
                <div
                  className="bg-gray-100 p-4 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              
              </div>
      )
    }
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#2563eb",

            // Alias Token
          },
        }}
      >
        <StyleProvider hashPriority="high">
          <div className="relative flex justify-center item-center flex-col m-8 ">
            <div className="mt-5">
              <h2 className="font-semibold text-gray-700 my-1	">
                Hello {user?.firstName}, Unleash Your Creativity !{" "}
              </h2>
              <h3 className="font-medium	text-gray-700 my-2">
                Craft your thoughts, share your world. Start creating your blog
                post now !
              </h3>
              <p className="text-gray-700 my-2">
                This header emphasizes the creative aspect of blogging and
                encourages users to share their unique perspectives. The subtext
                provides a clear call-to-action, guiding users to start creating
                their blog post. Remember, the best headers are concise,
                engaging, and align with the overall theme of your website.
                Happy blogging! 😊
              </p>
            </div>
            <div>
              <Form
                className="my-5 w-1/2 max-[500px]:w-10/12"
                layout="vertical"
              >
                <Form.Item label="Title">
                  <Input
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="w-1/2  max-[500px]:w-full"
                    placeholder="Enter Blog title ..."
                  />
                </Form.Item>
                <Form.Item label="author">
                  <Input
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                    className="w-1/2  max-[500px]:w-full"
                    placeholder="Enter author name ..."
                  />
                </Form.Item>
                <Form.Item label="summary">
                  <TextArea
                    onChange={(e) => {
                      setSummary(e.target.value);
                    }}
                    className="w-1/2  max-[500px]:w-full"
                    placeholder="Enter Blog summary here ..."
                  />
                </Form.Item>
              </Form>
            </div>

            <div>
              <p className="text-red-400 my-2 text-sm ">* Please select .jpg file only or try .jpeg</p>
              <ImgCrop aspect={600 / 400}>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>
                    Click to select Image
                  </Button>
                </Upload>
              </ImgCrop>
            </div>

            <div className="flex flex-row w-fit justify-center items-center max-[450px]:flex-col  max-[450px]:items-start  ">
              <div>
                <Button className="my-5 w-fit" onClick={uploadImage}>
                  Upload Image
                </Button>
              </div>

              <div className="pl-5 max-[450px]:pl-0">
                {!showIsimageUpload ? (
                  <Space size={[0, "small"]} wrap>
                    <Tag bordered={false} color="red">
                      Make sure to upload image before publishing
                    </Tag>
                  </Space>
                ) : (
                  <Space size={[0, "small"]} wrap>
                    <Tag bordered={false} color="green">
                      Image uploaded successfully
                    </Tag>
                  </Space>
                )}
              </div>
            </div>

          <div className="w-fit my-5">
          <ConfigProvider
            theme={{
              inherit: false,
              token: {
                // Seed Token
                colorPrimary: "#16a34a",
              },
            }}
          
          >
            <Switch onChange={()=>{setPublished(!published)}}  checkedChildren="public"  unCheckedChildren="private" defaultChecked />
          </ConfigProvider>

          
          </div>
          
           <div className="my-4">
           <Checkbox onChange={()=>{setShowPreview(!showPreview)}} >view Preview </Checkbox>
           </div>

            <div className="bg-white w-full">
              <ReactQuill
              
                modules={modules}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                ]}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>


            {showPreviewRender()}
          </div>
 

      
          <div className="m-8">

          <button onClick={cretepost} className="bg-slate-700 px-8 py-2 text-white rounded-md hover:bg-stone-700 duration-500">Submit</button>
          {
            showAlert && (
              <div style={{
                display: "flex",
                position: "fixed",
                bottom: "10px",
                left: "10px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px"
              }}>
    
              <Alert  className="bottom-0 left-0 absolute" message="successfully submitted" type="success" showIcon />
              </div>
            ) 
          }

        {
            showAlertError && (
              <div style={{
                display: "flex",
                position: "fixed",
                bottom: "10px",
                left: "10px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px"
              }}>
    
              <Alert  className="bottom-0 left-0 absolute" message="Somthing wrong ! or please make sure to fill all the field" type="error" showIcon />
              </div>
            ) 
          }   
       

          </div>
         

        </StyleProvider>
      </ConfigProvider>

    </>
  );
}
