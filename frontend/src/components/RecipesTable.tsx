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

const RecipesTable: React.FC = (): JSX.Element => {
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((recipe: number) => (
          <Tbody key={`recipe-${recipe}`}>
            <Tr>
              <Td>Melodía de bayas mixtas</Td>
              <Td>⭐⭐⭐⭐</Td>
              <Td>
                <Switch colorScheme="green" size="lg" />
              </Td>
            </Tr>
          </Tbody>
        ))}
      </Table>
    </TableContainer>
  );
};

export default RecipesTable;
