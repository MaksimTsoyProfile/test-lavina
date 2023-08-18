import { combineReducers, configureStore } from '@reduxjs/toolkit';
import entryReducer from './entrySlice';
import booksReducer from './booksSlice';

export const combineReducer = combineReducers({
  entry: entryReducer,
  books: booksReducer,
})

export const store = configureStore({
  reducer: combineReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;