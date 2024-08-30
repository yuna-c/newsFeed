import supabase from '../../api/supabase';

import { useState } from 'react';
import { Section, Article } from '../../styles/layout';
import styled from 'styled-components';
import Layout from '../layout/Layout';
import Button from '../common/Button';

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

export default function Mypage() {
  const onHandleSubmit = (e) => {
    e.preventDefault();
  };

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);

  const signUp = async (email, password) => {
    const { data: User, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return data;
  };

  const onHandleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await signUp(email, password);
      console.log('회원가입 성공:', data);
      // 추가적인 처리 (예: 로그인 페이지로 이동)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout title={'myPage'}>
      <Section>
        <h2>Section</h2>
        username: 강구1234
        <Article>
          <h2>회원가입</h2>
          <form onSubmit={onHandleSignUp}>
            <InputField>
              <label htmlFor="id" style={{ width: '80px', display: 'inline-block' }}>
                아이디 :
              </label>
              <Input type="text" id="id" value={id} placeholder="id" onChange={(e) => setId(e.target.value)} />
            </InputField>
            <InputField>
              <label htmlFor="password" style={{ width: '80px', display: 'inline-block' }}>
                비밀번호 :
              </label>
              <Input
                type="text"
                id="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputField>
            <InputField>
              <label htmlFor="email" style={{ width: '80px', display: 'inline-block' }}>
                이메일 :
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputField>
            <InputField>
              <label htmlFor="name" style={{ width: '80px', display: 'inline-block' }}>
                이름 :
              </label>
              <Input type="name" id="name" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} />
            </InputField>
            <div className="button-group">
              <Button>회원가입</Button>
            </div>
          </form>
        </Article>
      </Section>
    </Layout>
  );
}
