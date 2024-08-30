import supabase from './api/supabase';
import Router from './shared/Router';

import { useSelector, useDispatch } from 'react-redux';
import { setData } from './redux/slices/functionSlice';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Wrap } from './styles/layout';

function App() {
  // reduxToolkit 예시
  const dispatch = useDispatch();
  const data = useSelector((state) => state.function.data);
  console.log(`dispatch=>`, dispatch(setData(data)));

  // supabase 예시
  console.log(`supabase=>`, supabase);

  return (
    <>
      <h1>test branch 입니다!</h1>
      <Router />
    </>
  );
}

export default App;
