// function = 폴더 기능 예시 입니다.
import { createSlice } from '@reduxjs/toolkit';

// Init
const initialState = {
  data: []
};

// CreateSlice
const functionSlice = createSlice({
  name: 'function',
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
});

// Action, Reducer
export const { setData } = functionSlice.actions;
export default functionSlice.reducer;
