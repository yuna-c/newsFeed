import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MyPage from '../components/mypage/Mypage';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/Signup';
import Detail from '../detail/Detail';
import AddPost from '../components/post/AddPost';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/detail" element={<Detail />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/addpost" element={<AddPost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
