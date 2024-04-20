import React, { useEffect, useState, useContext } from "react";
import { Footer, Navbar } from "../components";
import { UserContext } from "./Login";

const MyTickets = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userData = useContext(UserContext); // 使用UserContext

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn);
        console.log("Test Login", userData);
    }, [userData]);   
    
    if (userData === null) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">My Tickets</h1>
        <hr />
        <div className="col-md-12 py-5 bg-light text-center">
        {isLoggedIn ? (
            <div>
              {userData ? (
                <div>
                  <p>Name: {userData.user_info.name}</p>
                  <p>id: {userData.user_info.id}</p>
                  <p>Profile Picture: <img src={userData.user_info.profile_pic} alt="Profile" /></p>
                  <p>Score: {userData.user_info.score}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ) : (
            <div>
              <h2>Please login to view your tickets</h2>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyTickets;
