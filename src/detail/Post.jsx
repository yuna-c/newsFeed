import React, { useEffect } from 'react';
import supabase from '../api/supabase';

const Post = () => {
  const postId = 1;
  useEffect(() => {
    test();
  }, []);
  const test = async () => {
    const { data: posts, error } = await supabase.from('posts').select('*');
    console.log(posts);
  };
  return <h1>Post page</h1>;
};

export default Post;
