import React from "react";
import { Footer, Navbar } from "../components";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const responseMessage = (res) => {
    console.log(res);
    console.log("ID:", res.profileObj.googleId);
    console.log("Name:", res.profileObj.name);
    console.log("Image URL:", res.profileObj.imageUrl);
    console.log("Email:", res.profileObj.email);
    console.log("id_token", res.tokenId);
    const id_token = res.tokenId;
    console.log(id_token);
};
const errorMessage = (error) => {
    console.log(error);
};
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr/>
          <GoogleLogin 
            onSuccess={responseMessage} 
            onError={errorMessage}
          />
        <br/>
        <br/>
      </div>
      <Footer />
    </>
  );
};

export default Login;
