import { useAuth } from '../../context/AuthContext';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Section, Article } from '../../styles/layout';
import Layout from '../layout/Layout';

const InputField = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-end;
  color: var(--pointColor);
`;

const Input = styled.input`
  padding: 5px;
  border-bottom: 1px solid #000;
`;

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const { signIn } = useAuth(); // useAuth를 함수로 호출해야 함
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { error } = await signIn({ email, password });

    if (error) {
      setError(error);
      setMessage('error with email or password');
      return;
    }

    navigate('/');
    window.location.reload();
  };

  return (
    <Layout title={'Login'}>
      <Section>
        <h2>로그인하기</h2>
        <Article>
          <form onSubmit={handleSubmit}>
            <h1>Please sign in</h1>
            <InputField>
              <label htmlFor="inputEmail" style={{ width: '80px', display: 'inline-block' }}>
                이메일
              </label>
              <Input ref={emailRef} type="email" id="inputEmail" placeholder="Email address" required />
            </InputField>
            <br />
            <br />
            <InputField>
              <label htmlFor="inputPassword" style={{ width: '80px', display: 'inline-block' }}>
                비밀번호
              </label>
              <Input ref={passwordRef} type="password" id="inputPassword" placeholder="Password" required />
            </InputField>

            <br />
            <br />
            <button type="submit">로그인</button>
            <Link to="/signup">회원가입</Link>
          </form>
          {message ? alert(message) : ''}
        </Article>
      </Section>
    </Layout>
  );
};
export default Login;
