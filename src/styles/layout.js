import styled from 'styled-components';
/* ${reset} */

export const Wrap = styled.div`
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  overflow: hidden;
  & > * {
    padding: 1rem;
  }
  & > section {
    padding: 1.2rem;
  }
`;

export const Main = styled.main`
  min-height: calc(100vh - 9.5rem);
  position: relative;
`;

export const Aside = styled.aside`
  border: 1px solid orange;
`;

export const Section = styled.section``;

export const Article = styled.article`
  min-height: calc(100vh - 12rem);
  & > * {
    padding: 1rem;
  }
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
  }
`;

export const LogoDiv = styled.div`
  border: 1px solid red;
  margin: 10px;
  display: flex;
`;
