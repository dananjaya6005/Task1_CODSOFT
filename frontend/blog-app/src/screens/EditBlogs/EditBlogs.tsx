import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import { Input, Form,ConfigProvider, Switch, Alert } from "antd";


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
  

export default function EditBlogs() {
  const { id } = useParams();
  const [postForEdit, setPostForEdit] = useState({});

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const { TextArea } = Input;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blog/getpostbyid/${id}`)
      .then((response) => {
        console.log(response.data);
        setPostForEdit(response.data.data);
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
        setSummary(response.data.data.summary);
        setAuthor(response.data.data.author);
        setPublished(response.data.data.published);

        

        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const updatePost = () => {
    
    axios.post(`http://localhost:3000/blog/updatepost`, {
        id: id,
        title: title,
        author: author,
        content: content,
        summary: summary,
        published: published,
  }).then((response) => {
        console.log(response.data);

        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 4000);
        
    }
    ).catch((err) => {
        console.log(err);
        setShowAlertError(true);
        setTimeout(() => {
            setShowAlertError(false);
        }, 4000);
    });
    

  }



  return (
    <>
      <div className="min-h-screen relative m-10">
        <p>Blog ID : {id}</p>
        <div className="">
          <Form className="my-5 w-full max-[500px]:w-10/12" layout="vertical">
            <Form.Item label="Title">
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="w-1/2  max-[500px]:w-full"
                placeholder="Enter Blog title ..."
              />
            </Form.Item>
            <Form.Item label="author">
              <Input
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                className="w-1/2  max-[500px]:w-full"
                placeholder="Enter author name ..."
              />
            </Form.Item>
            <Form.Item label="summary">
              <TextArea
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                }}
                className="w-1/2  max-[500px]:w-full"
                placeholder="Enter Blog summary here ..."
              />
            </Form.Item>
          </Form>

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
          
          <div className="bg-white w-full my-5">
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
            <button onClick={updatePost} className="bg-slate-700 px-8 py-2 text-white rounded-md hover:bg-stone-700 duration-500">Save</button>
        </div>


      </div>

      {
            showAlert && (
              <div style={{
                display: "flex",
                position: "fixed",
                bottom: "10px",
                width: "100%",
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
                width: "100%",
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
    </>
  );
}
