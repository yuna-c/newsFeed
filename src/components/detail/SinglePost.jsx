import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ex.css';
import Layout from '../layout/Layout';
import Button from '../common/Button';
import { Article, Section } from '../../styles/layout';
import { supabase } from '../../assets/api/supabase';

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate 훅 추가
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const { user } = useAuth();

  // 게시글과 댓글 가져오기
  useEffect(() => {
    const getBlog = async () => {
      try {
        let { data, error, status } = await supabase.from('post').select('*').eq('id', id);
        if (error && status !== 406) {
          console.log('게시글을 가져오는 중 오류 발생:', error);
          throw error;
        }
        setData(data[0]);
      } catch (error) {
        console.log('오류:', error.message);
      }
    };

    const getComments = async () => {
      try {
        let { data, error, status } = await supabase.from('comment').select('*').eq('post_id', id);
        if (error && status !== 406) {
          console.log('댓글을 가져오는 중 오류 발생:', error);
          throw error;
        }
        console.log('가져온 댓글:', data);
        setComments(data);
      } catch (error) {
        console.log('오류:', error.message);
      }
    };

    getBlog();
    getComments();
  }, [id]);

  // 댓글 추가
  const addComment = async (postId, content) => {
    try {
      const { data, error } = await supabase.from('comment').insert([{ post_id: postId, content, user_id: user.id }]);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.log('댓글 추가 중 오류 발생:', error.message);
    }
  };

  // 댓글 가져오기
  const fetchComments = async (postId) => {
    try {
      let { data, error } = await supabase.from('comment').select('*').eq('post_id', postId);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.log('댓글 가져오는 중 오류 발생:', error.message);
    }
  };

  // 댓글 수정
  const updateComment = async (commentId, content) => {
    try {
      console.log(content);
      const { data, error } = await supabase.from('comment').update({ content: content }).eq('id', commentId).select();
      if (error) {
        throw error;
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log('댓글 수정 중 오류 발생:', error.message);
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    try {
      const { data, error } = await supabase.from('comment').delete().eq('id', commentId);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.log('댓글 삭제 중 오류 발생:', error.message);
    }
  };

  // 게시글 삭제
  const handlePostDelete = async () => {
    try {
      // 댓글 삭제
      const { data: commentsData, error: commentsError } = await supabase
        .from('comment')
        .select('id')
        .eq('post_id', id);
      if (commentsError) {
        throw commentsError;
      }
      // 댓글 삭제
      await Promise.all(commentsData.map((comment) => supabase.from('comment').delete().eq('id', comment.id)));

      // 게시글 삭제
      const { error } = await supabase.from('post').delete().eq('id', id);
      if (error) {
        throw error;
      }
      navigate('/'); // 삭제 후 홈 페이지로 이동
    } catch (error) {
      console.log('게시글 삭제 중 오류 발생:', error.message);
    }
  };

  // 댓글 제출 처리
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

  // 댓글 수정 처리
  const handleCommentEdit = async (commentId) => {
    if (editingContent.trim()) {
      console.log(editingContent);
      await updateComment(commentId, editingContent);
      setEditingCommentId(null);
      setEditingContent('');
      const updatedComments = await fetchComments(id);
      setComments(updatedComments);
    }
  };

  // 댓글 삭제 처리
  const handleCommentDelete = async (commentId) => {
    await deleteComment(commentId);
    const updatedComments = await fetchComments(id);
    setComments(updatedComments);
  };

  // 게시글 수정 페이지로 이동
  const handlePostUpdate = () => {
    navigate(`/addpost`);
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

            {user && data && user.id === data.user_id && (
              <>
                <Button onClick={handlePostUpdate}>수정</Button>
                <Button onClick={handlePostDelete}>삭제</Button>
              </>
            )}
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
                    <p>작성자: {comment.user_id === user.id ? '나' : '알 수 없음'}</p>
                    {comment.user_id === user.id && (
                      <>
                        <Button onClick={() => setEditingCommentId(comment.id)}>수정</Button>
                        <Button onClick={() => handleCommentDelete(comment.id)}>삭제</Button>
                      </>
                    )}
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
