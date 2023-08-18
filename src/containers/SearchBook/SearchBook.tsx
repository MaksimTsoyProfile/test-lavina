import React, { useState } from 'react';
import { Grid, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../hooks';
import { searchBook } from '../../store/booksSlice';

const SearchBook = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const key = localStorage.getItem('KEY') || '';
  const secret = localStorage.getItem('SECRET') || '';

  const handleSubmit = async () => {
    const values = {
      key,
      secret,
      title: value,
    };
    await dispatch(searchBook(values));
    setValue('');
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Paper
          sx={{
            m: '10px',
            p: '4px 8px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Books"
            inputProps={{ 'aria-label': 'search books' }}
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
          />
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            onClick={handleSubmit}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  )
};

export default SearchBook;