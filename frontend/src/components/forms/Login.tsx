import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react';

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  }: any = useForm();

  const onSubmit = (values: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve('Form submission success');
      }, 3000);
    });
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
              id="email"
              placeholder="Email"
              type="email"
              {...register('email', {
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
