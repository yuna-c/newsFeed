// animation styled
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%{transform: rotate(0deg);}
  25% {transform: rotate(-25deg);}
  50% {transform: rotate(25deg);}
  75% {transform: rotate(0);}
`;

const Img = styled.div`
  .img {
    animation: ${bounce} 1.8s infinite ease-in-out;
  }
`;
