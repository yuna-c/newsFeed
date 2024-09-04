import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../assets/api/supabase.js';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import Button from './../common/Button';

import { Section, Article } from '../../styles/layout';
import { ButtonContainer, FormContainer, Title, InputField, Input, Label } from '../../styles/common.js';

export default function SignUp() {
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

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

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

    const { error } = await signUp({ email, password });

    if (error) {
      setError(error);
      setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    // 회원가입 후 로그아웃은 되나 로그아웃 alert이 뜨고 메인페이지로 이동
    await signOut();
    await supabase.auth.signOut();

    navigate('/signin');
  };

  return (
    <Layout title={'Signup'}>
      <Section>
        <Article>
          <Title>회원가입</Title>

          <FormContainer onSubmit={handleSubmit}>
            <InputField>
              <Label htmlFor="inputEmail">이메일</Label>
              <Input ref={emailRef} type="email" id="inputEmail" placeholder="Email address" required />
            </InputField>
            <InputField>
              <Label htmlFor="inputPassword">비밀번호</Label>
              <Input ref={passwordRef} type="password" id="inputPassword" placeholder="Password" required />
            </InputField>
            <InputField>
              <Label htmlFor="inputConfirmPassword">비밀번호 확인</Label>
              <Input
                ref={confirmPasswordRef}
                type="password"
                id="inputConfirmPassword"
                placeholder="Confirm Password"
                required
              />
            </InputField>

            <ButtonContainer>
              <Button type="submit" $blue>
                회원가입
              </Button>

              <Button>
                <Link to="/signin">로그인</Link>
              </Button>
            </ButtonContainer>
          </FormContainer>
        </Article>
      </Section>
    </Layout>
  );
}
