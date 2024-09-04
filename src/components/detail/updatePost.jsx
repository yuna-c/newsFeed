import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../assets/api/supabase';
import Button from '../common/Button';
import Layout from '../layout/Layout';
import {
  WriteFormContainer,
  WriteInputField,
  WriteLabel,
  WriteInput,
  WriteTextarea,
  WriteButtonContainer
} from '../../styles/common';

const UpdatePost = () => {
  const { id } = useParams(); // URL에서 게시글 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase.from('post').select('*').eq('id', id).single();
        if (error) throw error;
        setPost(data);
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
      } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('post').update({ title, description, image }).eq('id', id);
      if (error) throw error;
      navigate(`/singlePost/${id}`); // 수정 후 게시글 페이지로 이동
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error.message);
    }
  };

  return (
    <Layout title="게시글 수정">
      <WriteFormContainer onSubmit={handleUpdate}>
        <WriteInputField>
          <WriteLabel>제목:</WriteLabel>
          <WriteInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </WriteInputField>

        <WriteInputField>
          <WriteLabel>설명:</WriteLabel>
          <WriteTextarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </WriteInputField>

        <WriteInputField>
          <WriteLabel>이미지 URL:</WriteLabel>
          <WriteInput type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </WriteInputField>

        <WriteButtonContainer>
          <Button type="submit">게시글 수정</Button>
        </WriteButtonContainer>
      </WriteFormContainer>
    </Layout>
  );
};

export default UpdatePost;
