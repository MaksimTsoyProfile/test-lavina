import React, { FC, useState } from 'react';
import { Button, Grid, TextField } from "@mui/material";
import { signUp } from '../../store/entrySlice';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const EntryForm:FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [secret, setSecret] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleRegister = async () => {
    const normalizedValues = {
      name,
      email,
      key,
      secret,
    };
    await dispatch(signUp(normalizedValues)).unwrap();
    navigate('app')
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Key"
          fullWidth
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Secret"
          fullWidth
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default EntryForm;
