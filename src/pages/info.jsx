import React , { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button} from '@mui/material';
import Grid from '@mui/material/Grid';
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
  }, []);

  useEffect(() => {
    filterTime(true); 
    filterTime(false); 
  }, [apiData]);
  
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

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Personal Info</h1>
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
