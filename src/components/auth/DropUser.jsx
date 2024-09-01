import React from 'react';
import { supabase } from '../../api/supabase';

const DropUser = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleDelete = async (userId) => {
    if (!window.confirm('정말로 회원탈퇴 하시겠습니까?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 사용자 삭제 요청
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        throw error;
      }

      alert('사용자가 성공적으로 삭제되었습니다');
    } catch (error) {
      console.error('사용자 삭제 중 오류 발생:', error.message);
      setError('사용자 삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => handleDelete('user-id-to-delete')} disabled={loading}>
        {loading ? '삭제 중...' : '회원탈퇴'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DropUser;
