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

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const { signIn } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (message) {
      alert(message);
      // alert 후 message를 초기화하여 재사용
      setMessage('');
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // result를 안전하게 다룸
    const result = await signIn({ email, password });
    if (result?.error) {
      setError(result.error);
      setMessage('이메일 또는 비밀번호가 틀렸습니다. 다시 확인해 주세요');
      return;
    }

    navigate('/');
    // window.location.reload();
  };

  return (
    <Layout title={'Login'}>
      <Section>
        <Article>
          <form onSubmit={handleSubmit}>
            <h1>로그인 하기</h1>
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

            <button type="submit">로그인</button>
            <Link to="/signup">회원가입</Link>
          </form>
        </Article>
      </Section>
    </Layout>
  );
};

export default SignIn;
