import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import { RecipeEditPage } from "./pages/RecipeEdit";
import { HomePage } from "./pages/HomePage";
import { RecipeDeletePage } from "./pages/RecipeDeletePage";
import { RecipeDetailsPage } from "./pages/RecipeDetails";
import { RecipeCreatePage } from "./pages/RecipeCreatePage";
import { IngredientPage } from "./pages/IngredientPage";
import { IngredientDetailsPage } from "./pages/IngredientDetails";
import { IngredientDeletePage } from "./pages/IngredientDeletePage";
import { IngredientEditPage } from "./pages/IngredientEditPage";
import { RecipeFindFromIngredient } from "./pages/RecipeFindFromIngredientsPage";
import { IngredientCreate } from "./pages/IngredientCreatePage";

export type RouteConfig = RouteProps & { path: string; isPrivate?: boolean };

export const routes: RouteConfig[] = [
  {
    path: "/recipe",
    isPrivate: false,
    element: <HomePage />,
  },
  {
    path: "/",
    isPrivate: false,
    index: true,
    element: <Navigate to={"/recipe"} replace />,
  },
  //Recipe Routes
  {
    path: "/recipe_create/",
    isPrivate: false,
    element: <RecipeCreatePage />,
  },
  {
    path: "/recipe_details/:name",
    isPrivate: false,
    element: <RecipeDetailsPage />,
  },
  {
    path: "/recipe_edit/:id",
    isPrivate: false,
    element: <RecipeEditPage />,
  },
  {
    path: "/recipe_delete/:id",
    isPrivate: false,
    element: <RecipeDeletePage />,
  },
  {
    path: "/recipe_findFromIngredient/",
    isPrivate: false,
    element: <RecipeFindFromIngredient />,
  },
  //Ingredient Routes
  {
    path: "/ingredients",
    isPrivate: false,
    element: <IngredientPage />,
  },
  {
    path: "/ingredient_details/:name",
    isPrivate: false,
    element: <IngredientDetailsPage />,
  },
  {
    path: "/ingredient_edit/:id",
    isPrivate: false,
    element: <IngredientEditPage />,
  },
  {
    path: "/ingredient_delete/:id",
    isPrivate: false,
    element: <IngredientDeletePage />,
  },
  {
    path: "/ingredient_create/",
    isPrivate: false,
    element: <IngredientCreate />,
  },
];

const renderRouteMap = ({ isPrivate, element, ...restRoute }: RouteConfig) => {
  const renderElement = element;
  return <Route key={restRoute.path} element={renderElement} {...restRoute} />;
};

export const AppRoutes = () => {
  return <Routes>{routes.map(renderRouteMap)}</Routes>;
};
