import React, {useEffect, useState} from "react";
import { Footer, Navbar} from "../components";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button} from '@mui/material';
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const apiUrl = process.env.REACT_APP_API_URL;

const styles = {
  tableHeader: {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    position: 'sticky',
    top: 0, 
    zIndex: 1,
  },
  tableCell: {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
  },
}

const JoinTicket = () => {

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
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">My Incoming Events</h1>
        <hr />
        <Comp_ListBar Data={futureEvent}/>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default JoinTicket;
