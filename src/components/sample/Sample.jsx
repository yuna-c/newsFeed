import Layout from '../layout/Layout';

import { Section, Article } from '../../styles/layout';

// 공통 레이아웃 페이지 적용 예시 페이지 입니다.
export default function Sample() {
  return (
    <Layout title={'sample'}>
      <Section>
        <h2>Section</h2>
        <Article>
          <h2>Article</h2>
        </Article>
      </Section>
    </Layout>
  );
}
