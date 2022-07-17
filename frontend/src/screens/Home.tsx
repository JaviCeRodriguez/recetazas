import React from 'react';
import { VStack } from '@chakra-ui/react';
import RecipesTable from '../components/RecipesTable';

const Home: React.FC = () => {
  return (
    // @ts-ignore
    <VStack h="100vh" justify="center">
      <RecipesTable />
    </VStack>
  );
};

export default Home;
