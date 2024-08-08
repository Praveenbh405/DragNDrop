import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formslice';

const store = configureStore({
  reducer: {
    form: formReducer
  }
});

export default store;
