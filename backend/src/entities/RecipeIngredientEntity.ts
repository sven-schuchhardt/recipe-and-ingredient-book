import { CLIHelper } from "@mikro-orm/cli";
import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/postgresql";
import { number, object, string } from "yup";
import { BaseEntity } from './BaseEntity';
import { IngredientEntity } from "./IngredientEntity";
import { RecipeEntity } from "./RecipesEntity";


@Entity()
export class RecipeIngredientEntity{
    @ManyToOne({primary: true, entity: () =>  RecipeEntity})
    recipe: RecipeEntity;

    @ManyToOne({primary: true, entity: () =>  IngredientEntity})
    ingredient: IngredientEntity;

    @Property({nullable: true})
    amount: number;

    @Property({nullable: true})
    unit: string;

    constructor({recipe, ingredient, amount, unit}: CreateRecipeIngredientDTO) {
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.amount = amount;
        this.unit = unit;
    } 
}

export const CreateRecipeIngredientSchema = object({
    amount: number().required(),
    unit: string().required(), 
});

export type CreateRecipeIngredientDTO = {
    recipe: RecipeEntity;
    ingredient: IngredientEntity;
    amount: number;
    unit: string;
};

