import express from 'express';
import http from 'http';

import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { RecipeEntity } from './entities/RecipesEntity';
import { RecipeController} from './controller/recipe.controller';
import { IngredientEntity, RecipeIngredientEntity } from './entities';
import { ingredientController } from './controller/ingredient.controller';

/**
 * shutdowm function?
 */

const PORT = process.env.PORT || 3000;

const app = express();

export const DI = {} as {
    server: http.Server;
    orm: MikroORM;
    em: EntityManager;
    recipeRepository: EntityRepository<RecipeEntity>
    ingredientRepository: EntityRepository<IngredientEntity>
    recipeAndIngredientRepository: EntityRepository<RecipeIngredientEntity>
    //Repositories
};


export const initializeServer = async () => {
    DI.orm = await MikroORM.init();
    DI.em = DI.orm.em;
    //Repos
    DI.recipeRepository = DI.orm.em.getRepository(RecipeEntity);
    DI.ingredientRepository = DI.orm.em.getRepository(IngredientEntity);
    DI.recipeAndIngredientRepository = DI.orm.em.getRepository(RecipeIngredientEntity);
    //example middleware?

    //global middleware?
    app.use(express.json());
    app.use((req, res, next) => RequestContext.create(DI.orm.em, next));

    //routes
    app.use('/recipes', RecipeController);
    app.use('/ingredients', ingredientController);

    DI.server = app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}
initializeServer();
/*const server = app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`);
})

const signals = ["SIGTERM", "SIGNINT"];

function shutDownServer(signal: string){
    process.on(signal, async () => {
        console.log('Singal: ', signal);
        server.close();
        console.log("Server disconnected");
        //disconnect db


        process.exit(0);
    })   
}

for(let i = 0; i < signals.length; i++){
    shutDownServer(signals[i]);
}*/