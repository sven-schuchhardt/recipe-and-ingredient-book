import { Button, chakra, Flex } from "@chakra-ui/react";
import { Nav } from "./Nav";

export type AppHeaderProps = {
  headerMenu: React.ReactNode;
};
export const AppHeader = (props: AppHeaderProps) => {
  return (
    <Flex
      as="header"
      bg="green.600"
      alignItems="center"
      justifyContent="space-between"
      px="4"
      py="4"
    >
      <chakra.a href={"/"}>
        <Button>Home</Button>
      </chakra.a>
      <Nav>{props.headerMenu}</Nav>
      <chakra.a href={"/ingredients"}>
        <Button>Ingredients</Button>
      </chakra.a>
      <Nav>{props.headerMenu}</Nav>
      <chakra.a href={"/"}>
        <Button>Recipes</Button>
      </chakra.a>
      <Nav>{props.headerMenu}</Nav>
    </Flex>
  );
};
