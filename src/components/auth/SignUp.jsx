import { useAuth } from '../../context/AuthContext';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Section, Article } from '../../styles/layout';
import Layout from '../layout/Layout';

const InputField = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-end;
`;

const Input = styled.input`
  padding: 5px;
  border-bottom: 1px solid #000;
`;

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const { signUp, signOut } = useAuth();

  let navigate = useNavigate();

  useEffect(() => {
    if (message) {
      alert(message);
      setMessage('');
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // 인풋값들 콘솔로 출력
    // console.log('이메일:', email);
    // console.log('비밀번호:', password);
    // console.log('비밀번호 확인:', confirmPassword);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage('올바른 이메일 주소를 입력하세요.');
      return;
    }

    if (password.length < 6) {
      setMessage('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 처리
    const { error } = await signUp({ email, password });

    if (error) {
      setError(error);
      setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    // 콘솔에 프로필 데이터 출력
    console.log('회원가입 성공, 프로필 정보:', data);

    // 회원가입 후 로그아웃 처리 및 로그인 페이지로 이동 (원할 경우 활성화)
    await signOut();
    navigate('/signin');
  };

  return (
    <Layout title={'Signup'}>
      <Section>
        <Article>
          <form onSubmit={handleSubmit}>
            <h2>회원가입</h2>

            <InputField>
              <label htmlFor="inputEmail" style={{ width: '100px', display: 'inline-block' }}>
                이메일
              </label>
              <Input ref={emailRef} type="email" id="inputEmail" placeholder="Email address" required />
            </InputField>
            <InputField>
              <label htmlFor="inputPassword" style={{ width: '100px', display: 'inline-block' }}>
                비밀번호
              </label>
              <Input ref={passwordRef} type="password" id="inputPassword" placeholder="Password" required />
            </InputField>
            <InputField>
              <label htmlFor="inputConfirmPassword" style={{ width: '100px', display: 'inline-block' }}>
                비밀번호 확인
              </label>
              <Input
                ref={confirmPasswordRef}
                type="password"
                id="inputConfirmPassword"
                placeholder="Confirm Password"
                required
              />
            </InputField>
            <button type="submit">회원가입</button>
            <Link to="/signin">로그인</Link>
          </form>
        </Article>
      </Section>
    </Layout>
  );
};

export default SignUp;
