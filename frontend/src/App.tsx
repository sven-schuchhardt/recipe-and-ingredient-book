import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { BaseLayout } from "./layout/BaseLayout";
import { NavItem, NavLink } from "./layout/Nav";

export const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  );
};
