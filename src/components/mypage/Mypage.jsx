import { Section, Article } from '../../styles/layout';
import Layout from '../layout/Layout';

export default function Mypage() {
  return (
    <Layout title={'myPage'}>
      <Section>
        <h2>Section</h2>
        <Article>
          <h3>Article</h3>
        </Article>
      </Section>
    </Layout>
  );
}
