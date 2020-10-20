import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail required')
            .email('Type a valid e-mail'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // Recovery password
        await api.post('/password/forgot', { email: data.email });

        addToast({
          type: 'success',
          title: 'Recovering e-mail has been sent',
          description:
            'It has beed sent an e-mail in order to recover the password. Check your e-mail box',
        });

        // history.push('/dashboard');
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
          title: 'Password Recovering Error',
          description:
            'It happened an error when trying to recover the password, try again',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recover Password</h1>
            <Input
              type="text"
              icon={FiMail}
              name="email"
              placeholder="E-mail"
            />

            <Button loading={loading} type="submit">
              Recover
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Return back to login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
