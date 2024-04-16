import React, { useEffect, useHistory } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";

const clientId =
  "1043514981991-50nrdq6cst3teco3ft2m36h06r90qsq8.apps.googleusercontent.com";

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });
    window.google?.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    window.google?.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = (response) => {
    console.log("response", response);
    console.log("Encoded JWT ID token: " + response.credential);
    if (response.credential) {
      dispatch(state => state.handleUser);
      useHistory.push('/');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div id="signInDiv"></div>{" "}    
        {/* Google SignIn button will be rendered here */}
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Login;
