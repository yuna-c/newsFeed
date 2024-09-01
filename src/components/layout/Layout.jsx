import { Main } from '../../styles/layout';

export default function Layout({ children, title }) {
  return (
    <Main className={`${title}`}>
      {/* <h1>{title}</h1> */}
      {children}
    </Main>
  );
}
