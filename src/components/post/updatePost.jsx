import { useEffect, useState } from 'react';
import { supabase } from '../../assets/api/supabase';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Layout from '../layout/Layout';

import { Article, Section } from '../../styles/layout';
import {
  Title,
  WriteButtonContainer,
  WriteFormContainer,
  WriteInput,
  WriteInputField,
  WriteLabel,
  WriteTextarea
} from '../../styles/common';

const UpdatePost = () => {
  const { id } = useParams(); // URL에서 게시글 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false); // 업로드 상태 추가

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
      const { error } = await supabase
        .from('post')
        .update({ title, description, image }) // 최신 이미지 상태가 포함되도록 수정
        .eq('id', id);
      if (error) throw error;
      navigate(`/detail/${id}`); // 수정 후 게시글 페이지로 이동
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error.message);
    }
  };

  const uploadImage = async (e) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('업로드할 이미지를 선택해야 합니다');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { data, error: uploadError } = await supabase.storage.from('blogimage').upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
        error: urlError
      } = await supabase.storage.from('blogimage').getPublicUrl(filePath);

      if (urlError) throw urlError;

      setImage(publicUrl); // 업로드된 이미지 URL을 상태에 저장
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout title={UpdatePost}>
      <Section>
        <Article>
          <Title>작성글 확인</Title>

          <WriteFormContainer onSubmit={handleUpdate}>
            <WriteInputField>
              <WriteLabel>제목 </WriteLabel>
              <WriteInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </WriteInputField>

            <WriteInputField>
              <WriteLabel>설명 </WriteLabel>
              <WriteTextarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </WriteInputField>

            <WriteInputField>
              <WriteLabel>이미지 URL</WriteLabel>
              <WriteInput type="text" value={image} readOnly />
            </WriteInputField>

            <WriteInputField>
              <WriteLabel>이미지 업로드</WriteLabel>
              <WriteInput accept="image/*" type="file" onChange={uploadImage} />
            </WriteInputField>

            <WriteButtonContainer>
              <Button type="submit" disabled={uploading}>
                {uploading ? '업로드 중...' : '게시글 수정'}
              </Button>
            </WriteButtonContainer>
          </WriteFormContainer>
        </Article>
      </Section>
    </Layout>
  );
};

export default UpdatePost;
