import React from 'react';
import Accounts from './Accounts';
import Invoices from './Invoices';
import WatchLists from './WatchLists';
import CashFlow from './CashFlow';
import { Box, Container, Grid } from '@mui/material';

const DashBoard = () => {


  return (
    <div>   
    <Container maxWidth='lg'>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={12}>
            <Accounts/>
          </Grid>
          <Grid item lg={6} sm={12}>
            <Invoices/>
          </Grid>
          <Grid item lg={6} sm={12}>
            <CashFlow/>
          </Grid>
          <Grid item lg={6} sm={12}>
            <WatchLists/>
          </Grid>
        </Grid>
      </Box>    
    </Container>      
    </div>
  )
}

export default DashBoard
