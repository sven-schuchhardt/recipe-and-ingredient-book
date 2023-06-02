import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Link,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
  Button,
  Input,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { AppLayout } from "../layout/AppLayout";
import { MainCard } from "../layout/components/MainCard";
import React, { useState } from "react";
import { useApiClient } from "../adapter/api/useApiClient";
import { IngredientEntity, RecipeEntity } from "../adapter/api/__generated";
import axios from "axios";
import { IngredientDeletePage } from "./IngredientDeletePage";

export const RecipeFindFromIngredient = () => {
  const api = useApiClient();
  const [recipesEntries, setRecipeEntries] = useState<RecipeEntity[]>([]);
  const [searchID, setSearchIdEntries] = useState("");
  const [text, setText] = useState("");
  const [allIngredients, setAllIngredients] = useState<IngredientEntity[]>([]);
  let id = "";
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    {
      allIngredients
        .filter((ingredient) =>
          ingredient.ingredientName.toLowerCase().includes(query.toLowerCase())
        )
        .map((entry) => {
          if (entry.ingredientName.toLowerCase() === query) {
            id = entry.id;
          } else {
            id = query;
          }
        });
    }
    const loadedRecipes = await api.getRecipesFindRecipeFromIngredient(id);
    if (loadedRecipes.data.length) {
      setRecipeEntries(loadedRecipes.data);
      setText("");
    } else {
      setText("Failed to find Ingredient. Try again");
    }
    //console.log("Test" + responseNutrition?.data.message);
  };

  const [query, setQuery] = useState("");

  const fetchData = async () => {
    const data = await api.getIngredientsFind();
    setAllIngredients(data.data);
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
            </Tr>
          </Thead>
          <Tbody>
            {recipesEntries.map((entry) => {
              return (
                <Tr key={entry.id}>
                  <Td>
                    <Link
                      href={"ingredient_details/" + entry.recipeName}
                      textDecorationLine="underline"
                      color="blue"
                    >
                      {entry.recipeName}
                    </Link>
                  </Td>
                  <Td>{entry.recipeDescription}</Td>
                  <Td>
                    <Link href={"/ingredient_edit/" + entry.id} color="blue">
                      {<EditIcon />}
                    </Link>
                  </Td>
                  <Td>
                    <Link href={"/ingredient_delete/" + entry.id} color="red">
                      {<DeleteIcon />}
                    </Link>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Search for an specific ingredient in all Recipes with Name or ID
          </label>
          {/*<Input placeholder='ingredient' size='lg' value={searchID} onChange={(e:any ) => setSearchIdEntries(e.target.value)}/>*/}
          <Input
            placeholder="ingredient"
            size="lg"
            value={query}
            onChange={(e: any) => setQuery(e.target.value)}
          />
          <ul>
            {allIngredients
              .filter((ingredient) =>
                ingredient.ingredientName
                  .toLowerCase()
                  .includes(query.toLowerCase())
              )
              .map((entry) => {
                return (
                  <li key={entry.id} className="listItem">
                    {"Namen: " + entry.ingredientName + " || ID: " + entry.id}
                  </li>
                );
              })}
          </ul>
          <p>{text}</p>
          <Button type="submit" onClick={handleSubmit}>
            Search
          </Button>
          <Link href="/recipe" textDecorationLine="underline" textColor="blue">
            All Recipes
          </Link>
        </form>
      </div>
    </AppLayout>
  );
};
