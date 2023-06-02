import { Cascade, Collection, Entity, ManyToMany, OneToMany, Property } from "@mikro-orm/core";
import { array, number, object, string } from "yup";
import { BaseEntity } from './BaseEntity';
import { CreateIngredientDTO, IngredientEntity } from "./IngredientEntity";
import { RecipeIngredientEntity } from "./RecipeIngredientEntity";


/**
 * BaseEntity
 * recipe steps array, string?
 * link string?
 * rating int? float?
 * which att required?
 * CreateRecipe DTO?
 * Ingredient 
 */

@Entity()
export class RecipeEntity extends BaseEntity {
    @Property()
    recipeName: string;

    @Property()
    recipeDescription: string;

    @Property()
    recipePictureLink: string;

    @Property()
    recipeSteps: string[];

    @Property()
    recipeRaiting: number;

    @OneToMany(() => RecipeIngredientEntity, (item) => item.recipe,{ cascade: [Cascade.REMOVE]})
    ingredients = new Collection<RecipeIngredientEntity>(this);



    constructor ({recipeName, recipeDescription, recipePictureLink, recipeSteps, recipeRaiting, }: CreateRecipeDTO){
        super();
        this.recipeName = recipeName;
        this.recipeDescription = recipeDescription;
        this.recipePictureLink = recipePictureLink;
        this.recipeSteps = recipeSteps;
        this.recipeRaiting = recipeRaiting;   
    }
}

    export const CreateRecipeSchema = object({
        recipeName: string().required(),
        recipeDescription: string().required(),
        recipePictureLink: string().required(),
        recipeSteps: array().required(),
        recipeRating: number().required(),
    });

    //export type CreateRecipeDTOIngredient = Partial<Pick<IngredientEntity, 'id' | 'ingredientName' | 'ingredientUnit' >>;
    export type CreateRecipeDTO = {
        recipeName: string;
        recipeDescription: string;
        recipePictureLink: string;
        recipeSteps: string[];
        recipeRaiting: number;
        ingredients?: CreateIngredientDTO[];
    };