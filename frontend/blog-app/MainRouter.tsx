import { Route, Routes } from "react-router-dom";
import Home from "./src/screens/Home/Home";
import SignUp from "./src/screens/signIn/SignUp";
import Login from './src/screens/LogIn/LogIn';
import NavBar from './src/components/NavBar';
import { useUser } from "@clerk/clerk-react";
import Features from "./src/screens/Features/Features";
import MyBlogs from "./src/screens/MyBlogs/MyBlogs";
import FAQs from "./src/screens/FAQs/FAQs";

const MainRouter = () => {

    return (
        <>
    {
            showNavBarNorNot()
        }
        
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/FAQs" element={<FAQs />} />
        </Routes>
        </>
    );
};

export default MainRouter;


export const showNavBarNorNot =()=>{
    const {  isSignedIn } = useUser();
    if (isSignedIn) {
        return <NavBar/>
    }
    return null;
}