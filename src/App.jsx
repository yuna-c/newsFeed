import Router from './shared/Router';

import { AuthProvider } from './context/AuthContext';
// import { useSelector, useDispatch } from 'react-redux';
// import { setData } from './redux/slices/functionSlice';

import { Wrap } from './styles/layout';

function App() {
  // reduxToolkit 예시
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.function.data);
  // console.log(`dispatch=>`, dispatch(setData(data)));

  // // supabase 예시
  // console.log(`supabase=>`, supabase);

  return (
    <>
      <Wrap id="Wrap">
        <AuthProvider>
          <Router />
        </AuthProvider>
      </Wrap>
    </>
  );
}

export default App;
