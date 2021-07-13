import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import counterReducer from '../features/counter/counterSlice';
import { pokemanApi } from '../services/pokeman';

const rootReducer = combineReducers({
  counter: counterReducer,
  [pokemanApi.reducerPath]: pokemanApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemanApi.middleware),
});

setupListeners(store.dispatch);
