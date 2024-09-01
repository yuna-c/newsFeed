import styled from 'styled-components';
import '@toast-ui/editor/dist/toastui-editor.css';
/* ${reset} */
export const Wrap = styled.div`
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  overflow: hidden;
  > * {
    padding: 1rem;
  }
`;

export const Main = styled.main`
  min-height: calc(100vh - 6rem);
  border: 1px solid green;
`;

export const Aside = styled.aside`
  border: 1px solid orange;
`;

export const Section = styled.section`
  min-height: calc(100vh - 6rem);
  border: 1px solid red;
`;

export const Article = styled.article`
  border: 1px solid yellow;
`;

export const HeaderDiv = styled.header`
  background-color: #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
`;

export const FooterDiv = styled.footer`
  background-color: #ddd;
  border-top: 1px solid #ddd;
  display: flex;
`;

export const NavDiv = styled.ul`
  display: flex;

  li {
    margin: 10px;
    display: flex;
  }
`;

export const LogoDiv = styled.div`
  border: 1px solid red;
  margin: 10px;
  display: flex;
`;
