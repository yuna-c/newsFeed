import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import supabase from '../../api/supabase';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import { FormContainer, FormGroup, Label, Input, TextArea, Button } from '../../styles/layout-write';

import Layout from '../layout/Layout';

const Write = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const editorRef = useRef(null);
  const navigate = useNavigate();

  // 이미지 업로드
  const uploadImage = async (e) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      let { data, error: uploadError } = await supabase.storage.from('blogimage').upload(filePath, file);
      if (uploadError) throw uploadError;

      console.log('Image uploaded:', data);
      getUrl(filePath);
    } catch (error) {
      alert(error.message);
    }
  };

  // 이미지 URL 가져오기
  const getUrl = async (url) => {
    try {
      const { publicURL, error } = await supabase.storage.from('blogimage').getPublicUrl(url);
      if (error) throw error;
      console.log(publicURL);
      setImage(publicURL);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  // 블로그 포스트 추가
  const addBlog = async () => {
    try {
      const updates = {
        id: uuidv4(),
        title: title,
        description: description,
        content: content,
        image: image
      };

      let { error } = await supabase.from('post').insert(updates);
      if (error) throw error;
      navigate('/');
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
    <Layout title={'Post'}>
      <FormContainer>
        <h2>Create New Post</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addBlog();
          }}
        >
          <FormGroup>
            <Label htmlFor="title">Post title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Short description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </FormGroup>
          <FormGroup>
            <Label>Post content</Label>
            <Editor
              ref={editorRef}
              initialEditType="markdown"
              previewStyle="vertical"
              height="400px"
              initialValue="Hello, TOAST UI Editor!"
              onChange={handleEditorChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="image">Post image</Label>
            <Input id="image" accept="image/*" onChange={uploadImage} type="file" />
          </FormGroup>
          <Button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add'}
          </Button>
        </form>
      </FormContainer>
    </Layout>
  );
};

export default Write;
