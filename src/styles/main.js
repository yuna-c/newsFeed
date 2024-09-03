import styled from 'styled-components';

// 메인
export const MainPageContainer = styled.div`
  background-color: blue;
`;

// 카드리스트
export const PostListContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  justify-items: center;
  gap: 40px;
`;

// 단일 포스트
export const PostCardContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  border: 1px solid #e0e0e0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  > * {
    width: 100%;
  }
`;

// 프로필 이미지, 이름 구역
export const PostCardProfile = styled.div`
  background-color: #f0f0f0;
  display: flex;
  gap: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #333;
  border-radius: 4px 4px 0 0;

  & > .time-text {
    color: #888;
    font-size: 0.6rem;
  }

  @media (max-width: 1300px) {
    flex-wrap: wrap;
    gap: 0;

    & > .time-text {
      margin-left: 40px;
    }
  }
`;

// 묶는 태그
export const PostUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// 빈태그
export const PostText = styled.p``;

// 해시태그
export const HashContainer = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
`;

export const HashText = styled.p`
  min-width: 50px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #ddd;
  border-radius: 20px;
  font-size: 0.7rem;
`;

export const PostContent = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  width: 100%;
  color: #333;
`;

export const PostImg = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

export const LikeButton = styled.div`
  background-color: orange;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
