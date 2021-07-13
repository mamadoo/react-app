import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  value: 1,
};

export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount) => {
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(amount);
      }, 2000);
    });

    return result;
  },
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.value += action.payload;
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
