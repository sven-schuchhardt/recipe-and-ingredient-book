import {
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useApiClient } from "../adapter/api/useApiClient";
import { AppLayout } from "../layout/AppLayout";
import React, { useState } from "react";
import { IngredientEntity, RecipeEntity } from "../adapter/api/__generated";
import { useParams } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const IngredientDetailsPage = (recipe: RecipeEntity) => {
  const api = useApiClient();
  const [ingredientEntry, setIngredientEntry] = useState<IngredientEntity[]>(
    []
  );
  const params = useParams();

  const fetchData = async () => {
    console.log(params);
    const data = await api.getIngredientsFindByName(params.name);
    setIngredientEntry(data.data);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppLayout>
      <Heading>Ingredient details</Heading>
      <TableContainer>
        <Table variant="simple">
          <Tr key={ingredientEntry.at(0)?.ingredientName}>
            <Td>Name</Td>
            <Td>{ingredientEntry.at(0)?.ingredientName}</Td>
          </Tr>
          <Tr key={ingredientEntry.at(0)?.ingredientDescription}>
            <Td>Description</Td>
            <Td>{ingredientEntry.at(0)?.ingredientDescription}</Td>
          </Tr>
          <Tr key={ingredientEntry.at(0)?.ingredientPictureLink}>
            <Td>PictureLink</Td>
            <Td>{ingredientEntry.at(0)?.ingredientPictureLink}</Td>
          </Tr>
        </Table>
      </TableContainer>
    </AppLayout>
  );
};
