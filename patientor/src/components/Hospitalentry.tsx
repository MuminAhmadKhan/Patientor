import { HospitalEntry } from "../types";
import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
//import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useStateValue } from "../state";

const Hospitalentry = ({entry}:{entry:HospitalEntry}) => {
  const [state,] = useStateValue();
  return (
    
    <>
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      
      <div>HospitalEntry
      <h4>{entry.date}</h4>
        <p>{entry.description}</p>
        {entry.diagnosisCodes?entry.diagnosisCodes.map((code)=>{
        return <p key={code}>{state.diagnosis[code].name} </p>;
      }):""}
        <h3>{entry.discharge.date}</h3>
        <p>{entry.discharge.criteria}</p>
        <p>{entry.specialist}</p>
        
    </div>
    </Container>
  </React.Fragment>
    
    </> 
   
  );
};

export default Hospitalentry;