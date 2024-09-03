import { supabase } from '../../api/supabase';
import { useState, useEffect } from 'react';

import { Section, Article } from '../../styles/layout';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import {
  PostCardContainer,
  PostCardProfile,
  PostContent,
  PostImg,
  PostListContainer,
  VisitMent
} from '../../styles/main';

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
          <VisitMent>
            <h2>방문해주셔서 감사합니다! 여러분의 하루를 공유해주세요!</h2>
          </VisitMent>
          <PostListContainer>
            {data ? (
              data.map((post) => {
                console.log(post.image);
                return (
                  <PostCardContainer key={post.id}>
                    <Link to={`/singlepost/${post.id}`}>
                      <PostCardProfile>
                        <p>작성자:{post.user_name}</p>
                      </PostCardProfile>
                      <PostContent>
                        {' '}
                        <h2 className="post-title">제목:{post.title}</h2>
                      </PostContent>
                      <h3 className="post-subtitle">내용:{post.description}</h3>
                      <PostImg src={post.image} alt={post.title} />
                    </Link>
                  </PostCardContainer>
                );
              })
            ) : (
              <p>No blog posts available.</p>
            )}
          </PostListContainer>
        </Article>
      </Section>
    </Layout>
  );
}
