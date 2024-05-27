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
<<<<<<< HEAD
      <div>
        <div style={{ height: '300px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Event ID</th>
                <th style={styles.tableHeader}>Event</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Location</th>
                <th style={styles.tableHeader}>View</th>
              </tr>
            </thead>
            <tbody>
              {InfoProps.Data && InfoProps.Data.map(event => (
                <tr key={event.id}>
                  <td style={styles.tableCell}>{event.id}</td>
                  <td style={styles.tableCell}>{event.event_name}</td>
                  <td style={styles.tableCell}>{event.event_date.toLocaleString()}</td>
                  <td style={styles.tableCell}>{event.location}</td>
                  <td style={styles.tableCell}>
                    <Link to={`/ticket/${event.id}`}>
                      <Button variant="contained" href={""}>
                        <VisibilityIcon />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
=======
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5"> {translate('JoinTicketEmpty')}</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> {translate('ContinueBrowsing')}
            </Link>
          </div>
>>>>>>> master
        </div>
      </div>
    );
  };

<<<<<<< HEAD
=======
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

>>>>>>> master
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
<<<<<<< HEAD
        <h1 className="text-center">My Incoming Events</h1>
        <hr />
        <Comp_ListBar Data={futureEvent}/>
=======
        <h1 className="text-center">{translate('joined')} </h1>
>>>>>>> master
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default JoinTicket;
