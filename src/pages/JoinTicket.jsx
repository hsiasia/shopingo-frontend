import React, {useEffect, useState} from "react";
import { Footer, Navbar} from "../components";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button} from '@mui/material';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useLanguage } from '../languageContext';

const JoinTicket = () => {
  const state = useSelector((state) => state.handleJoinTicket);
  const dispatch = useDispatch();
  const { translate } = useLanguage();

  //Calling UserEvent API
  const [futureEvent,setFutureEvent] = useState([]);
  useEffect(() => {
    //setUserID(localStorage.getItem('user_id'));
    //setToken(localStorage.getItem('auth_token'));
    function fetchData(Catagory, Setting)  {
      fetch(`${apiUrl}/api/userEvent?user_id=${localStorage.getItem('user_id')}&status=${Catagory}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user info');
          }
          return response.json();
        })
        .then(data => {
          console.log(`${Catagory}:`, data.data);
          Setting(data.data);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
      };
      fetchData("ongoing", setFutureEvent);
  }, []);

  function Comp_ListBar (InfoProps) {
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

  const removeItem = (ticket) => {
    dispatch(delJoinTicket(ticket));
  };

  const ShowJoinTicket = () => {
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
                  {translate('cancel')} {item.event_name} {translate('joined')} 
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
        <h1 className="text-center">{translate('joined')} </h1>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default JoinTicket;
