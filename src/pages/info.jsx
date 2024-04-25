import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import {
  Footer,
  Navbar,
} from "../components"; //baisc website components

interface InfoProps{
  title: String;
  content: JSX.Element;
}

const Info = () => {
  /*const bars = [
    "My Events",
    "Future Events",
    "Saved Events",
    "Finished Events",
  ];
  let [selectedIndex, setSelectedIndex] = useState(-1);
  
  <ul className="list-group">
  {bars.map((item, index)=> <li className={selectedIndex === index ? "list-group-item active":"list-group-item"} onClick={() => {setSelectedIndex(index);}} key={item}>{item}</li>)}
  </ul>*/

  function ProductAccordion (props: InfoProps) {
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{ props.title }</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>{ props.content }</strong>
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
        <ProductAccordion title="My Event" content={<strong>Here are the events you've created</strong>}/>
        <ProductAccordion title="Incoming Event" content={<strong>Here are the events you will be paricipating</strong>}/>
        <ProductAccordion title="Saved Event" content={<strong>Here are the events you are interested in</strong>}/>
        <ProductAccordion title="Finished Event" content={<strong>Here are the events you've attend or expired</strong>}/>
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default Info;
