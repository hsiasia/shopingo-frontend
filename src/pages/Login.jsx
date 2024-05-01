import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

const clientId =
  "1043514981991-50nrdq6cst3teco3ft2m36h06r90qsq8.apps.googleusercontent.com";



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

  const handleCredentialResponse = (response) => {
    console.log("response", response);
    console.log("Encoded JWT ID token: " + response.credential);
    localStorage.setItem('isLoggedIn', true);
    getAPI(response.credential);
  };

  const getAPI = (token) => {
    // Make a request to your backend server to exchange the token for user_id
    fetch('http://34.81.121.53:8000/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user_id');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data which should contain user_id
      console.log('User ID:', data.user_id);
      localStorage.setItem('user_id', data.user_id);
    })
    .catch(error => {
      console.error('Error fetching user_id:', error);
    });
  };
  
  

  return (
    <>
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
    </>
  );
};

export default Login;
