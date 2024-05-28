/* global gapi */
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { fetchBookmarkData, fetchJoinTicketData } from '../redux/action';
import { useLanguage } from '../languageContext';
import { FormControlLabel, Switch } from '@mui/material';
import Websocket from './Websocket';

const google = window.google;

const clientId =
  "1043514981991-50nrdq6cst3teco3ft2m36h06r90qsq8.apps.googleusercontent.com";
const apiUrl = process.env.REACT_APP_API_URL;

const CLIENT_ID = '121623953765-rgle7pqkttsvkp64sp977pv5d234eo7b.apps.googleusercontent.com';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';
const REDIRECT_URI = 'postmessage'; // 你的重定向 URI

let tokenClient;

//localStorage.setItem("user_id", "1");
localStorage.setItem("isCreateCalendar", false);

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://apis.google.com/js/api.js';
    script1.async = true;
    script1.defer = true;
    script1.onload = gapiLoaded;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://accounts.google.com/gsi/client';
    script2.async = true;
    script2.defer = true;
    script2.onload = gisLoaded;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: process.env.REACT_APP_API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initCodeClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      ux_mode: 'popup',
      callback: '', // defined later
      access_type: 'offline', // Request a refresh token
      redirect_uri: REDIRECT_URI,
      prompt: 'consent' // Ensure consent is asked every time
    });
  }
  
  const { language, switchLanguage, translate } = useLanguage();

  const handleLanguageToggle = (event) => {
    switchLanguage(event.target.checked ? 'EN' : 'CH');
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookmarkData());
    dispatch(fetchJoinTicketData());
  }, [dispatch]);
  const BookMarkstate = useSelector(state => state.handleBookmark)
  const JoinTicketstate = useSelector(state => state.handleJoinTicket)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn);
  }, []);
    

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
    fetch(`${apiUrl}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({token: token})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user_id');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data which should contain user_id
      console.log('User ID:', data.user_info.id);
      console.log('User Name:', data.user_info);
      localStorage.setItem('user_id', data.user_info.id);
      setIsLoggedIn(true);
      handleCalendarClick();
    })
    .catch(error => {
      console.error('Error fetching user_id:', error);
    });
  };
  const handleCalendarClick = async () => {
    console.log("execute handleCalendarClick");
    //e.preventDefault();
    const userId = localStorage.getItem("user_id");
    console.log(userId);

    if (!userId) {
      alert("請先登入才能使用 calendar 功能");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/calendar/getCalendarId_token?user_id=${userId}`);
      const data = await response.json();
      console.log(data);
      console.log("fetch api getCalendarId_token");

      if (data.empty === false) {
        localStorage.setItem("isCreateCalendar", true);
        //navigate("/");
        // window.location.reload();
      } else {
        handleAuthClick();
      }
    } 
    catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  function handleAuthClick() {
    if (!tokenClient) {
      console.error('Token client not initialized');
      return;
    }
    tokenClient.callback = (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      console.log(resp);
      const authCode = resp.code;
      const userId = localStorage.getItem('user_id');
      console.log(authCode);
      console.log(JSON.stringify({ user_id: userId, code: authCode }));
      fetch(`${apiUrl}/api/calendar/createCalendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId, code: authCode })
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("isCreateCalendar", true);
        alert("已成功於您的 google calendar 創建行事曆！");
        //navigate("/");
        //window.location.reload();
      })
      .catch(error => {
        console.error('Error exchanging auth code:', error);
      });
    };
    tokenClient.requestCode();
  }

  // function handleAuthClick() {
  //   if (!tokenClient) {
  //     console.error('Token client not initialized');
  //     return;
  //   }
  //   tokenClient.callback = (resp) => {
  //     if (resp.error !== undefined) {
  //       throw (resp);
  //     }
  //     console.log(resp);
  //     const authCode = resp.code;
  //     const userId = localStorage.getItem('user_id');
  //     console.log(authCode);
  //     console.log(JSON.stringify({ user_id: userId, code: authCode }));
  //     fetch(`${apiUrl}/api/calendar/createCalendar`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ user_id: userId, code: authCode })
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       localStorage.setItem("isCreateCalendar", true);
  //       alert("已成功於您的 google calendar 創建行事曆！");
  //     })
  //     .catch(error => {
  //       console.error('Error exchanging auth code:', error);
  //     });
  //   };
  //   tokenClient.requestCode();
  // }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2 pink" to="/"> SHOPINGO</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">{translate('homePage')} </NavLink>
                        </li>
                        {isLoggedIn ? (
                          <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/newticket">{translate('create')}</NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink className="nav-link" to="/calendar">Calendar</NavLink>
                            </li>
                          </>
                          ) : (
                            <></>
                          )}
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isLoggedIn ? (
                            <>
                              <NavLink to="/Info">
                                <button className="btn btn-link p-0">
                                  <Avatar src="/broken-image.jpg" />
                                </button>
                              </NavLink>
                              <Websocket />
                              <NavLink to="/jointicket" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> {translate('joined')} ({JoinTicketstate.length}) </NavLink>
                              <NavLink to="/bookmark" className="btn btn-outline-dark m-2"><BookmarksIcon fontSize="small"/> {translate('saved')} ({BookMarkstate.length}) </NavLink>
                            </>
                        ) : (
                            <div id="signInDiv"></div>
                        )}           
                        <FormControlLabel
                          control={<Switch checked={language === 'EN'} onChange={handleLanguageToggle} />}
                          label={language === 'EN' ? 'English' : '中文'}
                        />
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar