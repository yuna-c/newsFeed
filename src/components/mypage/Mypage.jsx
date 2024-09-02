import { supabase } from '../../assets/api/supabase';
import { useRef, useEffect, useState } from 'react';
import { Section, Article } from '../../styles/layout';
import styled from 'styled-components';
import Layout from '../layout/Layout';
import Button from '../common/Button';

export default function Mypage() {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);

  const [usernameOutput, setUsernameOutput] = useState('');
  const [passwordOutput, setPasswordOutput] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        if (nameRef.current) {
          nameRef.current.value = user.user_metadata.full_name || '';
        }
        setPreview(user.user_metadata.avatar_url || '');
      }
      setLoading(false);
    };

    getUserData();
  }, []);

  // 이미지 파일이 선택되었을 때 처리하는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // 미리보기를 위한 파일 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 클릭 시 파일 선택 창 열기
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 이미지 업로드 함수
  const uploadImage = async (file) => {
    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `profile/${fileName}`;

      const { data, error: uploadError } = await supabase.storage.from('blogimage').upload(filePath, file);

      if (uploadError) throw uploadError;

      console.log(`data=>`, data);
      await getURL(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  // 이미지 URL 가져오기
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
    }
  };

  const onHandleUpdate = async (e) => {
    e.preventDefault();

    const updatedName = nameRef.current.value;
    const updatedPassword = passwordRef.current.value;

    // 유저네임과 비밀번호 화면 하단에 표시
    setUsernameOutput(updatedName);
    setPasswordOutput(updatedPassword);

    // 이미지 업로드 처리
    if (selectedImage) {
      await uploadImage(selectedImage);
    }

    // 이미지 업로드가 완료되지 않았을 경우 경고
    if (!image) {
      alert('이미지 업로드가 완료될 때까지 기다려주세요.');
      return;
    }

    const updates = {
      id: user.id,
      email: user.email,
      username: updatedName,
      avatar_url: image,
      updated_at: new Date()
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      console.error('프로필 업데이트 실패:', error);
    } else {
      console.log('프로필 업데이트 성공');
      setUser((prev) => ({
        ...prev,
        user_metadata: {
          ...prev.user_metadata,
          email: user.email,
          username: updatedName,
          avatar_url: image
        }
      }));
    }

    // 비밀번호 업데이트
    if (updatedPassword) {
      const { error: passwordError } = await supabase.auth.updateUser({
        password: updatedPassword
      });

      if (passwordError) {
        console.error('비밀번호 업데이트 실패:', passwordError);
      } else {
        console.log('비밀번호 업데이트 성공');
      }
    }
  };

  return (
    <Layout title={'myPage'}>
      <Section>
        <Article>
          <h2>마이 페이지</h2>

          <form onSubmit={onHandleUpdate}>
            <InputField>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <CircleDiv onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                {preview ? <CircleImg src={preview} alt="Profile Preview" /> : <CircleTemp>Click to upload</CircleTemp>}
              </CircleDiv>
            </InputField>
            <InputField>
              <label htmlFor="email" style={{ width: '80px', display: 'inline-block' }}>
                이메일 :
              </label>
              <Input type="email" id="email" placeholder="email" value={user ? `${user.email}` : ''} readOnly />
            </InputField>
            <InputField>
              <label htmlFor="name" style={{ width: '80px', display: 'inline-block' }}>
                이름 :
              </label>
              <Input type="text" id="name" placeholder="name" ref={nameRef} />
            </InputField>
            <InputField>
              <label htmlFor="password" style={{ width: '80px', display: 'inline-block' }}>
                비밀번호 :
              </label>
              <Input type="password" id="password" placeholder="password" ref={passwordRef} />
            </InputField>

            <div className="button-group">
              <Button type="submit" disabled={uploading}>
                {uploading ? '업로드 중...' : '업데이트'}
              </Button>
            </div>
          </form>
        </Article>
      </Section>

      <OutputText>
        Updated Username: {usernameOutput} | Updated Password: {passwordOutput}
      </OutputText>
    </Layout>
  );
}

const InputField = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-end;
  color: var(--pointColor);
`;

const Input = styled.input`
  padding: 5px;
  border-bottom: 1px solid #000;
`;

const CircleDiv = styled.div`
  width: auto;
`;

const CircleImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ddd;
  overflow: hidden;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  background-color: rgba(255, 255, 255, 0.9);
`;

const CircleTemp = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #fff;
  border: 1px solid #ddd;
  overflow: hidden;
  box-sizing: border-box;
`;

const OutputText = styled.div`
  position: fixed;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  font-size: 14px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ddd;
`;
