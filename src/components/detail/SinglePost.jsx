import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../assets/api/supabase';

import Layout from '../layout/Layout';
import Button from '../common/Button';

import { Article, Section } from '../../styles/layout';

const SinglePost = () => {
  let { id } = useParams();
  const [data, setData] = useState();
  const { user } = useAuth();
  let navigate = useNavigate();
  console.log('data:', data);

  useEffect(() => {
    const getPost = async () => {
      try {
        let { data, error, status } = await supabase.from('post').select('*').eq('id', id);

        if (error && status !== 406) {
          console.log('error', error);
          throw error;
        }

        setData(data[0]);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPost();
  }, [id]);

  // 포스트 삭제 함수
  const deletePost = async () => {
    const confirmDelete = window.confirm('이 포스트를 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.from('post').delete().eq('id', id);

      if (error) {
        console.error('삭제 중 오류 발생:', error);
        return;
      }

      alert('포스트가 성공적으로 삭제되었습니다.');
      // navigate('/'); // 메인 페이지로 이동 후 데이터를 다시 로드하게 됩니다.
    } catch (error) {
      console.error('삭제 중 오류 발생:', error.message);
    }
  };

  return (
    <Layout title={'SinglePost'}>
      <Section>
        <Article>
          <h2>작성글 확인</h2>
          <h4>{data ? data.title : ''}</h4>
          <p>{data ? data.description : ''}</p>
          <p>{data ? data.content : ''}</p>

          <img
            style={{ maxWidth: '1000px', width: '-webkit-fill-available' }}
            src={data ? data.image : ''}
            alt={data ? data.image : ''}
          />
          <p>{data ? `1. ${data.created_at.slice(0, 10)} ${data.created_at.slice(11, 19)}` : ''}</p>

          <Button>수정</Button>
          <Button onClick={deletePost} $yellow>
            삭제삭제
          </Button>
        </Article>
      </Section>
    </Layout>
  );
};
export default SinglePost;
