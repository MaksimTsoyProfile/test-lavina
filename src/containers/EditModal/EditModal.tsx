import React, { FC, useMemo, useState, ChangeEvent } from 'react';
import { Autocomplete, Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { editBook, getBooks } from '../../store/booksSlice';

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

type EditModalType = {
  currentBook: number,
  open: boolean;
  handleClose: () => void;
}

type AutocompleteValueType = {
  label: string;
  value: number;
} | null

const EditModal:FC<EditModalType> = ({
  currentBook,
  open,
  handleClose,
}) => {
  const [status, setStatus] = useState<AutocompleteValueType>(null);
  const [statusId, setStatusId] = useState(0);
  const dispatch = useAppDispatch();
  const key = localStorage.getItem('KEY') || '';
  const secret = localStorage.getItem('SECRET') || '';

  const statuses = useMemo(() => [
    { label: 'New', value: 0 },
    { label: 'Reading', value: 1 },
    { label: 'Finished', value: 2 },
  ], []);

  const handleEdit = async () => {
    const values = {
      id: currentBook,
      body: {
        status: statusId,
      },
      key,
      secret,
    };
    await dispatch(editBook(values));
    await dispatch(getBooks({ key, secret }));
    setStatus(null);
    handleClose();
  };

  return (
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
              Edit status book
            </Typography>
          </Grid>
          <Grid item id="parent-modal-description">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={statuses}
              sx={{ width: 300 }}
              value={status}
              onChange={(event: any, newValue:AutocompleteValueType) => {
                setStatus(newValue);
                setStatusId(newValue ? newValue.value : 0);
              }}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </Grid>
          <Grid item alignSelf="end">
            <Button
              color="primary"
              variant="contained"
              onClick={handleEdit}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditModal;
