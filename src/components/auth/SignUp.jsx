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
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const { signUp } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (message) {
      console.log('Alert message:', message); // message 상태가 업데이트되는지 확인
      alert(message);
      setMessage(''); // alert 후 message를 초기화하여 재사용 가능
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // 이메일 형식 검증
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage('올바른 이메일 주소를 입력하세요.');
      return;
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      setMessage('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    const { error } = await signUp({ email, password });

    if (error) {
      setError(error);
      setMessage('이메일 또는 비밀번호가 틀렸습니다. 다시 확인해 주세요');

      return;
    }

    // 회원가입 성공 후 로그인 페이지로 이동
    navigate('/signin');
  };

  return (
    <Layout title={'Signup'}>
      <Section>
        <h2>회원가입</h2>
        <Article>
          <form onSubmit={handleSubmit}>
            <h1>Please sign up</h1>
            <InputField>
              <label htmlFor="inputEmail" style={{ width: '80px', display: 'inline-block' }}>
                이메일
              </label>
              <Input ref={emailRef} type="email" id="inputEmail" placeholder="Email address" required />
            </InputField>
            <br />
            <br />
            <label htmlFor="inputPassword" style={{ width: '80px', display: 'inline-block' }}>
              비밀번호
            </label>
            <Input
              ref={passwordRef}
              type="password"
              id="inputPassword"
              placeholder="Password"
              required
              style={{ width: '80px', display: 'inline-block' }}
            />

            <br />
            <br />
            <button type="submit">회원가입</button>
            <Link to="/signin">로그인</Link>
          </form>
        </Article>
      </Section>
    </Layout>
  );
};

export default SignUp;
