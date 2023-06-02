import { IngredientEntity, RecipeEntity } from '../entities';

declare global {
  namespace Express {
    interface Request {
      recipe: RecipeEntity | null;
    }
  }
}
