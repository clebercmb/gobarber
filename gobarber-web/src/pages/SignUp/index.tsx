import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          email: Yup.string()
            .required('E-mail required')
            .email('Type a valid e-mail'),
          password: Yup.string().min(6, 'Minimal 6 digits'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);
        addToast({
          type: 'success',
          title: 'Register done!',
          description: 'You already can login into GoBarber!',
        });

        history.push('/');
      } catch (err) {
        console.log(err);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          // return;
        }

        // it triggers a toast
        addToast({
          type: 'error',
          title: 'Register Error',
          description: 'It happened an error to register, try again',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>To register</h1>

            <Input type="text" icon={FiUser} name="name" placeholder="Name" />

            <Input
              type="text"
              icon={FiMail}
              name="email"
              placeholder="E-mail"
            />

            <Input
              type="password"
              icon={FiLock}
              name="password"
              placeholder="Password"
            />

            <Button type="submit">Register</Button>

            <a href="forgot">Forgot my password</a>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Back to Sign In
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
