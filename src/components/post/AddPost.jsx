import { useState } from 'react';
import { supabase } from '../../assets/api/supabase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import Button from '../common/Button';

import { Section, Article } from '../../styles/layout';
import {
  Title2,
  WriteFormContainer,
  WriteInputField,
  WriteLabel,
  WriteInput,
  WriteTextarea,
  WriteButtonContainer,
  UserAvatarContainer,
  UserAvatar,
  UserAvatarTxt,
  UserAvatarImg
} from '../../styles/common';

const AddPost = () => {
  // 프로필 사진 불러오는 곳
  const { user } = useAuth();
  console.log('유저 정보 =>', user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  let navigate = useNavigate();

  // 2. 이미지 업로드 함수
  const uploadImage = async (e) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('업로드할 이미지를 선택해야 합니다');
      }

      const file = e.target.files[0]; // 파일 가져오기
      const fileExt = file.name.split('.').pop(); // 확장자 추출
      const fileName = `${Math.random()}.${fileExt}`; // 랜덤 파일명 생성
      const filePath = `${fileName}`; // 파일 경로 생성

      let { data, error: uploadError } = await supabase.storage.from('blogimage').upload(filePath, file);

      if (uploadError) throw uploadError;

      getURL(filePath);
    } catch (error) {
      alert(error.message);
    }
  };

  // 3 getUrl
  const getURL = async (url) => {
    try {
      const {
        data: { publicUrl },
        error
      } = await supabase.storage.from('blogimage').getPublicUrl(url);

      if (error) throw error;

      setImage(publicUrl);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  // 1. 블로그 글 올리기
  const onHandleWrite = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('이미지 업로드가 완료될 때까지 기다려주세요.');
      return;
    }

    try {
      const updates = {
        user_id: user.id,
        title: title,
        description: description,
        content: content,
        image: image // 이미지 경로 저장
      };

      let { error, data } = await supabase.from('post').insert(updates);

      if (error) {
        console.error('Error inserting post:', error);
      } else {
        console.log('Post inserted successfully:', data);
      }

      if (error) throw error;

      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout title={'AddPost'}>
      <Section>
        <Article>
          <Title2>글쓰기</Title2>

          <WriteFormContainer onSubmit={onHandleWrite}>
            {/* 사용자 프로필 정보 */}
            <WriteInputField>
              <WriteLabel>작성자</WriteLabel>
              <UserAvatarContainer>
                <UserAvatar>
                  <UserAvatarImg
                    src={user?.avatar_url || 'https://via.placeholder.com/150'}
                    alt={user?.avatar_url || '유저 프로필'}
                  />
                </UserAvatar>
                <UserAvatarTxt>
                  {user?.username || '마이페이지에서 닉네임을 등록하세요!'}
                  {/* {user?.email || '이메일이 없습니다.'} */}
                </UserAvatarTxt>
              </UserAvatarContainer>
            </WriteInputField>

            <WriteInputField>
              <WriteLabel>제목</WriteLabel>
              <WriteInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
                className="form-control"
              />
            </WriteInputField>

            <WriteInputField>
              <WriteLabel>해시 태그</WriteLabel>
              <WriteInput
                value={description}
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </WriteInputField>

            <WriteInputField>
              <WriteLabel>내용</WriteLabel>
              <WriteTextarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="content"
                className="form-control"
              />
            </WriteInputField>

            <WriteInputField>
              <WriteLabel>이미지</WriteLabel>
              <WriteInput accept="image/*" onChange={uploadImage} type="file" className="form-control" />
            </WriteInputField>

            <WriteButtonContainer>
              <Button disabled={uploading} className="btn btn-lg btn-secondary btn-block" $blue type="submit">
                {uploading ? 'uploading...' : 'Add'}
              </Button>
            </WriteButtonContainer>
          </WriteFormContainer>
        </Article>
      </Section>
    </Layout>
  );
};

export default AddPost;
