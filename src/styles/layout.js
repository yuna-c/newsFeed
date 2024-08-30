// layout styled
import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  > * {
    padding: 1rem;
  }
`;
export const Main = styled.main`
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
`;
export const FooterDiv = styled.footer`
  background-color: #ddd;
`;
