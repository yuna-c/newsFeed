import { supabase } from '../../assets/api/supabase';
import { useState, useEffect } from 'react';

import { Section, Article } from '../../styles/layout';
import { Link } from 'react-router-dom';

import Layout from '../layout/Layout';
import { ColorText, Title, UserAvatarImg, UserAvatarSmall } from '../../styles/common';
import {
  PostCardContainer,
  PostListContainer,
  PostCardProfile,
  PostContent,
  PostImg,
  PostText,
  PostUserInfo,
  HashText,
  HashContainer
} from '../../styles/main';

export default function MyPost() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyPosts = async () => {
      try {
        // 현재 로그인한 사용자 정보 가져오기
        const {
          data: { user },
          error
        } = await supabase.auth.getUser();

        if (error) {
          console.error('사용자 정보를 가져오는 중 오류 발생:', error);
          return;
        }

        if (!user || !user.id) {
          console.error('사용자가 로그인되지 않았습니다.');
          return;
        }

        // 해당 사용자의 작성글만 가져오기
        let { data, error: postError, status } = await supabase.from('post').select('*').eq('user_id', user.id); // user_id가 현재 로그인한 사용자의 ID와 같은지 확인

        if (postError && status !== 406) {
          console.log('error', postError);
          throw postError;
        }

        setData(data);
      } catch (error) {
        console.log('포스팅 데이터를 가져오는 중 오류 발생:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getMyPosts();
  }, []);

  return (
    <Layout title={'MyPost'}>
      <Section>
        <Article>
          <Title>내 작성글</Title>

          <PostListContainer>
            {loading ? (
              <p>로딩 중...</p>
            ) : data && data.length > 0 ? (
              data.map((post) => {
                console.log(post.user_id);
                const username = post.username
                  ? post.username.includes('@')
                    ? post.username.split('@')[0]
                    : post.username
                  : '알 수 없는 사용자';
                const hashtags = post.description.split('#').filter((tag) => tag.trim() !== '');
                return (
                  <PostCardContainer key={post.id}>
                    <Link to={`/detail/${post.id}`}>
                      <PostCardProfile>
                        <PostUserInfo>
                          <UserAvatarSmall>
                            <UserAvatarImg
                              src={post?.user_profile || 'https://via.placeholder.com/150'}
                              alt={post?.username + `님의 프로필` || username + '님의 프로필'}
                            />
                          </UserAvatarSmall>
                          <PostText>{username}</PostText>
                        </PostUserInfo>
                        <PostText className="time-text">
                          {post.created_at.slice(0, 10) + ' '} {post.created_at.slice(11, 19)}
                        </PostText>
                      </PostCardProfile>
                      <PostContent>
                        <ColorText $red>{post.title}</ColorText>
                      </PostContent>

                      <PostImg src={post.image} alt={post.title} />
                      <HashContainer>
                        {hashtags.map((tag, index) => (
                          <HashText key={index}>#{tag.trim()}</HashText>
                        ))}
                      </HashContainer>
                    </Link>
                  </PostCardContainer>
                );
              })
            ) : (
              <p>포스팅 글이 없습니다. </p>
            )}
          </PostListContainer>
        </Article>
      </Section>
    </Layout>
  );
}
