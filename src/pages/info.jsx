import React from "react";
import { Footer, Navbar, Ticket } from "../components";/*baisc website components*/
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, delBookmark } from "../redux/action";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Bookmark = () => {
  const state = useSelector((state) => state.handleBookmark);
  const dispatch = useDispatch();

  const EmptyBookmark = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Bookmark is Empty</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const removeItem = (ticket) => {
    dispatch(delBookmark(ticket));
  };

  const ShowBookmark = () => {
    return (
      <>
        {state.map((item) => {
          return (
            <>
              <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid item xs={12}>
                  <Ticket ticket={item} />
                </Grid>
                <Button
                  variant="contained"
                  onClick={() => {
                    removeItem(item);
                  }}
                  sx={{bgcolor: '#9EC5FF'}}
                >
                  cancel {item.event_name} Bookmark
                </Button>
              </Grid>
            </>
          )
        })}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3"> 
        <h1 className="text-center">Bookmark</h1>
        <hr />
        {state.length > 0 ? <ShowBookmark /> : <EmptyBookmark />}
      </div>
      <Footer />
    </>
  );
};

export default Bookmark;
