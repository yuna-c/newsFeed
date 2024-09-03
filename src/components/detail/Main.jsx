import { supabase } from '../../assets/api/supabase';
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
import { UserAvatar, UserAvatarImg } from '../../styles/common';

export default function Main() {
  const [data, setData] = useState();
  const [users, setUsers] = useState([]); // 유저 정보를 저장할 상태 추가

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

    const getUsers = async () => {
      try {
        let { data, error, status } = await supabase.from('profiles').select('*');

        if (error && status !== 406) {
          console.log('error', error);
          throw error;
        }
        console.log('All Users:', data);
        setUsers(data); // 유저 데이터를 상태에 저장
      } catch (error) {
        console.log(error.message);
      }
    };

    getPages();
    getUsers(); // 전체 유저 정보 가져오기
  }, []);
  console.log('data', data);
  console.log('users', users);
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
                        <p>작성자:{post.username}</p>
                      </PostCardProfile>
                      <PostContent>
                        {' '}
                        <h2 className="post-title">제목:{post.title}</h2>
                      </PostContent>
                      <h3 className="post-subtitle">내용:{post.content}</h3>
                      <PostImg src={post.image} alt={post.title} />
                    </Link>
                  </PostCardContainer>
                );
              })
            ) : (
              <p>No blog posts available.</p>
            )}{' '}
            <h2>전체 유저 목록</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.username} ({user.email})
                  <UserAvatar>
                    <UserAvatarImg
                      src={user?.avatar_url || 'https://via.placeholder.com/150'}
                      alt={user?.username + `님의 프로필` || '유저 프로필'}
                    />
                  </UserAvatar>
                </li>
              ))}
            </ul>
          </PostListContainer>
        </Article>
      </Section>
    </Layout>
  );
}
