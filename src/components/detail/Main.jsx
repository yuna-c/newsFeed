import { useState, useEffect } from 'react';
import { supabase } from '../../assets/api/supabase';
import { Link } from 'react-router-dom';

import Layout from '../layout/Layout';

import { Section, Article } from '../../styles/layout';
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
        </Article>
      </Section>
    </Layout>
  );
}
