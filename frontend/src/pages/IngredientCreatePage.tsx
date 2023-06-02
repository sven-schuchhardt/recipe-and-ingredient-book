import { AppLayout } from "../layout/AppLayout";
import { useState } from "react";
import { useApiClient } from "../adapter/api/useApiClient";

export const IngredientCreate = () => {
  const api = useApiClient();
  const [ingredientName, setName] = useState("");
  const [ingredientDescription, setDescription] = useState("");
  const [ingredientPictureLink, setPictureLink] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const ingredient = {
      ingredientName,
      ingredientDescription,
      ingredientPictureLink,
    };
    console.log(ingredient);

    //const test = api.postIngredientsCreate();
  };

  return (
    <AppLayout>
      <div className="create">
        <h2>Add a new recipe</h2>
        <form onSubmit={handleSubmit}>
          <label>Ingredient name:</label>
          <input
            type="text"
            required
            value={ingredientName}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Ingredient description:</label>
          <input type="text" value={ingredientDescription} required />
          <label>Ingredient Link:</label>
          <input type="text" required value={ingredientPictureLink} />
          <button>create</button>
        </form>
      </div>
    </AppLayout>
  );
};
