import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Navbar = ({ history }) => {
    const BookMarkstate = useSelector(state => state.handleBookmark)
    const JoinTicketstate = useSelector(state => state.handleJoinTicket)
    const user = useSelector(state => state.handleUser);
    const handleLoginSuccess = () => {
        history.push('/');
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
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/editticket">EditTicket</NavLink>
                        </li> */}
                    </ul>
                    <div>
                        {/* <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink> */}
                        {user ? (
                                <img src={user.avatar} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        ) : (
                            <NavLink to="/login" onClick={handleLoginSuccess} className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
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