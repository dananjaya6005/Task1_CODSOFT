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
        <h3 className="HeadLogin">Gifts Of Hope</h3>
        <p>Welcome back to our circle of kindness! </p>
        <p className="secondsubtext">
          Your generosity has the power to make a difference. Log in and let’s
          continue this journey of giving, together!
        </p>
        <hr />
        {/* <img src={loginLogo} alt="logo" className="loginLogo" /> */}

        <div style={{ display:'flex',
        flexDirection:'column', alignItems:'center',
         justifyContent:'center'}}>
          <form style={{width:'450px'}}>
            <div>
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

            <div style={{display:'flex' ,flexDirection:"column"}}>
            {/* <a style={{textAlign:'right', marginTop:15, cursor:'pointer'}} onClick={()=>{navigate('/resetpassword')}} >reset password </a> */}

            <button className="SignInbtnOverride" style={{ margin: 20}} onClick={handleSubmit}>
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
    </React.Fragment>
  );
}
