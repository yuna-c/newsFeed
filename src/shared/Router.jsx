import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyPage from '../components/mypage/Mypage';
import Detail from '../detail/Detail';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>예시</div>} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
