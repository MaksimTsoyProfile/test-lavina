import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { routes } from '../routes';
import { toast } from 'react-toastify';
import { getSign, makeBodyString } from '../utils';

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
  list: {
    data: BookType[];
    isOk: boolean;
    message: string;
  };
}

type CreateBookTypeData = {
  body: {
    isbn: string;
  },
  key: string;
  secret: string;
}

type EditBookTypeData = {
  body: {
    status: number;
  },
  key: string;
  secret: string;
  id: number;
}

type RemoveBookTypeData = {
  key: string;
  secret: string;
  id: number;
}

export const getBooks = createAsyncThunk<BookType[], {key: string, secret: string}, {rejectValue: string}>(
  'books/getBooks',
  async ({key, secret}, { rejectWithValue }) => {
    try {
      const sign = getSign({
        method: 'GET',
        url: '/books',
        body: '',
        secret: secret,
      });
      const response = await axios.get(routes.getBooks(), {
        headers: {
          Key: key,
          Sign: sign,
        }
      });
      return response.data;
    } catch (e: any) {
      toast.error(e.response.data.message);
      return rejectWithValue(e.message);
    }
  },
);

export const searchBook = createAsyncThunk<BookType[], {key: string, secret: string, title: string}, {rejectValue: string}>(
  'books/searchBook',
  async ({key, secret, title}, { rejectWithValue }) => {
    try {
      const sign = getSign({
        method: 'GET',
        url: `/books/${title}`,
        body: '',
        secret: secret,
      });
      const response = await axios.get(routes.searchBook(title), {
        headers: {
          Key: key,
          Sign: sign,
        }
      });
      return response.data;
    } catch (e: any) {
      toast.error(e.response.data.message);
      return rejectWithValue(e.message);
    }
  },
);

export const createBook = createAsyncThunk<BookType, CreateBookTypeData>(
  'books/createBook',
  async ({ body, key, secret}) => {
    try {
      const sign = getSign({
        method: 'POST',
        url: '/books',
        body: JSON.stringify(body),
        secret: secret,
      });

      await axios.post(routes.getBooks(), body, {
        headers: {
          Key: key,
          Sign: sign,
        }
      })
    } catch (e:any) {
      toast.error(e.response.data.message);
      return e.message;
    }
  }
);

export const editBook = createAsyncThunk<BookType, EditBookTypeData>(
  'books/editBook',
  async ({ id, body, key, secret}) => {
    try {
      const sign = getSign({
        method: 'PATCH',
        url: `/books/${id}`,
        body: JSON.stringify(body),
        secret: secret,
      });

      await axios.patch(routes.booksById(id), body, {
        headers: {
          Key: key,
          Sign: sign,
        }
      })
    } catch (e:any) {
      toast.error(e.response.data.message);
      return e.message;
    }
  }
);

export const removeBook = createAsyncThunk<BookType, RemoveBookTypeData>(
  'books/removeBook',
  async ({ id, key, secret}) => {
    try {
      const sign = getSign({
        method: 'DELETE',
        url: `/books/${id}`,
        body: '',
        secret: secret,
      });

      await axios.delete(routes.booksById(id), {
        headers: {
          Key: key,
          Sign: sign,
        }
      })
    } catch (e:any) {
      toast.error(e.response.data.message);
      return e.message;
    }
  }
);

const initialState: BooksType = {
  list: {
    data: [],
    isOk: false,
    message: '',
  },
}

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
};

const books = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.fulfilled, (state, action) => {
        // @ts-ignore
        state.list = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {})
  }
});

export const {  } = books.actions;

export default books.reducer;