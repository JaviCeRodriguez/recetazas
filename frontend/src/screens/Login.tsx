import React from 'react';
import { Heading, Link, Text, VStack } from '@chakra-ui/react';
import LoginForm from '../components/forms/Login';

const Login: React.FC = () => {
  return (
    // @ts-ignore
    <VStack h="100vh" justify="center">
      <Heading>Iniciar sesión</Heading>
      <LoginForm />
      <Text>
        ¿Quieres registrarte? <Link>Ir a registrarme</Link>
      </Text>
    </VStack>
  );
};

export default Login;
