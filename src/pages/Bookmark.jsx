import React from "react";
import { Footer, Navbar, Ticket } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { delBookmark } from "../redux/action";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useLanguage } from '../languageContext';

const apiUrl = process.env.REACT_APP_API_URL;

const Bookmark = () => {
  const state = useSelector((state) => state.handleBookmark);
  const dispatch = useDispatch();
  const { translate } = useLanguage();

  const EmptyBookmark = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">{translate('BookmarkEmpty')}</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> {translate('ContinueBrowsing')}
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
    const handleUnsave = (ticket) => {
      dispatch(delBookmark(ticket));

      fetch(`${apiUrl}/api/unsaveEvent/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: ticket.id,
          user: localStorage.getItem("user_id"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("unsave successful", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

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
                    handleUnsave(item);
                  }}
                  sx={{bgcolor: '#9EC5FF'}}
                >
                  {translate('cancel')} {item.event_name} {translate('saved')}
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
        <h1 className="text-center">{translate('saved')}</h1>
        <hr />
        {state.length > 0 ? <ShowBookmark /> : <EmptyBookmark />}
      </div>
      <Footer />
    </>
  );
};

export default Bookmark;
