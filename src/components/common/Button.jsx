import styled from 'styled-components';

const Buttons = styled.button`
  margin: 10px;
  padding: 10px;
  width: 150px;
  height: auto;
  color: #fff;
  background-color: ${(props) => (props.$yellow ? '#f5b236' : '#ff0000')};
  border: 0;
  border-radius: 10px;
  font-size: 16px;
  opacity: 0.5;
  transition: 1.8s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export default function Button({ children }) {
  return <Buttons className="Button">{children}</Buttons>;
}
