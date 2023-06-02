import { NavItem, NavLink } from "./Nav";
import { BaseLayout, BaseLayoutProps } from "./BaseLayout";
// import { NavColorModeToggle } from "./NavColorModeToggle";
import { HStack, VStack } from "@chakra-ui/react";

const HeaderMenu = () => {
  return (
    <>
      <NavItem>
        <NavLink></NavLink>
      </NavItem>
    </>
  );
};

const headerRightMenu = (
  <HStack>
    <NavItem></NavItem>
  </HStack>
);

export type AppLayoutProps = Partial<BaseLayoutProps>;

export const AppLayout = (props: AppLayoutProps) => (
  <BaseLayout headerMenu={<HeaderMenu />} {...props} />
);
