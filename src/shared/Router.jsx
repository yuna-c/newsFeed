import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyPage from '../components/mypage/Mypage';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>예시</div>} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
