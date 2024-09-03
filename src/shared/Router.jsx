import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '../components/main/Main';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Post from '../components/post/Post';
import MyPage from '../components/mypage/Mypage';
import MyPost from '../components/myPost/MyPost';
import UpdatePost from '../components/post/updatePost';
import Detail from '../components/detail/Detail';

import AuthRoute from './AuthRouter';
import UnauthRoute from './UnauthRoute';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route element={<UnauthRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<AuthRoute />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypost" element={<MyPost />} />
            <Route path="/detail/:id" element={<Detail />} />

            <Route path="/post" element={<Post />} />
            <Route path="/updatepost/:id" element={<UpdatePost />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
