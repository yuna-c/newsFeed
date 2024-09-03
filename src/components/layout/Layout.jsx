import { Main } from '../../styles/layout';

export default function Layout({ children, title }) {
  return <Main className={`${title}`}>{children}</Main>;
}
