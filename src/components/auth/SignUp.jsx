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

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const { signUp } = useAuth(); // useAuth를 함수로 호출해야 함
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { error } = await signUp({ email, password });

    if (error) {
      setError(error);
      setMessage('error with email or password');
      return;
    }

    // navigate('/')
    // window.location.reload()

    // 회원가입 성공 후 로그인 페이지로 이동
    setMessage('Signup successful! Please log in.');
    navigate('/login');
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
            <Link to="/login">로그인</Link>
          </form>
          {message ? alert(message)(<p>{message}</p>) : ''}
        </Article>
      </Section>
    </Layout>
  );
};
export default SignUp;
