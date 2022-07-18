import React from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Switch,
  Textarea,
} from '@chakra-ui/react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import api from '../../services/api';

interface RecipeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  }: any = useForm({
    defaultValues: {
      review: '1',
      ingredients: [{ value: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const onSubmit = async (values: any) => {
    const body = {
      ...values,
      ingredients: values.ingredients
        .map((ingredient: any) => ingredient.value)
        .join('|'),
      image_url: '',
    };
    const response = await api.recipes.addRecipe(body);
    // TODO: handle response & send success or error notification
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Nueva receta</DrawerHeader>

        <DrawerBody as="form" onSubmit={handleSubmit(onSubmit)}>
          {/* @ts-ignore */}
          <FormControl isInvalid={errors.title} mb="20px">
            <FormLabel htmlFor="title">Nombre de la receta</FormLabel>
            <Input
              id="title"
              placeholder="Nombre de la receta"
              type="text"
              errorBorderColor="red.500"
              {...register('title', {
                required: 'Nombre de la receta es requerido',
              })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          {/* @ts-ignore */}
          <FormControl mb="20px">
            <FormLabel>Ingredientes</FormLabel>
            {fields.map((item, index) => (
              // @ts-ignore
              <HStack key={item.id} my="4px">
                <Input
                  id={item.id}
                  placeholder={`Ingrediente ${index + 1}`}
                  type="text"
                  errorBorderColor="red.500"
                  {...register(`ingredients.${index}.value` as const)}
                />
                {fields.length - 1 === index && (
                  <Button
                    type="button"
                    colorScheme="yellow"
                    onClick={() =>
                      append(
                        { value: '' },
                        { focusName: 'ingredients.0.value' }
                      )
                    }
                  >
                    ➕
                  </Button>
                )}
                {fields.length - 1 !== index && (
                  <Button
                    type="button"
                    colorScheme="yellow"
                    onClick={() => remove(index)}
                  >
                    ➖
                  </Button>
                )}
              </HStack>
            ))}
          </FormControl>
          {/* @ts-ignore */}
          <FormControl isInvalid={errors.instructions} mb="20px">
            <FormLabel htmlFor="instructions">Preparación</FormLabel>
            <Textarea
              id="instructions"
              placeholder="Preparación de la receta"
              errorBorderColor="red.500"
              {...register('instructions', {
                required: 'Preparación de la receta es requerido',
              })}
            />
            <FormErrorMessage>
              {errors.instructions && errors.instructions.message}
            </FormErrorMessage>
          </FormControl>
          {/* @ts-ignore */}
          <FormControl isInvalid={errors.review} mb="20px">
            <FormLabel>Reseñas</FormLabel>
            <Controller
              name="review"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup onChange={onChange} value={value}>
                  <HStack>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                    <Radio value="4">4</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
            <FormErrorMessage>
              {errors.review && errors.review.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="is_coocked">Cocinado antes</FormLabel>
            <Switch id="is_coocked" {...register('is_coocked')} />
          </FormControl>

          {/* @ts-ignore */}
          {/* <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button> */}
          <HStack justify="flex-end">
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Crear
            </Button>
          </HStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default RecipeForm;
