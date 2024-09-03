import styled from 'styled-components';

// /src/main/MainPage.jsx (메인 페이지)
export const MainPageContainer = styled.div`
  background-color: blue;
`;

// /src/main/PostList.jsx (포스트 카드의 리스트 대한 페이지)
export const PostListContainer = styled.div`
  background-color: transparent;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 그리드 컬럼을 명시적으로 지정 */
  gap: 20px;
  justify-items: center; /* 그리드 아이템을 가운데 정렬 */
  padding: 20px;
`;

// /src/main/PostCard.jsx (포스트 1개에 대한 페이지)
export const PostCardContainer = styled.div`
  background-color: #ffffff; /* 배경색을 흰색으로 변경 */
  width: 100%;
  max-width: 280px; /* 카드의 최대 너비를 조금 더 넓게 설정 */
  border: 1px solid #e0e0e0; /* 부드러운 회색 테두리 추가 */
  padding: 0; /* 내부 패딩 제거 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto; /* 카드 높이를 자동으로 설정 */
  border-radius: 10px; /* 카드에 둥근 모서리 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 카드에 부드러운 그림자 추가 */
  overflow: hidden; /* 내용이 넘칠 경우 잘리도록 설정 */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 호버 시 효과 추가 */

  &:hover {
    transform: translateY(-10px); /* 호버 시 카드가 위로 이동 */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 더 강조 */
  }
`;

export const PostCardProfile = styled.div`
  background-color: #f0f0f0; /* 배경색을 부드러운 회색으로 변경 */
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* 좌우 여백을 줘서 양 끝으로 정렬 */
  align-items: center;
  padding: 10px; /* 여백 추가 */
  width: 100%;
  border-bottom: 1px solid #ddd; /* 아래쪽에 얇은 선 추가 */
  font-size: 14px; /* 글씨 크기 설정 */
  color: #333; /* 글씨 색상 설정 */
  border-radius: 4px 4px 0 0; /* 상단 모서리 둥글게 설정 */
`;

export const PostContent = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* 텍스트를 왼쪽 정렬 */
  padding: 15px; /* 여백 추가 */
  width: 100%;
  color: #333;

  h2 {
    font-size: 18px; /* 제목 크기 설정 */
    font-weight: bold;
    margin-bottom: 10px; /* 제목과 내용 사이의 간격 설정 */
  }

  h3 {
    font-size: 14px;
    color: #777; /* 내용의 글씨 색상 설정 */
  }
`;

export const PostImg = styled.img`
  width: 100%; /* 컨테이너의 너비에 맞게 조정 */
  height: auto; /* 비율을 유지하면서 높이를 자동 조정 */
  object-fit: cover; /* 이미지가 잘리거나 확대/축소될 때 비율을 유지하며 잘라냄 */
  max-height: 150px; /* 이미지의 최대 높이 설정 */
  border-radius: 8px; /* 이미지에 둥근 모서리 추가 (선택사항) */
  margin-bottom: 10px;
`;

export const LikeButton = styled.div`
  background-color: orange;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const VisitMent = styled.div`
  text-align: center;
`;
