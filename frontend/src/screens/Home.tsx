import React, { useEffect, useState } from 'react';
import { Button, useDisclosure, VStack } from '@chakra-ui/react';
import RecipesTable from '../components/RecipesTable';
import RecipeForm from '../components/forms/Recipe';
import api from '../services/api';

const Home: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const response = await api.recipes.meRecipes();
    if (response.status === 200) {
      setRecipes(response.data);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    // @ts-ignore
    <VStack h="100vh" justify="center" position="relative">
      <Button
        onClick={onOpen}
        colorScheme="linkedin"
        // @ts-ignore
        position="absolute"
        bottom="10px"
        right="10px"
      >
        ➕
      </Button>
      <RecipesTable recipes={recipes} />
      <RecipeForm isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default Home;
