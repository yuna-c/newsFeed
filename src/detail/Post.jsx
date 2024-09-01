import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wqwibyktkcnkeleewbme.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxd2lieWt0a2Nua2VsZWV3Ym1lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDM5MTMzMywiZXhwIjoyMDM5OTY3MzMzfQ.bD3Rse1_3OhTeZPWNKPML8kGRpP9TfuRA9r3T6Vn3GE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('post').select('*');

      if (error) {
        setError(error.message);
      } else {
        setPosts(data);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.uuid}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p>{post.content}</p>
              <p>
                <img src={post.image} />
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Post;
