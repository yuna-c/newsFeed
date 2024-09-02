import { useState } from 'react';
import { supabase } from '../../api/supabase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import Button from '../common/Button';
import { Section, Article } from '../../styles/layout';

const AddPost = () => {
  const { user } = useAuth();
  // user정보
  console.log(user.id, user.email, user.password);

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
      // console.log(supabase.storage.from('image').getPublicUrl(url).data.publicUrl)

      if (uploadError) throw uploadError;
      // 이미지 경로 저장
      console.log(data);
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
      // 이미지 URL 설정
      setImage(publicUrl);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  // 1. 블로그 글 올리기
  const addBlog = async (e) => {
    e.preventDefault();

    // 이미지 업로드가 완료되지 않았을 경우 경고
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

      let { error } = await supabase.from('post').insert(updates);

      if (error) throw error;

      // 업로드 후 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout title={'AddPost'}>
      <Section>
        <Article>
          <h2>글쓰기 </h2>

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
