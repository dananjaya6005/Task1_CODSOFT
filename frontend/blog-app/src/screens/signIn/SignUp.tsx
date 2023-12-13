import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { SmileOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { KeyOutlined } from "@ant-design/icons";
import { Alert, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import LogoSinUp from './LoginPageBg.jpg';

export default function SignUp() {
  const navigate = useNavigate();

  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUseName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  // start the sign up process.
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        username,
        firstName,
        lastName,
      
        
      
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      console.error("error", err.errors[0].longMessage);
      setError(err.errors[0].longMessage);
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setIsVerified(true);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      console.error("error", err.errors[0].longMessage);
      setError(err.errors[0].longMessage);
    }
  };

  return (
    <div className="SignupContainer">

      <div className="bg-white bg-opacity-70 p-10 rounded-lg 
      flex justify-center flex-col items-center ">
      
      {!pendingVerification && (
        <div className=" justify-center flex flex-col items-center  ">
          <h3 className="headSignUp">Join Dhananjaya’s Digest! </h3>
          <p className="subtextSignUp">
          Become a part of our community and start your journey.
          </p>
          <hr />
          {/* <img src={LogoSignUp} alt="logo" className="LogoSignUp" /> */}
        </div>
      )}

      {!pendingVerification && (
        <>
          <form>
            <div>
              <label htmlFor="firstName"></label>
              <Input
                className="customInputSignUp"
                size="large"
                placeholder="  Enter first Name"
                id="firstname"
                name="firstname"
                type="firstname"
                prefix={<SmileOutlined />}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="lastName"></label>
              <Input
                className="customInputSignUp"
                size="large"
                placeholder="  Enter Last Name"
                id="lastName"
                name="lastName"
                type="lastName"
                prefix={<SmileOutlined />}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email"></label>
              <Input
                className="customInputSignUp"
                size="large"
                placeholder="Enter Email Adress"
                id="email"
                name="email"
                type="email"
                prefix={<MailOutlined />}
                onChange={(e) => setEmailAddress(e.target.value)}
              />{" "}
            </div>
            <div>
              <label htmlFor="username"></label>
              <Input
                className="customInputSignUp"
                size="large"
                placeholder="Enter User name"
                id="username"
                name="username"
                type="username"
                prefix={<UserOutlined />}
                onChange={(e) => setUseName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password"></label>
              <Input
                className="customInputSignUp"
                size="large"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                prefix={<LockOutlined />}
              />
            </div>

            <button className="ml-2 bg-gray-800 px-6 py-2 text-white rounded-3xl my-3 duration-500 hover:bg-slate-500" onClick={handleSubmit}>
              Register
            </button>
          </form>

          <Link to="/login">Already have an account? Sign Up</Link>
        </>
      )}
      {pendingVerification && !isVerified && (
        <div>
          <h3 className="verifytext">
            Check your E-mail to find verify code !
          </h3>
          {/* <img
            style={{ width: 200 }}
            src={LiveEncriptLogo}
            alt="logo"
            className="LiveEncriptLogo"
          /> */}
          <form>
            <Input
              style={{ width: 200 }}
              className="customInput"
              value={code}
              size="large"
              placeholder="Enter Verify code"
              prefix={<KeyOutlined />}
              onChange={(e) => setCode(e.target.value)}
            />

            <button className="verifybtn" onClick={onPressVerify}>Verify Email</button>
          </form>
        </div>
      )}

      {error && <Alert message={error} type="error" showIcon closable />}

      {isVerified && (
        <div>
          <h1 style={{ color: "#1e3715" }}>
            Thank you for verifying your email !{" "}
          </h1>
          <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
      )}
      </div>
    </div>
  );
}
