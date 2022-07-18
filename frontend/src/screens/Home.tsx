import React from 'react';
import { Button, useDisclosure, VStack } from '@chakra-ui/react';
import RecipesTable from '../components/RecipesTable';
import RecipeForm from '../components/forms/Recipe';

const Home: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <RecipesTable />
      <RecipeForm isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default Home;
