import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import logo from '../../logo.png';
import { useAppDispatch } from '../../hooks';
import { getMe } from '../../store/entrySlice';
import { createBook, getBooks } from '../../store/booksSlice';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Header:FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isbn, setIsbn] = useState('');
  const navigate = useNavigate();
  const key = localStorage.getItem('KEY') || '';
  const secret = localStorage.getItem('SECRET') || '';

  useEffect(() => {
    if(secret && key) {
      const values = {
        key,
        secret,
      };
      dispatch(getMe(values));
    }
  }, [secret, key]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateBook = async () => {
    const values = {
      body: {
        isbn,
      },
      key,
      secret,
    };
    await dispatch(createBook(values));
    await dispatch(getBooks({ key, secret }));
    handleClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Grid container justifyContent="space-between" spacing={2} alignItems="center" sx={{ padding: '20px' }}>
      <Grid item xs={4}>
        <img src={logo} alt={logo} style={{ width: '100px', height: '100px' }} />
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2} alignItems="center" justifyContent="end">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              Create book
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create book
              </Typography>
            </Grid>
            <Grid item id="parent-modal-description">
              <TextField
                label="isbn"
                fullWidth
                type="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </Grid>
            <Grid item alignSelf="end">
              <Button
                color="primary"
                variant="contained"
                onClick={handleCreateBook}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  )
};

export default Header;