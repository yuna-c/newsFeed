import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyPage from '../components/mypage/Mypage';
import Detail from '../detail/Detail';
import MainPage from '../components/main/MainPage';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
