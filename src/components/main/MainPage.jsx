import { MainPageContainer } from '../../styles/main';
import PostList from './PostList';

const MainPage = () => {
  console.log('MainPage 렌더링');
  return (
    <MainPageContainer>
      Mainpage
      <PostList />
    </MainPageContainer>
  );
};
export default MainPage;
