import { supabase } from '../../api/supabase';
import { useState, useEffect } from 'react';

import { Section, Article } from '../../styles/layout';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';

export default function Main() {
  const [data, setData] = useState();

  useEffect(() => {
    const getPages = async () => {
      try {
        let { data, error, status } = await supabase.from('post').select('*');

        if (error && status !== 406) {
          console.log('error', error);
          throw error;
        }
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPages();
  }, []);

  return (
    <Layout title={'main'}>
      <Section>
        <Article>
          <h2>메인 페이지</h2>

          {data ? (
            data.map((post) => {
              return (
                <div key={post.id}>
                  <div className="post-preview">
                    <Link to={`/singlepost/${post.id}`}>
                      <h2 className="post-title">{post.title}</h2>
                      <h3 className="post-subtitle">{post.description}</h3>
                    </Link>
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>No blog posts available.</p>
          )}
        </Article>
      </Section>
    </Layout>
  );
}
