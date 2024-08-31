import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyPage from '../components/mypage/Mypage';
import Detail from '../detail/Detail';
import MainPage from '../components/main/MainPage';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

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
          <Route path="/write" element={<Write />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}
