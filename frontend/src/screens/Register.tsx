import React from 'react';
import { Heading, Link, Text, VStack } from '@chakra-ui/react';
import RegisterForm from '../components/forms/Register';

const Register: React.FC = () => {
  return (
    // @ts-ignore
    <VStack h="100vh" justify="center">
      <Heading>Registrarse</Heading>
      <RegisterForm />
      <Text>
        ¿Quieres iniciar sesión? <Link>Ir a inicio de sesión</Link>
      </Text>
    </VStack>
  );
};

export default Register;
