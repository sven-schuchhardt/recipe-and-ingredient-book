import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { DI } from "..";
import { CreateIngredientDTO, CreateIngredientSchema, IngredientEntity } from "../entities";

const router = Router({mergeParams: true});

//get all ingredients
router.get('/find', async(req,res) => {
    const ingredients = await DI.ingredientRepository.find({});
    if(!ingredients){
        res.status(400).send('Ingredient not found');
    }
    res.status(200).send(ingredients);
});

//get specific ingredient
router.get('/findByName/:name', async(req, res) => {
    const ingredients = await DI.ingredientRepository.find(
        {
            ingredientName: req.params.name,
        },
    );
    if(!ingredients){
        res.status(400).send('Ingredient not found');
    }
    res.status(200).send(ingredients);
})    

//create an ingredient
router.post('/create', async(req, res) => {
    const validateData = await CreateIngredientSchema.validate(req.body).catch((e) => {
        res.status(400).json({errors: e.errors});
    })
    if(!validateData){
        return;
    }
    const CreateIngredientDTO: CreateIngredientDTO = {
        ...validateData,
        ingredientName: validateData.ingredientName,
        ingredientDescription: validateData.ingredientDescription,
        ingredientPictureLink: validateData.ingredientPictureLink,
    }  

    const newIngredient = new IngredientEntity(CreateIngredientDTO);
    await DI.ingredientRepository.persistAndFlush(newIngredient);
    return res.status(201).send(newIngredient);
});

//update an ingredient
router.put('/ingredientUpdate/:id', async(req, res) => {
    try{
        const ingredient = await DI.ingredientRepository.findOne(req.params.id, {

        });
        if(!ingredient){
            return res.status(404).send({message: 'Ingredient not found'});
        }

        wrap(ingredient).assign(req.body);
        await DI.ingredientRepository.flush();

        res.status(200).json(ingredient);
    }catch(e: any){
        return res.status(400).send({errors: [e.message]});
    }
});

//delete an ingredient
router.delete('/ingredientDelete/:id', async(req, res) => {
    try{
    const counter = await DI.ingredientRepository.count({ id: req.params.id,});

    const existingIngredient = await DI.ingredientRepository.find({
        id: req.params.id,
    });
    if(counter > 0 ){
        throw new Error('Still existing, cant be deleted');
    }
    const recipeAndIngredient = await DI.recipeAndIngredientRepository.find({
        ingredient: req.params.id,
      });
    if(!existingIngredient){
        return res.status(403).json({errors: ['You cant delete this id']});
    }
    await DI.recipeAndIngredientRepository.remove(recipeAndIngredient).flush();
    await DI.ingredientRepository.remove(existingIngredient).flush();
    return res.status(204).send('Ingredient deleted');
    }catch(e:any){
        return res.status(400).send({errors: [e.message]});
    }
});

export const ingredientController = router;