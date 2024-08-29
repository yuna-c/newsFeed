import { Section, Article } from '../../styles/layout';
import Layout from '../layout/Layout';
// 공통 레이아웃 페이지 적용 예시 페이지 입니다.

export default function Mypage() {
  return (
    <Layout title={'myPage'}>
      <Section>
        <h2>Section</h2>
        <Article>
          <h2>Section in the Article</h2>
        </Article>
      </Section>
    </Layout>
  );
}
