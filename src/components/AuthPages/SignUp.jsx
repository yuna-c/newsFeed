import { useState } from 'react';
import { supabase } from '../../api/supabase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로 고침 방지

    // 이메일 형식 검증
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      // 오류가 발생하면 여기서 단순히 콘솔에 출력
      console.error('올바른 이메일 주소를 입력하세요.');
      return;
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      // 오류가 발생하면 여기서 단순히 콘솔에 출력
      console.error('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    // Supabase 회원가입 요청
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      // 오류가 발생하면 여기서 단순히 콘솔에 출력
      console.error(signUpError.message);
    } else {
      // 성공하면 여기서 콘솔에 출력
      console.log('회원가입 성공!');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUp;
