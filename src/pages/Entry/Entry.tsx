import React, { FC } from 'react';
import EntryForm from "../../containers/EntryForm";
import { Box, Grid, Paper, Typography } from "@mui/material";
import logo from '../../logo.png';

const Entry:FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={6} justifySelf="center">
                <img src={logo} alt={logo} style={{ width: '100%' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" align="center" style={{marginBottom: '10px'}}>
                  Please Register
                </Typography>
              </Grid>
            </Grid>
            <EntryForm />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Entry;
