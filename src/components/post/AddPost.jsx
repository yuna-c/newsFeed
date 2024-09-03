import { useState, useEffect } from 'react';
import { supabase } from '../../assets/api/supabase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import Button from '../common/Button';
import { Section, Article } from '../../styles/layout';

const AddPost = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState('');
  const [userProfile, setUserProfile] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    // 사용자 정보 가져오기
    const fetchUserProfile = async () => {
      try {
        // supabase에서 'profiles' 테이블에서 데이터 가져오기
        const { data, error } = await supabase
          .from('profiles')
          .select('username, email, avatar_url') // 이메일 추가
          .eq('id', user.id) // 현재 로그인한 사용자의 ID와 일치하는 레코드 찾기
          .single(); // 단일 결과를 반환

        if (error) throw error; // 에러 발생 시 예외 처리

        // 상태 업데이트
        if (data.username) {
          setUsername(data.username); // 사용자 이름이 있으면 사용
        } else {
          setUsername(data.email); // 사용자 이름이 없으면 이메일 사용
        }
        setUserProfile(data.avatar_url); // 가져온 프로필 이미지를 상태에 저장
      } catch (error) {
        alert(error.message); // 에러 메시지 표시
      }
    };

    // 사용자 정보가 존재할 때만 fetchUserProfile 호출
    if (user) {
      fetchUserProfile();
    }
  }, [user]); // user가 변경될 때마다 useEffect가 실행됨

  // 이미지 업로드 함수
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

  // getURL 함수
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

  // 블로그 글 추가 함수
  const addBlog = async (e) => {
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
        image: image,
        username: username, // 사용자 이름 추가
        user_profile: userProfile // 사용자 프로필 추가
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
          <h2>글쓰기</h2>

          <form onSubmit={addBlog}>
            <div>
              <label>제목</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
                className="form-control"
              />
            </div>

            <div>
              <label>해시 태그</label>
              <input
                value={description}
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </div>

            <div>
              <label className="form-label px-0">컨텐츠</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="content"
                className="form-control"
              />
            </div>

            <div>
              <input accept="image/*" onChange={uploadImage} type="file" className="form-control" />
            </div>
            <Button disabled={uploading} className="btn btn-lg btn-secondary btn-block" type="submit">
              {uploading ? 'uploading...' : 'Add'}
            </Button>
          </form>
        </Article>
      </Section>
    </Layout>
  );
};

export default AddPost;
