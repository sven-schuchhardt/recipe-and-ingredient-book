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
import {
  IngredientEntity,
  RecipeEntity,
  RecipeEntityIngredients,
} from "../adapter/api/__generated";
import { useParams } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const RecipeDetailsPage = (recipe: RecipeEntity) => {
  const api = useApiClient();
  const [recipeEntry, setRecipeEntry] = useState<RecipeEntity[]>([]);
  const [ingredientEntry, set] = useState<RecipeEntity[]>([]);
  const [recipeIngredient, setRecipeIngredient] = useState<
    RecipeEntityIngredients[]
  >([]);
  const params = useParams();
  let count = 1;
  function formatRecipeSteps() {
    let steps: string[] = [];
    let recipeSteps: string[] = [];
    {
      recipeEntry.map((entry) => {
        steps = entry.recipeSteps;
        for (let i of steps) {
          let temp = i;
          temp = count + ". " + temp + "; ";
          count++;
          recipeSteps.push(temp);
        }
        count = 1;
      });
    }

    return recipeSteps;
  }

  const fetchData = async () => {
    const data = await api.getRecipesFindByName(params.name);
    setRecipeEntry(data.data);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppLayout>
      <Heading>Recipe details</Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tbody>
              {recipeEntry.map((entry) => {
                return (
                  <Tr key={entry.id}>
                    <Tr>
                      <Th>Name:</Th>
                      <Td>{entry.recipeName}</Td>
                    </Tr>
                    <Tr>
                      <Th>Description:</Th>
                      <Td>{entry.recipeDescription}</Td>
                    </Tr>
                    <Tr>
                      <Th>Image Link:</Th>
                      <Td>{entry.recipePictureLink}</Td>
                    </Tr>
                    <Tr>
                      <Th>Recipe Steps:</Th>
                      <Td>{formatRecipeSteps()}</Td>
                    </Tr>
                    <Tr>
                      {recipeEntry.map(() => {
                        return (
                          <Tr>
                            <Td>entry</Td>
                            <Td>{}</Td>
                          </Tr>
                        );
                      })}
                      <Th>Ingredients:</Th>
                      <Td>ingredients</Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Link href={"/recipe_edit/" + entry.id} color="blue">
                          <Button type="button">edit</Button>
                        </Link>
                      </Td>
                      <Td>
                        <Link href={"/recipe_delete/" + entry.id} color="red">
                          <Button type="button">delete</Button>
                        </Link>
                      </Td>
                    </Tr>
                  </Tr>
                );
              })}
            </Tbody>
          </Thead>
        </Table>
      </TableContainer>
    </AppLayout>
  );
};
