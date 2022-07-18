import React from 'react';
import {
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface RecipeType {
  created_at: string;
  id: number;
  image_url: string;
  ingredients: string;
  instructions: string;
  is_coocked: boolean;
  review: number;
  title: string;
  updated_at: string;
  user_id: string;
}

const RecipesTable: React.FC<{ recipes: RecipeType[] }> = ({ recipes }) => {
  // generate emoji stars based on number review
  const generateStars = (review: number) => {
    let stars = '';
    for (let i = 0; i < review; i++) {
      stars += '⭐';
    }
    return stars;
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre de la receta</Th>
            <Th>Reseñas</Th>
            <Th>Cocinado antes</Th>
          </Tr>
        </Thead>
        {recipes.map((recipe: RecipeType) => (
          <Tbody key={`recipe-${recipe.id}`}>
            <Tr>
              <Td>{recipe.title}</Td>
              <Td>{generateStars(recipe.review)}</Td>
              <Td>
                <Switch
                  colorScheme="green"
                  size="lg"
                  defaultChecked={recipe.is_coocked}
                />
              </Td>
            </Tr>
          </Tbody>
        ))}
      </Table>
    </TableContainer>
  );
};

export default RecipesTable;
