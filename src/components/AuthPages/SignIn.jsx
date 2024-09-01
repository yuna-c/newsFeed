import { useState } from 'react';
import supabase from '../../api/supabase';
export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    await supabase.auth.signInWithPassword({
      email,
      password
    });
    alert('로그인완료');
  };
  return (
    <>
      <h2>아이디 및 비빌번호를 입력해주세요!</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>로그인</button>
      </form>
    </>
  );
};

export default SignIn; // default로 내보내기
