import { useState, useEffect } from 'react';
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
  const { user } = useAuth();
  console.log('유저 정보 =>', user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setUsername(data.username || '');
        setUserProfile(data.avatar_url || '');
      } catch (error) {
        alert(error.message);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

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

      getURL(filePath);
    } catch (error) {
      alert(error.message);
    }
  };

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

  const onHandleWrite = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('이미지 업로드가 완료될 때까지 기다려주세요.');
      return;
    }

    // 사용자 프로필이 등록되지 않은 경우 알림 표시
    if (!username || !userProfile) {
      alert('프로필 정보가 부족합니다. 마이페이지에서 프로필을 등록해 주세요.');
      return;
    }

    try {
      const updates = {
        user_id: user.id,
        title: title,
        description: description,
        content: content,
        image: image,
        username: username,
        user_profile: userProfile
      };

      let { error, data } = await supabase.from('post').insert(updates);

      if (error) {
        console.error('Error inserting post:', error);
        throw error;
      } else {
        console.log('Post inserted successfully:', data);
      }

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
            <WriteInputField>
              <WriteLabel>작성자</WriteLabel>
              <UserAvatarContainer>
                <UserAvatar>
                  <UserAvatarImg
                    src={userProfile || 'https://via.placeholder.com/150'}
                    alt={username || '유저 프로필'}
                  />
                </UserAvatar>
                <UserAvatarTxt>
                  {username || '마이페이지에서 닉네임을 등록하세요!'}
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
