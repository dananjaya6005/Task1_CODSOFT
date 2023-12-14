import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./LogIn.css";
import React from "react";

import { Alert } from "antd";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // start the sign In process.
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        navigate("/");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
      setError(err.errors[0].longMessage);
    }
  };

  return (
    <React.Fragment>
      <div className="wholeBody">
        <div className="bg-white p-10 rounded-md shadow-lg flex justify-center flex-col items-
         max-[640px]:w-10/12 " >
        <h3 className="HeadLogin">Dhananjaya’s Digest</h3>
        <p className="my-2 font-medium ">Welcome back to our circle of writters ! </p>
        
        <p className="secondsubtext">
          Dive into the world of Dhananjaya’s thoughts and experiences. Join us
          to explore, learn, and share your own stories
        </p>
        <hr className="mt-4" />
        {/* <img src={loginLogo} alt="logo" className="loginLogo" /> */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form className="mt-5 items-center justify-center flex flex-col " style={{ width: "450px" ,marginTop:20 }}>
            <div >
              <label htmlFor="email"></label>
              <Input
                className="customInput"
                size="large"
                placeholder="Enter Email Adress"
                id="email"
                name="email"
                type="email"
                prefix={<MailOutlined />}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>

            <br />

            <div>
              <label htmlFor="password"></label>
              <Input
                className="customInput"
                size="large"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                prefix={<LockOutlined />}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* <a style={{textAlign:'right', marginTop:15, cursor:'pointer'}} onClick={()=>{navigate('/resetpassword')}} >reset password </a> */}

              <button
                className="SignInbtnOverride"
                style={{ margin: 20 , color:'white' }}
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </form>

          <Link to="/signup">Don't have an account? </Link>
        </div>

        {isLoaded ? null : <p>Loading...</p>}

        {error && (
          <Alert
            style={{ marginTop: 30 }}
            message={error}
            type="warning"
            showIcon
            closable
          />
        )}
         </div>
      </div>
    </React.Fragment>
  );
}
