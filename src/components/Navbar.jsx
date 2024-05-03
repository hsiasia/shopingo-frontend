import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Navbar = () => {
    const BookMarkstate = useSelector(state => state.handleBookmark)
    const JoinTicketstate = useSelector(state => state.handleJoinTicket)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn);
    }, []);
    const handleLogout = () => {
        setOpen(false);
        setIsLoggedIn(false); // 設置登入狀態為false
        localStorage.removeItem('isLoggedIn'); // 從localStorage中刪除登入信息
    };
    
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }
    
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
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/ticket">Search</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/newticket">NewTicket</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/calendar">Calendar</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Info">Personal Info</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/editticket">EditTicket</NavLink>
                        </li> */}
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink> */}
                        {isLoggedIn ? (
                            <>
                            <button onClick={handleClickOpen} className="btn btn-link p-0">
                            <Avatar src="/broken-image.jpg" />
                          </button>
                          <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Logout</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                    Are you sure to logout?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleLogout}>Logout</Button>
                                </DialogActions>
                            </Dialog>
                            </>
                        ) : (
                            <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        )}
                        <NavLink to="/jointicket" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> JoinTicket ({JoinTicketstate.length}) </NavLink>
                        <NavLink to="/bookmark" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Bookmark ({BookMarkstate.length}) </NavLink>
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar