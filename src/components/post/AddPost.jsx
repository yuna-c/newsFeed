import { useRef, useState } from 'react';
import { supabase } from '../../api/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';

import { Section, Article } from '../../styles/layout';
import Layout from '../layout/Layout';
import Button from '../common/Button';

const AddPost = () => {
  const editorRef = useRef(null);
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
      console.log(data);

      if (uploadError) throw uploadError;

      console.log(data); // 이미지 경로 저장
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

      setImage(publicUrl); // 이미지 URL 설정
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
        id: uuidv4(),
        title: title,
        description: description,
        content: content,
        image: image // 이미지 경로 저장
      };

      let { error } = await supabase.from('post').insert(updates);

      if (error) throw error;

      navigate('/'); // 업로드 후 메인 페이지로 이동
    } catch (error) {
      alert(error.message);
    }
  };

  // 에디터 내용 변경 시 호출
  const handleEditorChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getInstance().getMarkdown());
    }
  };

  return (
    <Layout title={'AddPost'}>
      <Section>
        <Article>
          <h2>글쓰기 </h2>

          <br />

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
              <label>Post content</label>
              <Editor
                ref={editorRef}
                initialEditType="markdown"
                previewStyle="vertical"
                height="400px"
                initialValue="Hello, TOAST UI Editor!"
                onChange={handleEditorChange}
              />
            </div>

            <div>
              {/* <label>이미지</label> */}
              <input accept="image/*" onChange={uploadImage} type="file" className="form-control" />
            </div>
            <Button
              // onClick={() => addBlog({ title, description, content, image })}
              disabled={uploading}
              className="btn btn-lg btn-secondary btn-block"
              type="submit"
            >
              {uploading ? 'uploading...' : 'Add'}
            </Button>
          </form>
        </Article>
      </Section>
    </Layout>
  );
};

export default AddPost;
