import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react';
import api from '../../services/api';

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  }: any = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    const { username, password } = values;
    const response = await api.auth.login(username, password);
    if (response.status === 200) {
      console.log('Usuario autenticado');
      navigate('/', { replace: true });
    }
  };

  return (
    // @ts-ignore
    <Box w="450px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          {/* @ts-ignore */}
          <Box m={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="username"
              placeholder="Email"
              type="email"
              {...register('username', {
                required: 'Email es requerido',
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </Box>
          {/* @ts-ignore */}
          <Box m={4}>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              placeholder="Contraseña"
              type="password"
              {...register('password', {
                required: 'Contraseña es requerida',
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </Box>
        </FormControl>
        {/* @ts-ignore */}
        <Button m={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Iniciar sesión
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
