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

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/write" element={<Write />} />
          <Route path="/drop" element={<DropUser />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Footer />
    </>
  );
}
