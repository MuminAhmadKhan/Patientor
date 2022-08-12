import React from 'react';
import { HealthCheckEntry } from '../types';
import CssBaseline from '@mui/material/CssBaseline';
//import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function HealthcheckEntry({entry}:{entry:HealthCheckEntry}) {
  return (<>
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      
      <div>HealthCheckEntry
      <h4>{entry.date}</h4>
        <p>{entry.description}</p>
        
        <h3>{entry.healthCheckRating}</h3>
        <p>{entry.specialist}</p>
        
    </div>
    </Container>
  </React.Fragment>
    
    </>
  );
}

export default HealthcheckEntry;