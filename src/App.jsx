import Router from './shared/Router';
import { AuthProvider } from './context/AuthContext';
import { Wrap } from './styles/layout';

// import { useSelector, useDispatch } from 'react-redux';
// import { setData } from './redux/slices/functionSlice';

export default function App() {
  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.function.data);
  // console.log(`dispatch=>`, dispatch(setData(data)));
  // console.log(`supabase=>`, supabase);

  return (
    <Wrap id="Wrap">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Wrap>
  );
}
