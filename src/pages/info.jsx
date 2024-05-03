import React , { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Footer,
  Navbar,
} from "../components"; //baisc website components

const apiUrl = process.env.REACT_APP_API_URL;

interface InfoProps{
  BarTitle: String;
}

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
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const result = await fetch(`${apiUrl}/api/event`)
      result.json().then(json => {
        console.log(json)
        setApiData(json.data)
      })
    };
    fetchData();
  }, []);

  function ProductAccordion (props: InfoProps) {
    return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <typography>{props.BarTitle}</typography>
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
                    {apiData.map(event => (
                      <tr key={event.id}>
                        <td style={styles.tableCell}>{event.id}</td>
                        <td style={styles.tableCell}>{event.event_name}</td>
                        <td style={styles.tableCell}>{event.event_date}</td>
                        <td style={styles.tableCell}>{event.location}</td>
                        <td style={styles.tableCell}>
                          <Button variant="contained" href={""}>
                            View
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
        <ProductAccordion BarTitle="My Events"/>
        <ProductAccordion BarTitle="Incoming Events"/>
        <ProductAccordion BarTitle="Saved Events"/>
        <ProductAccordion BarTitle="Finished Events"/>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default Info;
