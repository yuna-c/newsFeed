import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MainPage from '../components/main/MainPage';
import SignIn from '../components/AuthPages/SignIn';
import SignUp from '../components/AuthPages/SignUp';
import MyPage from '../components/mypage/Mypage';
import Detail from '../detail/Detail';
import Write from '../components/WritePage/Write';

export default function Router() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}
