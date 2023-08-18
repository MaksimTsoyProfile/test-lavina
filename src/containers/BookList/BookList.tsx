import React, { FC, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import BookCard from '../../components/BookCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBooks, removeBook } from '../../store/booksSlice';
import EditModal from '../EditModal';

type BookType = {
  book: {
    id: number;
    isbn: string;
    title: string;
    cover: string;
    author: string;
    published: number;
    pages: number;
  },
  status: number;
}

type BooksType = {
  data: BookType[];
  isOk?: boolean;
  message?: string;
}

const BookList:FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(0);
  const books:BooksType = useAppSelector((state) => state.books.list);
  const key = localStorage.getItem('KEY') || '';
  const secret = localStorage.getItem('SECRET') || '';

  useEffect(() => {
    const values = {
      key,
      secret,
    }
    dispatch(getBooks(values));
  }, []);

  const handleChoose = (id:number) => () => {
    setOpen(true)
    setCurrentBook(id);
  };

  const handleRemove = (id:number) => async () => {
    const values = {
      id,
      key,
      secret,
    };
    await dispatch(removeBook(values));
    await dispatch(getBooks({ key, secret }));
  };

  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      {
        books.data && books.data.length > 0 ? (
          books.data.map((item) => (
            <Grid item key={item.book.id} xs={12} sm={6} md={4}>
              <BookCard
                status={item.status}
                title={item.book.title}
                author={item.book.author}
                published={item.book.published}
                pages={item.book.pages}
                onEdit={handleChoose(item.book.id)}
                onRemove={handleRemove(item.book.id)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h2" component="h2">
            Библиотека пустая
          </Typography>
        )
      }
      <EditModal
        currentBook={currentBook}
        open={open}
        handleClose={() => {setOpen(false)}}
      />
    </Grid>
  )
};

export default BookList;
