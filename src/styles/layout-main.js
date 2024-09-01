import styled from 'styled-components';

// /src/main/MainPage.jsx (메인 페이지)
export const MainPageContainer = styled.div`
  background-color: blue;
`;

// /src/main/PostList.jsx (포스트 카드의 리스트 대한 페이지)
export const PostListContainer = styled.div`
  background-color: yellow;
`;

// /src/main/PostCard.jsx (포스트 1개에 대한 페이지)
export const PostCardContainer = styled.div`
  background-color: red;
  width: 300px;
  height: 300px;
  border: 1px solid blue;
  margin: 20px auto;
`;

export const PostCardProfile = styled.div`
  background-color: orange;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PostContent = styled.div`
  background-color: orange;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const PostImg = styled.div`
  background-color: orange;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LikeButton = styled.div`
  background-color: orange;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;