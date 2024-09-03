import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from '../components/detail/Main';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import MyPage from '../components/mypage/Mypage';
import Detail from '../components/detail/Detail';
import Post from '../components/post/Post';
import SinglePost from '../components/detail/SinglePost';
import UpdatePost from '../components/detail/updatePost';

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
            <Route path="/detail" element={<Detail />} />
            <Route path="/post" element={<Post />} />
            <Route path="/singlepost/:id" element={<SinglePost />} />
            <Route path="/updatePost/:id" element={<UpdatePost />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
