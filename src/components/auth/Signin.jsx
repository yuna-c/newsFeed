import { useAuth } from '../../context/AuthContext';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import Button from './../common/Button';

import { Section, Article } from '../../styles/layout';
import { ButtonContainer, FormContainer, Title, InputField, Input, Label } from '../../styles/common.js';

export default function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const { signIn } = useAuth();
  let navigate = useNavigate();

  // alert 후 message를 초기화하여 재사용
  useEffect(() => {
    if (message) {
      alert(message);
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
          <Title>로그인</Title>

          <FormContainer onSubmit={handleSubmit}>
            <InputField>
              <Label htmlFor="inputEmail">이메일</Label>
              <Input ref={emailRef} type="email" id="inputEmail" placeholder="Email address" required />
            </InputField>

            <InputField>
              <Label htmlFor="inputPassword">비밀번호</Label>
              <Input ref={passwordRef} type="password" id="inputPassword" placeholder="Password" required />
            </InputField>

            <ButtonContainer>
              <Button type="submit" $red>
                로그인
              </Button>

              <Button>
                <Link to="/signup">회원가입</Link>
              </Button>
            </ButtonContainer>
          </FormContainer>
        </Article>
      </Section>
    </Layout>
  );
}
