import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Link,
  TableContainer,
  Table,
  Thead,
  Text,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
  Button,
  Input,
  VStack,
  Stack,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { MainCard } from "../layout/components/MainCard";
import React, { useState } from "react";
import { useApiClient } from "../adapter/api/useApiClient";
import { RecipeEntity } from "../adapter/api/__generated";
import axios from "axios";
import { setApiKeyToObject } from "../adapter/api/__generated/common";

export const HomePage = () => {
  const api = useApiClient();
  const [recipeEntries, setRecipeEntries] = useState<RecipeEntity[]>([]);
  const [search, setSearchEntries] = useState("");
  const [nutritionResponse, setNutritionResponse] = useState();
  let searchQuery: string;
  let responseNutrition: any = {
    data: {
      message: "test",
    },
  };

  const [text, setText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [recipeSearch, setRecipeSearch] = useState("");
  const [failResponse, setFailedResponse] = useState("");

  const handleSubmitSearch = async (e: any) => {
    e.preventDefault();
    const findRecipe = await api.getRecipesFindByName(recipeSearch);
    if (findRecipe.data.length) {
      setRecipeEntries(findRecipe.data);
      setFailedResponse("");
    } else {
      setFailedResponse("Failed to find Recipe. Try again");
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    searchQuery = search;
    responseNutrition = await getNutritionInfo();
    setText(responseNutrition.data.message);
  };
  const getNutritionInfo = async () => {
    if (searchQuery) {
      return await api.getRecipesNutritionInfo(searchQuery);
    }
  };

  const fetchData = async () => {
    const data = await api.getRecipesFind();
    setRecipeEntries(data.data);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <AppLayout>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recipeEntries.map((entry) => {
              return (
                <Tr key={entry.id}>
                  <Td>
                    <Link
                      href={"recipe_details/" + entry.recipeName}
                      textDecorationLine="underline"
                      color="blue"
                    >
                      {entry.recipeName}
                    </Link>
                  </Td>
                  <Td>{entry.recipeDescription}</Td>
                  <Td>{entry.recipeRating}</Td>
                  <Td>
                    <Link href={"/recipe_edit/" + entry.id} color="blue">
                      {<EditIcon />}
                    </Link>
                  </Td>
                  <Td>
                    <Link href={"/recipe_delete/" + entry.id} color="red">
                      {<DeleteIcon />}
                    </Link>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack direction="row">
        <Link href="/recipe_create/">
          <Button bg="green.200">Create new Recipe</Button>
        </Link>
        <Link href="/recipe_findFromIngredient/">
          <Button bg="purple.200">Find Recipes with specific Ingredient</Button>
        </Link>
      </Stack>
      <div>
        <form onSubmit={handleSubmitSearch}>
          <label>Search a recipe!</label>
          <Input
            placeholder="search recipe"
            size="lg"
            value={recipeSearch}
            onChange={(e: any) => setRecipeSearch(e.target.value)}
          />
          <p>{failResponse}</p>
          <Button type="submit" onClick={handleSubmitSearch}>
            Search Recipe
          </Button>
          <Link href="/recipe" textDecorationLine="underline" textColor="blue">
            All Recipes
          </Link>
        </form>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Find your Nutrition Infos right here!</label>
          <Input
            placeholder="1 Chicken 2 Eggs"
            size="lg"
            value={search}
            onChange={(e: any) => setSearchEntries(e.target.value)}
          />
          <p>{text}</p>
          <Button type="submit" onClick={handleSubmit}>
            Search Infos
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};
