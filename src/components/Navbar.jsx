import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { fetchBookmarkData, fetchJoinTicketData } from '../redux/action';
import { useLanguage } from '../languageContext';
import { FormControlLabel, Switch } from '@mui/material';
import Websocket from './Websocket';

const clientId =
  "1043514981991-50nrdq6cst3teco3ft2m36h06r90qsq8.apps.googleusercontent.com";
const apiUrl = process.env.REACT_APP_API_URL;

const Navbar = () => {
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
    
    const { language, switchLanguage, translate } = useLanguage();

    const handleLanguageToggle = (event) => {
      switchLanguage(event.target.checked ? 'EN' : 'CH');
    };

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
          window.location.reload();
        })
        .catch(error => {
          console.error('Error fetching user_id:', error);
        });
      };

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
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/newticket">{translate('create')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/calendar">{translate('calendar')}</NavLink>
                        </li>
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink> */}
                        {!isLoggedIn ? (
                            <>
                            <NavLink to="/Info">
                            <button className="btn btn-link p-0">
                            <Avatar src="/broken-image.jpg" />
                          </button>
                          </NavLink>
                          <Websocket />
                            </>
                        ) : (
                            <div id="signInDiv"></div>
                            // <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        )}
                        <NavLink to="/jointicket" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> {translate('joined')} ({JoinTicketstate.length}) </NavLink>
                        <NavLink to="/bookmark" className="btn btn-outline-dark m-2"><BookmarksIcon fontSize="small"/> {translate('saved')} ({BookMarkstate.length}) </NavLink>
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