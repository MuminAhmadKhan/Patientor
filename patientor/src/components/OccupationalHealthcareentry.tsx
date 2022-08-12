import {  OccupationalHealthcareEntry } from "../types";
import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
//import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useStateValue } from "../state";
const OccupationalHealthcareentry = ({entry}:{entry:OccupationalHealthcareEntry}) => {
  const [state, ] = useStateValue();
  return (
    <>
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      
      <div>Occupational Health Care Entry
      <h4>{entry.date}</h4>
      <h3>{entry.employerName}</h3>
      <p>{entry.description}</p>
      {entry.diagnosisCodes?entry.diagnosisCodes.map((code)=>{
        return <p key={code}>{state.diagnosis[code].name} </p>;
      }):""}
      {entry.sickLeave?<p>Sick Leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>:""}
        
        <p>{entry.specialist}</p>
        
    </div>
    </Container>
  </React.Fragment>
    
    </>
  );
};

export default OccupationalHealthcareentry;