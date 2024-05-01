import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  Footer,
  Navbar,
} from "../components"; //baisc website components

interface InfoProps{
  BarTitle: String;
  Title:  String;
  Date: String;
  Location: String;
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

  function ProductAccordion (props: InfoProps) {
    return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <typography>{props.BarTitle}</typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Event</th>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Location</th>
                  <th style={styles.tableHeader}>View</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>{props.Title}</td>
                  <td style={styles.tableCell}>{props.Date}</td>
                  <td style={styles.tableCell}>{props.Location}</td>
                  <td style={styles.tableCell}>
                    <Button variant="contained" href="">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
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
        <ProductAccordion BarTitle="My Events" Title="BOGOF" Date="2002-01-05" Location="Taipei"/>
        <ProductAccordion BarTitle="Incoming Events" Title="BOGOF" Date="2002-01-05" Location="Taipei"/>
        <ProductAccordion BarTitle="Saved Events" Title="BOGOF" Date="2002-01-05" Location="Taipei"/>
        <ProductAccordion BarTitle="Finished Events" Title="BOGOF" Date="2002-01-05" Location="Taipei"/>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default Info;
