import styled from 'styled-components';

export const SingleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const PostCard = styled.div`
  min-height: calc(100vh - 12rem);
  /* 왼쪽 열이 더 넓게 설정됨 */
  flex: 2;
`;

export const PostComment = styled.div`
  padding-left: 20px;
  border-left: 1px solid #ddd;
  flex: 1;
`;

export const PostCommentList = styled.div`
  margin-top: 20px;
`;

export const PostCommentWrite = styled.div``;

export const TimeText = styled.p`
  margin: 20px 0 0;
  color: #888;
  font-size: 0.8rem;
`;

export const FileImg = styled.img`
  max-width: 900px;
  margin: 20px 0 30px;
`;

export const PostWrite = styled.p`
  word-break: break-all;
  line-height: 1.4;
  font-weight: 200;
`;

export const PostFormContainer = styled.form`
  margin: 10px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
`;

export const PostButtonContainer = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: flex-end;
`;

export const PostCommentText = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PostTimeText = styled.div`
  color: #888;
  font-size: 0.8rem;
`;

export const PostCommentButtonContainer = styled.div`
  display: flex;

  & > * {
    width: calc(100% / 2);
  }
`;
