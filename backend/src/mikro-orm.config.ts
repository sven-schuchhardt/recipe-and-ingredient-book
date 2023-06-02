import { Options } from '@mikro-orm/core';
import { IngredientEntity, RecipeIngredientEntity } from './entities';
import { RecipeEntity } from './entities/RecipesEntity';
//Entities
const options: Options = {
  type: 'postgresql',
  entities: [RecipeEntity, IngredientEntity, RecipeIngredientEntity],
  dbName: 'Hausaufgabe1',
  password: 'fweSS22',
  user: 'ha1DBUser',
  debug: true,
  allowGlobalContext: true
};

export default options;
