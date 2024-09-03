import { supabase } from '../../assets/api/supabase';
import { useRef, useEffect, useState } from 'react';

import Layout from '../layout/Layout';
import Button from '../common/Button';

import { Section, Article } from '../../styles/layout';
import {
  ButtonContainer,
  FormContainer,
  Title,
  InputField,
  Input,
  Label,
  CircleContainer,
  CircleImg,
  CircleTemp,
  OutputText,
  UserAvatarImg,
  UserAvatarSmall,
  InfoText
} from '../../styles/common.js';

export default function Mypage() {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(localStorage.getItem('profileImage') || null); // 로컬 저장소에서 이미지 가져오기

  const [usernameOutput, setUsernameOutput] = useState('');
  const [passwordOutput, setPasswordOutput] = useState('');
  const [showOutput, setShowOutput] = useState(false); // 메시지 표시 상태

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(image || null); // 초기 미리보기를 로컬 저장소에서 가져오기

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
        if (user.user_metadata.avatar_url && !preview) {
          setPreview(user.user_metadata.avatar_url);
          setImage(user.user_metadata.avatar_url);
        }
      }
      setLoading(false);
    };

    getUserData();
  }, [preview]);

  // 이미지 파일이 선택되었을 때 처리하는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // 미리보기를 위한 파일 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setPreview(imageUrl);
        // 로컬 저장소에 저장
        localStorage.setItem('profileImage', imageUrl);
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

      setImage(publicUrl); // 새 프로필 이미지 URL 설정
      setPreview(publicUrl); // 미리보기 이미지 업데이트
      localStorage.setItem('profileImage', publicUrl); // 로컬 저장소에 저장
    } catch (error) {
      alert(error.message);
    }
  };

  const onHandleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const updatedName = nameRef.current.value;
      const updatedPassword = passwordRef.current.value;

      if (selectedImage) {
        await uploadImage(selectedImage);
      }

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

        // 유저네임과 비밀번호 화면 하단에 표시
        setUsernameOutput(updatedName);
        setPasswordOutput(updatedPassword);
        setShowOutput(true);

        setTimeout(() => {
          setShowOutput(false);
        }, 6000);
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
    } catch (error) {
      console.error('업데이트 중 오류 발생:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout title={'myPage'}>
      <Section>
        <Article>
          <Title>마이 페이지</Title>

          <FormContainer onSubmit={onHandleUpdate}>
            <InputField>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <CircleContainer onClick={handleImageClick}>
                {preview ? <CircleImg src={preview} alt="Profile Preview" /> : <CircleTemp>Click to upload</CircleTemp>}
              </CircleContainer>
            </InputField>
            <InputField>
              <Label htmlFor="email">이메일 :</Label>
              <Input type="email" id="email" placeholder="email" value={user ? `${user.email}` : ''} readOnly />
            </InputField>
            <InputField>
              <Label htmlFor="name">이름 :</Label>
              <Input type="text" id="name" placeholder="name" ref={nameRef} />
            </InputField>
            <InputField>
              <Label htmlFor="password">비밀번호 :</Label>
              <Input type="password" id="password" placeholder="password" ref={passwordRef} />
            </InputField>

            <ButtonContainer className="button-group">
              <Button type="submit" disabled={uploading}>
                {uploading ? '업로드 중...' : '업데이트'}
              </Button>
            </ButtonContainer>
          </FormContainer>
        </Article>
      </Section>

      {showOutput && (
        <OutputText>
          <InfoText>닉네임 : {usernameOutput}</InfoText>
          <InfoText>비밀번호 : {passwordOutput}</InfoText>
          <UserAvatarSmall style={{ marginTop: '1px' }}>
            <UserAvatarImg src={image} alt="Updated Profile" />
          </UserAvatarSmall>
        </OutputText>
      )}
    </Layout>
  );
}
