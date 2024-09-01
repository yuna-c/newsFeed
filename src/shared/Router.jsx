import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MainPage from '../components/main/MainPage';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import MyPage from '../components/mypage/Mypage';
import Detail from '../detail/Detail';
import Write from '../components/WritePage/Write';
import DropUser from '../components/auth/DropUser';

import UnauthRoute from './UnauthRoute';
import AuthRoute from './AuthRouter';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route element={<UnauthRoute />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/write" element={<Write />} />
            <Route path="/drop" element={<DropUser />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
