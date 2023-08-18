import React, { FC } from 'react';
import { Button, Card, Grid, CardActions, CardContent, CardMedia, Chip, Typography } from '@mui/material';

type BookCardType = {
  status: number;
  title: string;
  author: string;
  published: number;
  pages: number;
  onEdit: (e:unknown) => void;
  onRemove: (e:unknown) => void;
}

const BookCard:FC<BookCardType> = ({
  title,
  author,
  published,
  pages,
  status,
  onEdit,
  onRemove,
}) => {

  type StatusColor = 'primary' | 'warning' | 'success';
  type StatusLabel = 'New' | 'Reading' | 'Finished';

  const colorByStatus: Record<string, StatusColor> = {
    '0': 'primary',
    '1': 'warning',
    '2': 'success',
  };

  const labelByStatus: Record<string, StatusLabel> = {
    '0': 'New',
    '1': 'Reading',
    '2': 'Finished',
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="img"
        height="140"
        image="https://img.freepik.com/premium-photo/open-magic-book-with-light-coming-out-generative-ai_161299-634.jpg?w=1380"
      />
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Chip label={labelByStatus[String(status)]} color={colorByStatus[String(status)]} />
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary">
          {`Author: ${author}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Published: ${published}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Pages: ${pages}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="warning"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          onClick={onRemove}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  )
};

export default BookCard;