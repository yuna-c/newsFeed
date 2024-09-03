// common styled
import styled from 'styled-components';

// 타이틀
export const Title = styled.h2`
  font-size: 1.8rem;
`;

export const Title2 = styled.h4`
  font-size: 1.4rem;
`;

// 폼
export const FormContainer = styled.form`
  width: 100%;
  min-height: 70vh;
  margin-top: -50px;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const InputField = styled.div`
  padding: 12px;
  display: flex;
  align-items: flex-end;
`;

export const Input = styled.input`
  padding: 5px;
  border-bottom: 1px solid #000;

  &:read-only {
    background-color: #dddddd57;
    color: #aeaaaa;
    border-bottom: 1px solid #000;
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  width: 100px;
  display: inline-block;
`;

// 버튼
export const ButtonContainer = styled.div`
  display: flex;

  & > * {
    margin-top: 30px !important;
    display: inline-block;
    font-size: 1rem;
  }
`;

export const Buttons = styled.button`
  margin: 10px;
  padding: 10px;
  width: 140px;
  height: auto;
  color: #fff;

  background-color: ${(props) => {
    if (props.$yellow) return '#f5b236'; // 노랑 배경
    if (props.$black) return '#000000'; // 검정 배경
    if (props.$red) return '#ff0000'; // 기본 빨간색 배경
    if (props.$blue) return '#0077ff'; // 기본 빨간색 배경
    return '#9a9595'; // 회색 배경
  }};

  border: 0;
  border-radius: 10px;
  font-size: 1rem;
  opacity: 0.5;
  transition: 1.8s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;
// 글쓰기 페이지 폼
export const WriteFormContainer = styled.form`
  ${FormContainer}
  margin-top: 0 !important;
`;

export const WriteInputField = styled.div`
  width: 100%;
  padding: 0 20px 20px;
  display: flex;
`;

export const WriteInput = styled.input`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  &:read-only {
    background-color: #dddddd57;
    color: #aeaaaa;
    border-bottom: 1px solid #000;
    cursor: not-allowed;
  }
`;

export const WriteLabel = styled.label`
  width: 100px;
  padding-top: 10px;
`;

export const WriteTextarea = styled.textarea`
  width: 100%;
  height: 360px;
  padding: 10px;
  border: 1px solid #ddd;
`;

// 글쓰기 페이지 버튼
export const WriteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  & > * {
    margin-top: 30px !important;
    display: inline-block;
    font-size: 1rem;
  }
`;

// 컬러 텍스트 inline
export const ColorText = styled.span`
  color: ${(props) => {
    if (props.$yellow) return '#f5b236'; // 노랑 배경
    if (props.$black) return '#000000'; // 검정 배경
    if (props.$red) return '#ff0000'; // 기본 빨간색 배경
    if (props.$blue) return '#0077ff'; // 기본 빨간색 배경
    return '#9a9595'; // 회색 배경
  }};

  font-weight: 600;
  transition: 1.8s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

// 프로필 이미지
export const ImageContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  background-color: rgba(255, 255, 255, 0.9);
  transition: opacity 1.8s ease-in-out;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
`;

export const CircleContainer = styled.div`
  width: auto;
  margin: 30px;
  cursor: pointer;
`;

export const CircleImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ddd;
  overflow: hidden;
  box-sizing: border-box;
`;

export const CircleTemp = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.8rem;
  color: #fff;
  border: 1px solid #ddd;
  overflow: hidden;
  box-sizing: border-box;
`;

export const OutputText = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  background-color: #aeaaaabf;
  color: white;
  font-size: 1rem;
  transition: 2s ease-in-out;
`;

export const InfoText = styled.div`
  position: relative;
  margin-right: 20px;
  font-weight: bold;

  &::after {
    content: '|';
    position: absolute;
    right: -15px;
    color: #fff;
  }

  /* &:last-of-type::after {
    content: '';
  } */
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ddd;
`;

// 포스트 업로드/ 글 볼때 프로필 이미지
export const UserAvatarContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
`;
export const UserAvatar = styled.span`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  display: inline-block;
  overflow: hidden;
`;

export const UserAvatarSmall = styled.span`
  width: 30px;
  height: 30px;
  padding: 0 !important;
  border-radius: 50%;
  border: 1px solid #ddd;
  display: inline-block;
  overflow: hidden;
`;

export const UserAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

export const UserAvatarTxt = styled.span`
  font-size: 1.2rem;
`;

export const NonData = styled.p``;
