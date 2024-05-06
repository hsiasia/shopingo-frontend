import React , { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Footer,
  Navbar,
} from "../components"; //baisc website components
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const styles = {
  tableHeader: {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    border: '1px solid #dddddd',
    padding: '8px',
    textAlign: 'left',
  },
}

const Info = () => {
  const currentDate = new Date();
  const [EventPast, setEventPast] = useState([]);
  const [EventFuture, setEventFuture] = useState([]);
  const filterTime = (Future) => {
    if (apiData.length > 0) {
      if(Future){
        const updatedList = apiData.filter((item) => {
        const target = item.event_date > currentDate;
        return (target);
        });
        setEventFuture(updatedList);
      }
      else{
        const updatedList = apiData.filter((item) => {
          const target = item.event_date <= currentDate;
          return (target);
        });
        setEventPast(updatedList);
      }
    }
  };

  const [apiData, setApiData] = useState([]);
  const [userID, setUserID] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${apiUrl}/api/event`);
          const json = await result.json();
          const updatedData = json.data.map(item => {
            const eventDate = new Date(item.event_date); 
            return { ...item, event_date: eventDate }; 
          });
          setApiData(updatedData);}
    fetchData();
    //setUserID(localStorage.getItem('user_id'));
  }, []);

  useEffect(() => {
    filterTime(true); 
    filterTime(false); 
  }, [apiData]);

  function Personal ({User}) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <Avatar alt={User.name} src={User.profile_pic} style={{ marginRight: '10px' }} />
    <strong>{User.name}</strong>
  </div>
  <Rating name="read-only" defaultValue={0} value={User.score} size="large" precision={0.5} readOnly/>
  <Link to="/Login" style={{ textDecoration: 'none', marginTop: '10px' }}>
    <Button variant="outlined" color="primary">
      <LoginIcon />{' '}Login
    </Button>
  </Link>
</div>
    )
  };

  function Comp_ListBar (InfoProps) {
    return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{InfoProps.BarTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
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
            </Typography>
          </AccordionDetails>
        </Accordion>
    );
  };

  function Comp_ListBar_MyTicket (InfoProps) {
    return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{InfoProps.BarTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div style={{ height: '300px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Event ID</th>
                      <th style={styles.tableHeader}>Event</th>
                      <th style={styles.tableHeader}>Date</th>
                      <th style={styles.tableHeader}>Location</th>
                      <th style={styles.tableHeader}>View</th>
                      <th style={styles.tableHeader}>Edit</th>
                      <th style={styles.tableHeader}>Delete</th>
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
                        <td style={styles.tableCell}>
                          <Button variant="outlined" href={""} color="success">
                              <EditIcon />
                          </Button>
                        </td>
                        <td style={styles.tableCell}>
                          <Button variant="outlined" href={""} color="error">
                              <DeleteIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
    );
  };
  
  const DefaultUser = {
    name: "Anonymous",
    score: 0,
    profile_pic:"https://example.com/profile.jpg"
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">User Info</h1>
        <Personal User={DefaultUser}/>
        <hr />
        <Comp_ListBar_MyTicket BarTitle="My Events" Data={apiData}/>
        <Comp_ListBar BarTitle="Saved Events" Data={apiData}/>
        <Comp_ListBar BarTitle="Incoming Events" Data={EventFuture}/>
        <Comp_ListBar BarTitle="Finished Events" Data={EventPast}/>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default Info;
