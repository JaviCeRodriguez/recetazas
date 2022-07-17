import React from 'react';
import { AxiosResponse } from 'axios';
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

interface RegisterFormTypes {
  email: string;
  password: string;
}

interface RegisterResponse {
  email: string;
  id: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

// interface ReqVerifyResponse {
//   token: string;
// }

const RegisterForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  }: any = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterFormTypes) => {
    const { email, password } = values;
    const registerResponse: AxiosResponse<RegisterResponse> =
      await api.auth.register(email, password);

    if (registerResponse.status === 201) {
      console.log('Usuario creado');
      navigate('/login', { replace: true });

      // TODO: Verificar usuario
      // const reqVerifyResponse: AxiosResponse<ReqVerifyResponse> =
      //   await api.auth.requestVerifyToken(email);
      // console.log(reqVerifyResponse);

      // if (reqVerifyResponse.status === 202) {
      //   console.log('Token generado:', reqVerifyResponse.data.token);
      //   const verifyResponse: AxiosResponse<any> = await api.auth.verify(
      //     reqVerifyResponse.data.token
      //   );
      //   console.log(verifyResponse);
      // }
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

export default RegisterForm;
