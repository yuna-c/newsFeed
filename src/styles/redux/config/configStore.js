import { configureStore } from '@reduxjs/toolkit';
import functionSlice from '../slices/functionSlice';

// store 예시 입니다.
const store = configureStore({
  reducer: { function: functionSlice }
});

export default store;
