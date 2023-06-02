import { AppLayout } from "../layout/AppLayout";
import { useState } from "react";
import { useApiClient } from "../adapter/api/useApiClient";

export const RecipeCreatePage = () => {
  const api = useApiClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pictureLink, setPictureLink] = useState("");
  const [rating, setRating] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const recipe = { name, description, pictureLink, rating, steps };
    console.log(recipe);
  };

  return (
    <AppLayout>
      <div className="create">
        <h2>Add a new recipe</h2>
        <form onSubmit={handleSubmit}>
          <label>Recipe name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Recipe description:</label>
          <input type="text" required />
          <label>Recipe description:</label>
          <input type="text" required />
          <label>Recipe description:</label>
          <textarea></textarea>
          <button>create</button>
        </form>
      </div>
    </AppLayout>
  );
};
