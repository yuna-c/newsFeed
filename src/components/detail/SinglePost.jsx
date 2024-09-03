import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ex.css';
import Layout from '../layout/Layout';
import Button from '../common/Button';
import { Article, Section } from '../../styles/layout';
import { supabase } from '../../api/supabase';

const SinglePost = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const { user } = useAuth();

  // 컴포넌트가 처음 렌더링될 때 포스트와 댓글을 가져오기
  useEffect(() => {
    const getBlog = async () => {
      try {
        let { data, error, status } = await supabase.from('post').select('*').eq('id', id);

        if (error && status !== 406) {
          console.log('Error fetching post:', error);
          throw error;
        }

        setData(data[0]); // 포스트 데이터를 상태에 저장!
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    const getComments = async () => {
      try {
        let { data, error, status } = await supabase.from('comment').select('*').eq('post_id', id);

        if (error && status !== 406) {
          console.log('Error fetching comments:', error);
          throw error;
        }

        console.log('Fetched comments:', data);
        setComments(data);
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    getBlog(); //아래 두개 포함해서 블로그 데이터 가져오고 다른 아이디로 접속해도 보이게 하기
    getComments();
  }, [id]);

  //댓글 추가
  const addComment = async (postId, content) => {
    try {
      const { data, error } = await supabase.from('comment').insert([{ post_id: postId, content, user_id: user.id }]);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.log('Error adding comment:', error.message);
    }
  };

  // 댓글 불러오기
  const fetchComments = async (postId) => {
    try {
      let { data, error } = await supabase.from('comment').select('*').eq('post_id', postId);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.log('Error fetching comments:', error.message);
    }
  };
  // 댓글 업데이트
  const updateComment = async (commentId, content) => {
    try {
      const { data, error } = await supabase.from('comment').update({ content }).eq('id', commentId);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.log('Error updating comment:', error.message);
    }
  };
  //삭제
  const deleteComment = async (commentId) => {
    try {
      const { data, error } = await supabase.from('comment').delete().eq('id', commentId);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.log('Error deleting comment:', error.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return;
    }

    await addComment(id, newComment);
    setNewComment('');
    const updatedComments = await fetchComments(id);
    setComments(updatedComments);
  };

  const handleCommentEdit = async (commentId) => {
    if (editingContent.trim()) {
      await updateComment(commentId, editingContent);
      setEditingCommentId(null);
      setEditingContent('');
      const updatedComments = await fetchComments(id);
      setComments(updatedComments);
    }
  };

  const handleCommentDelete = async (commentId) => {
    await deleteComment(commentId);
    const updatedComments = await fetchComments(id);
    setComments(updatedComments);
  };

  return (
    <Layout title={'Sample'}>
      <Section className="single-post-container">
        <div className="post-content">
          <Article>
            <h2>작성글 확인</h2>
            <h4>{data ? data.title : ''}</h4>
            <p className="subheading">{data ? data.description : ''}</p>

            <img
              style={{ maxWidth: '1000px', width: '100%' }}
              src={data ? data.image : ''}
              alt={data ? data.title : ''}
            />
            <p>{data ? `1. ${data.created_at.slice(0, 10)} ${data.created_at.slice(11, 19)}` : ''}</p>

            <Button>수정</Button>
            <Button>삭제</Button>
          </Article>
        </div>
        {user && (
          <div className="comment-form">
            <h3>댓글 작성</h3>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요"
                rows="4"
              />
              <Button type="submit">댓글 달기</Button>
            </form>
          </div>
        )}
        {!user && <p>댓글을 작성하려면 로그인 해주세요.</p>}
        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id}>
                {editingCommentId === comment.id ? (
                  <>
                    <textarea value={editingContent} onChange={(e) => setEditingContent(e.target.value)} />
                    <Button onClick={() => handleCommentEdit(comment.id)}>수정 완료</Button>
                  </>
                ) : (
                  <>
                    <p>{comment.content}</p>
                    <p>{new Date(comment.created_at).toLocaleString()}</p>
                    <p>작성자: {comment.user ? comment.user_id.username : '알 수 없음'}</p>
                    <Button onClick={() => setEditingCommentId(comment.id)}>수정</Button>
                    <Button onClick={() => handleCommentDelete(comment.id)}>삭제</Button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>
      </Section>
    </Layout>
  );
};

export default SinglePost;
