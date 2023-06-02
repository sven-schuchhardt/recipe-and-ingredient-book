# **Recipe Book**

## Table of Contents
 - [Introduction](#Introduction)
 - [Technologies](#Technologies)
 - [Installation](#Installation)
 - [Launch](#Launch)
 - [Features](#Features)
 - [How to test](#Howtotest)


### Introduction
A Recipe Book with the possibility to create and edit Recipes in a plain design . Ingredients can be added and managed to the Recipe Book and to a specific Recipe.
You can also search for a whole bunch of ingredients and get some nutrition informations for those.

### Technologies

#### Backend:

 - Express
 - NodeJS
 - TypeScript
 - MikroORM
 - PostgresQL
 
#### Frontend
 - React
 - Vite

### Installation
      Backend:
        - go to backend folder 
        - type npm i in terminal 
        - root folder to docker-compose.yml
        - type docker-compose up into terminal
  
      Frontend:
        - go to frontend folder 
        - type npm i in terminal 
### Launch
 For backend u need to start docker-compose up for the container and database.
 And for the web server you go into the backend folder and type npm start into the terminal
 
 For Frontend you go into the frontend folder and type npm run-script preview
 

### Features
**Freestyle Task:**
The Backend provides a  Get-Route `/nutritionInfo/:nutrition`
That Route provides a Request to the external API from CalorieNinjas. 
The parameter `:nutrition` is a string, that takes a word or sentence where the API searches for ingredients and amount of ingredients inside that string. An response with nutrition informations regarding those ingredients  and amounts will be send back as array of JSON-Objects 

 
      {
      "items": [
        {
          "sugar_g": 0.0,
          "fiber_g": 0.0,
          "serving_size_g": 85.0,
          "sodium_mg": 61,
          "name": "chicken",
          "potassium_mg": 152,
          "fat_saturated_g": 3.1,
          "fat_total_g": 11.0,
          "calories": 189.2,
          "cholesterol_mg": 78,
          "protein_g": 20.2,
          "carbohydrates_total_g": 0.0
        },
        {
          "sugar_g": 0.4,
          "fiber_g": 0.0,
          "serving_size_g": 100.0,
          "sodium_mg": 143,
          "name": "eggs",
          "potassium_mg": 200,
          "fat_saturated_g": 3.1,
          "fat_total_g": 9.4,
          "calories": 144.3,
          "cholesterol_mg": 373,
          "protein_g": 12.6,
          "carbohydrates_total_g": 
Thats the following response from the external API for the request parameter `1 chicken 2 eggs `         

In the second Part of the Get-Route `/nutritionInfo/:nutrition` is a function called to sum up all values from protein, calories and carbohydrates. In case of `1 chicken 2 eggs`
the Route will send following response back: `{
  "message": 
  "Protein: 32.8 
  Carbs: 0.7 
  Calories: 333.5"
}`
The search field is available at the bottom of the recipe page on the website to send the request with the `:nutrition`parameter

### How to test
How to test the application:
The project contains a postman folder that provides a collection of postman request to use all routes available from the APi
