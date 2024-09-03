import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MainPage from '../components/main/MainPage';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import MyPage from '../components/mypage/Mypage';
import Detail from '../components/detail/Detail';
import Write from '../components/WritePage/Write';
import DropUser from '../components/auth/DropUser';
import Main from '../components/detail/Main';
import SinglePost from '../components/detail/SinglePost';

import UnauthRoute from './UnauthRoute';
import AuthRoute from './AuthRouter';
import AddPost from '../components/post/AddPost';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route element={<UnauthRoute />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/detail" element={<Detail />} />
            {/* 에디터  */}
            <Route path="/write" element={<Write />} />
            {/* 일단 add post 이미지 업로드 성공 */}
            <Route path="/addpost" element={<AddPost />} />
            {/* 개인 글 이동 : 수정 삭제 버튼 아직 안됌 */}
            <Route path="/singlepost/:id" element={<SinglePost />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/drop" element={<DropUser />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
