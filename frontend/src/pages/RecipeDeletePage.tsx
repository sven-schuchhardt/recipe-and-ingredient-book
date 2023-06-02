import { Button, Heading } from "@chakra-ui/react";
import { AppLayout } from "../layout/AppLayout";
import React, { useState } from "react";
import { RecipeEntity } from "../adapter/api/__generated";
import { useParams } from "react-router-dom";
import { useApiClient } from "../adapter/api/useApiClient";

export const RecipeDeletePage = () => {
  const api = useApiClient();
  const params = useParams();
  let test: any;
  const [deletedEntry, setDeletedEntry] = useState<RecipeEntity[]>([]);
  const fetchData = async () => {
    const data = await api.deleteRecipes(params.id);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppLayout>
      <Heading>deleted your recipe</Heading>
    </AppLayout>
  );
};
