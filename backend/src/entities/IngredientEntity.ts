
import { Entity, Property } from "@mikro-orm/core";
import { object, string } from "yup";
import { BaseEntity } from './BaseEntity';

@Entity()
export class IngredientEntity extends BaseEntity{

    @Property()
    ingredientName: string;

    @Property()
    ingredientDescription: string;

    @Property()
    ingredientPictureLink: string;

    constructor({ingredientName, ingredientDescription, ingredientPictureLink}: CreateIngredientDTO) {
        super();
        this.ingredientName = ingredientName;
        this.ingredientDescription = ingredientDescription;
        this.ingredientPictureLink = ingredientPictureLink;
    }
}

export const CreateIngredientSchema = object({
    ingredientName: string().required(),
    ingredientDescription: string().required(),
    ingredientPictureLink: string().required(),
})

export type CreateIngredientDTO = {
    ingredientName: string;
    ingredientDescription: string;
    ingredientPictureLink: string;
}