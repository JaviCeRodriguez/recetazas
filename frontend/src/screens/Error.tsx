import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, Text, VStack } from '@chakra-ui/react';

const Error: React.FC = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate('/');
  }, 5000);

  return (
    // @ts-ignore
    <VStack h="100vh" justify="center">
      <Heading>Ups! Esta ruta no existe 😔</Heading>
      <Text>Serás redirigido al inicio, mientras tomate un mate 🧉</Text>
    </VStack>
  );
};

export default Error;
