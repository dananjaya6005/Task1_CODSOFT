import { Route, Routes } from "react-router-dom";
import Home from "./src/screens/Home/Home";
import SignUp from "./src/screens/signIn/SignUp";
import Login from "./src/screens/LogIn/LogIn";
import NavBar from "./src/components/NavBar";
import Features from "./src/screens/Features/Features";
import MyBlogs from "./src/screens/MyBlogs/MyBlogs";
import FAQs from "./src/screens/FAQs/FAQs";
import Footer from "./src/components/Footer";
import BlogById from "./src/screens/BlogByID/BlogById";
import EditBlogs from "./src/screens/EditBlogs/EditBlogs";
import MyblogProtected from "./src/protectedRouter/MyblogProtected";
import { useLocation } from "react-router-dom";
import CreatePostProtected from "./src/protectedRouter/CreatePostProtected";
import { ConfigProvider, Modal } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { useEffect, useState } from "react";

const MainRouter = () => {
  const [modalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  });

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {RenderNavBar()}

      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "orange",

            // Alias Token
          },
        }}
      >
        <StyleProvider hashPriority="high">
          {modalOpen === true && (
            <Modal
              title="Warnning ! ⚠️ "
              open={modalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>If Blog post not loading please comeback after 60 seconds. </p>
              <p className="text-yellow-500 font-bold">
                Because our Backend server running slowly{" "}
              </p>
              <p className="text-green-500">
                when users inactive server is going to sleep 😴
              </p>
            </Modal>
          )}
        </StyleProvider>
      </ConfigProvider>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/blog/:id" element={<BlogById />} />
        <Route path="/editblog/:id" element={<EditBlogs />} />
        <Route path="/myblogprotected" element={<MyblogProtected />} />
        <Route path="/createpostprotected" element={<CreatePostProtected />} />
      </Routes>

      {RenderFooter()}
    </>
  );
};

const RenderNavBar = (): any => {
  const location = useLocation();
  const CurruntPath = location.pathname;

  if (CurruntPath === "/login" || CurruntPath === "/signup") {
    return null;
  }
  return <NavBar />;
};

const RenderFooter = (): any => {
  const location = useLocation();
  const CurruntPath = location.pathname;

  if (CurruntPath === "/login" || CurruntPath === "/signup") {
    return null;
  }

  return <Footer />;
};

export default MainRouter;
