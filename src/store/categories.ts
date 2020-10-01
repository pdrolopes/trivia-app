import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAPI } from 'store';
import { Category, retrieveCategories } from 'service/opentdb';

const MAX_CATEGORIES = 6;

type State = {
  items: Array<Category> | undefined;
  loading: boolean;
  error: boolean;
};

const initialState: State = {
  items: undefined,
  loading: false,
  error: false,
};
export const loadCategories = createAsyncThunk<Array<Category>, void, ThunkAPI>(
  'categories/loadCategories',
  retrieveCategories
);

const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCategories.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loadCategories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.items = payload.slice(0, MAX_CATEGORIES);
    });
    builder.addCase(loadCategories.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default categories.reducer;
