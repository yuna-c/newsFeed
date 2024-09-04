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

export const HeaderContainer = styled.header`
  background-color: #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
`;
export const FooterContainer = styled.footer`
  background-color: #ddd;
  border-top: 1px solid #ddd;
  display: flex;
`;

export const NavContainer = styled.ul`
  display: flex;
  align-items: center;

  li {
    margin: 10px;
  }
`;

export const LogoContainer = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  & > a {
    display: flex;
  }
`;

export const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
