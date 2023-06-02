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
import { IngredientEntity } from "../adapter/api/__generated";
import axios from "axios";

export const IngredientPage = () => {
  const [ingredientEntry, setIngredientsEntries] = useState<IngredientEntity[]>(
    []
  );
  const [search, setSearchEntries] = useState("");
  const [text, setText] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const findIngredient = await api.getIngredientsFindByName(search);
    if (findIngredient.data.length) {
      setIngredientEntries(findIngredient.data);
      setText("");
    } else {
      setText("Failed to find Ingredient. Try again");
    }
    //console.log("Test" + responseNutrition?.data.message);
  };
  const api = useApiClient();
  const [ingredientsEntries, setIngredientEntries] = useState<
    IngredientEntity[]
  >([]);

  const fetchData = async () => {
    const data = await api.getIngredientsFind();
    setIngredientEntries(data.data);
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
            {ingredientsEntries.map((entry) => {
              return (
                <Tr key={entry.id}>
                  <Td>
                    <Link
                      href={"ingredient_details/" + entry.ingredientName}
                      textDecorationLine="underline"
                      color="blue"
                    >
                      {entry.ingredientName}
                    </Link>
                  </Td>
                  <Td>{entry.ingredientDescription}</Td>
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
      <Link href="/ingredient_create/">
        <Button bg="green.600">Create new Ingredient</Button>
      </Link>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Search an ingredient!</label>
          <Input
            placeholder="ingredient"
            size="lg"
            value={search}
            onChange={(e: any) => setSearchEntries(e.target.value)}
          />
          <p>{text}</p>
          <Button type="submit" onClick={handleSubmit}>
            Search
          </Button>
          <Link
            href="/ingredients"
            textDecorationLine="underline"
            textColor="blue"
          >
            All Ingredients
          </Link>
        </form>
      </div>
    </AppLayout>
  );
};
