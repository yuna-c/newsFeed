import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { useState } from 'react';

const Write = () => {
const {user} = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    // TODO: 글 작성 로직 구현
    e.preventDefault();

    // supabase의 posts에 insert
    await Supabase.from("posts").insert([
      {
        title,
        content,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1>Write</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onchang={(e) => setContent(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Write;
