import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { routes } from '../routes';
import { toast } from 'react-toastify';
import { getSign } from '../utils';

interface ISignUpData {
  name: string;
  email: string;
  key: string;
  secret: string;
}

interface IEntryState {
  data?: {
    id: number,
    name: string,
    email: string,
    key: string,
    secret: string,
  }
  isOk?: boolean,
  message?: string,
}

interface IUserState {
  user: IEntryState;
}

export const signUp = createAsyncThunk<IEntryState, ISignUpData, {rejectValue: string}>(
  'entry/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.signUp(), data);
      localStorage.setItem('KEY', response.data.data.key);
      localStorage.setItem('SECRET', response.data.data.secret);
      return response.data;
    } catch (e: any) {
      toast.error(e.response.data.message);
      return rejectWithValue(e.message);
    }
  },
);

export const getMe = createAsyncThunk<IEntryState, {key: string, secret: string}, {rejectValue: string}>(
  'entry/getMe',
  async ({key, secret}, { rejectWithValue }) => {
    try {
      const sign = getSign({
        method: 'GET',
        url: '/myself',
        body: '',
        secret: secret,
      });
      const response = await axios.get(routes.getMe(), {
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

const initialState: IUserState = {
  user: {},
}

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
};

const entry = createSlice({
  name: 'entry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {})
  }
});

export const {  } = entry.actions;

export default entry.reducer;