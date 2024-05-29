import React from "react";
import { Footer, Navbar, Ticket } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addJoinTicket, delJoinTicket } from "../redux/action";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useLanguage } from '../languageContext';

const apiUrl = process.env.REACT_APP_API_URL;

const JoinTicket = () => {
  const state = useSelector((state) => state.handleJoinTicket);
  const dispatch = useDispatch();
  const { translate } = useLanguage();
  const userId = localStorage.getItem("user_id");

  const EmptyJoinTicket = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5"> {translate('JoinTicketEmpty')}</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> {translate('ContinueBrowsing')}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const removeItem = async (ticket) => {
    try {
      console.log(ticket.id);

      // 先執行 deleteCalendarEvent API
      const deleteCalendarResponse = await fetch(`${apiUrl}/api/calendar/deleteCalendarEvent`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, event_id: ticket.id })
      });

      if (!deleteCalendarResponse.ok) {
        console.error('Failed to delete calendar event', deleteCalendarResponse.statusText);
        return;
      }

      // 然後執行 leaveEvent API
      const leaveEventResponse = await fetch(`${apiUrl}/api/leaveEvent/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: ticket.id,
          user_id: userId,
        }),
      });

      if (leaveEventResponse.ok) {
        // 如果請求成功，則從 state 中刪除該 ticket
        dispatch(delJoinTicket(ticket));
      } else {
        console.error('Failed to leave event', leaveEventResponse.statusText);
      }
    } catch (error) {
      console.error('Error while leaving event', error);
    }
  };

  const ShowJoinTicket = () => {
    return (
      <>
        {state.map((item) => {
          return (
            <React.Fragment key={item.event_id}>
              <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12}>
                  <Ticket ticket={item} />
                </Grid>
                <Button
                  variant="contained"
                  onClick={() => {
                    removeItem(item);
                  }}
                  sx={{ bgcolor: '#9EC5FF' }}
                >
                  {translate('cancel')} {item.event_name} {translate('joined')} 
                </Button>
              </Grid>
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">{translate('joined')} </h1>
        <hr />
        {state.length > 0 ? <ShowJoinTicket /> : <EmptyJoinTicket />}
      </div>
      <Footer />
    </>
  );
};

export default JoinTicket;
