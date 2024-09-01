import { useAuth } from '../../context/AuthContext';

const DropUser = () => {
  const { user, deleteUser } = useAuth();

  const handleDeleteAccount = () => {
    if (window.confirm('정말로 계정을 삭제하시겠습니까?')) {
      deleteUser();
    }
  };

  return (
    <>
      <p>현재 로그인된 이메일: {user?.email}</p>
      <strong>아직 안됩니다</strong>
      <button onClick={handleDeleteAccount}>회원탈퇴</button>
    </>
  );
};

export default DropUser;
