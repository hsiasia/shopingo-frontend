import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

const clientId =
  "1043514981991-50nrdq6cst3teco3ft2m36h06r90qsq8.apps.googleusercontent.com";
const UserContext = React.createContext();

const Login = () => {

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

  const [user, setUser] = useState(null);
  
  const handleCredentialResponse = (response) => {
    console.log("response", response);
    console.log("Encoded JWT ID token: " + response.credential);
    const userData = response.user_info;
    setUser(userData);
    localStorage.setItem('isLoggedIn', true);
  };  

  {/* const handleTest = () => {
    const userData = {
      user_info: {
        id: "123",
        name: "小明",
        profile_pic: "https://via.placeholder.com/150",
        score: 100,
      },
      status: 1,
    };
    setUser(userData);
    localStorage.setItem('isLoggedIn', true);
  }; */}

  return (
    <UserContext.Provider value={user}>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div id="signInDiv"></div>{" "}    
        {/* Google SignIn button will be rendered here */}
        <div className="col-md-12 py-5 bg-light text-center">
        <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Home Page
        </Link>
        </div>
        <br />
        <br />
      </div>
      <Footer />
      </UserContext.Provider>
  );
};

export {Login as default, UserContext};
