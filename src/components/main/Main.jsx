import { supabase } from '../../assets/api/supabase';
import { useState, useEffect } from 'react';

import { Section, Article } from '../../styles/layout';
import { Link } from 'react-router-dom';

import Layout from '../layout/Layout';
import { ColorText, NonData, Title, UserAvatarImg, UserAvatarSmall } from '../../styles/common';
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

        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPages();
  }, []);

  // 유저 정보를 저장할 상태 추가
  // const [users, setUsers] = useState([]);

  // 개인 프로필 가져오기
  // const getUsers = async () => {
  //   try {
  //     let { data, error, status } = await supabase.from('profiles').select('*');
  //     if (error && status !== 406) {
  //       console.log('error', error);
  //       throw error;
  //     }
  //     setUsers(data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  //getUsers();

  // console.log('유저 데이터 Post =>', data);
  // console.log('프로필 데이터 Profile =>', users);

  return (
    <Layout title={'main'}>
      <Section>
        <Article>
          <Title>짤 포스트</Title>

          <PostListContainer>
            {data ? (
              data.map((post) => {
                // console.log(`프로필 정보 =>`, post);
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
              <NonData>포스팅 글이 없습니다. </NonData>
            )}
          </PostListContainer>
        </Article>
      </Section>
    </Layout>
  );
}
