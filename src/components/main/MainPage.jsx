import { MainPageContainer } from '../../styles/main';
import PostCard from './PostCard';
import PostList from './PostList';

const MainPage = () => {
  console.log('MainPage 렌더링');
  return (
    <MainPageContainer>
      Mainpage
      <PostCard />
    </MainPageContainer>
  );
};
export default MainPage;
