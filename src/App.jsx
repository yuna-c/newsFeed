import { useSelector, useDispatch } from 'react-redux';
import { setData } from './redux/slices/functionSlice';
import supabase from './supabase/supabase';

import Router from './shared/Router';

function App() {
  // reduxToolkit 예시
  const dispatch = useDispatch();
  const data = useSelector((state) => state.function.data);
  console.log(`dispatch=>`, dispatch(setData(data)));

  // supabase 예시
  console.log(`supabase=>`, supabase);

  return (
    <>
      <h1>supabase</h1>
      <Router />
    </>
  );
}

export default App;
