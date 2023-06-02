import { Button, Heading } from "@chakra-ui/react";
import { AppLayout } from "../layout/AppLayout";
import React, { useState } from "react";
import { IngredientEntity, RecipeEntity } from "../adapter/api/__generated";
import { useParams } from "react-router-dom";
import { useApiClient } from "../adapter/api/useApiClient";

export const IngredientDeletePage = () => {
  const api = useApiClient();
  const params = useParams();
  let test: any;
  const [deletedEntry, setDeletedEntry] = useState<IngredientEntity[]>([]);
  const fetchData = async () => {
    const data = await api.deleteIngredientsIngredientDelete(params.id);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppLayout>
      <Heading>deleted your ingredient</Heading>
    </AppLayout>
  );
};
