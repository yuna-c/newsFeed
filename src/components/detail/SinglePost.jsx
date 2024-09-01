import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../api/supabase';

import Layout from '../layout/Layout';
import Button from '../common/Button';
import { Article, Section } from '../../styles/layout';

const SinglePost = () => {
  let { id } = useParams();
  const [data, setData] = useState();
  const { user } = useAuth();
  console.log('data:', data);

  useEffect(() => {
    const getBlog = async () => {
      try {
        let { data, error, status } = await supabase.from('post').select('*').eq('id', id);

        if (error && status !== 406) {
          console.log('error', error);
          throw error;
        }

        console.log(`데이터 배열 확인 => `, data);

        // console.log(data.image);
        setData(data[0]);
      } catch (error) {
        console.log(error.message);
      }
    };

    getBlog();
  }, [id]);

  return (
    <Layout title={'sample'}>
      <Section>
        <Article>
          <h2>작성글 확인</h2>
          <h4>{data ? data.title : ''}</h4>
          <p className="subheading">{data ? data.description : ''}</p>

          <img
            style={{ maxWidth: '1000px', width: '-webkit-fill-available' }}
            src={data ? data.image : ''}
            alt={data ? data.image : ''}
          />
          <p>{data ? `1. ${data.created_at.slice(0, 10)} ${data.created_at.slice(11, 19)}` : ''}</p>

          <Button>수정</Button>
          <Button>삭제</Button>
        </Article>
      </Section>
    </Layout>
  );
};
export default SinglePost;
