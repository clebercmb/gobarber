import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  return (
    <>
      <Container>
        <Image source={logoImg} />

        <Title>Sign-In</Title>

        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="password" icon="lock" placeholder="Password" />

        <Button
          onPress={() => {
            console.log('>>>>Hi');
          }}
        >
          Enter
        </Button>

        <ForgotPassword
          onPress={() => {
            console.log('Sign Button');
          }}
        >
          <ForgotPasswordText>Forgot my password</ForgotPasswordText>
        </ForgotPassword>
      </Container>

      <CreateAccountButton onPress={() => {}}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Create an account</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
