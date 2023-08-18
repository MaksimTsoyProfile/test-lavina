import React, { FC } from 'react';
import { Grid, Divider } from '@mui/material';
import Header from '../../containers/Header';
import BookList from '../../containers/BookList';
import SearchBook from '../../containers/SearchBook';

const Main:FC = () => {
  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      sx={{ maxWidth: "1200px", margin: '0 auto' }}
    >
      <Grid item xs={12}>
        <Header />
        <Divider variant="middle" />
        {/*<SearchBook />*/}
        <BookList />
      </Grid>
    </Grid>
  );
};

export default Main;