import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <form>
        <h1>To register</h1>
        <Input type="text" icon={FiUser} name="name" placeholder="Name" />

        <Input type="text" icon={FiMail} name="email" placeholder="E-mail" />

        <Input
          type="password"
          icon={FiLock}
          name="password"
          placeholder="Password"
        />

        <Button type="submit">Register</Button>

        <a href="forgot">Forgot my password</a>
      </form>
      <a href="login">
        <FiArrowLeft />
        Back to Logon
      </a>
    </Content>
  </Container>
);

export default SignUp;
