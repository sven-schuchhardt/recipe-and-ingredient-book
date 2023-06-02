import { Box, chakra, HTMLChakraProps } from "@chakra-ui/react";

export const Nav = (props: HTMLChakraProps<"ul">) => {
  return <chakra.ul role="menu" {...props} display="flex" />;
};

export const NavItem = (props: HTMLChakraProps<"li">) => {
  return <chakra.li role="menuitem" listStyleType={"none"} {...props} />;
};

export interface NavButtonProps extends HTMLChakraProps<"button"> {
  icon?: React.ReactNode;
}

export const NavButton = ({ icon, children, ...props }: NavButtonProps) => {
  return (
    <chakra.button {...props}>
      {icon} {children}
    </chakra.button>
  );
};

export interface NavLinkProps extends HTMLChakraProps<"a"> {}

export const NavLink = ({ children, ...linkProps }: NavLinkProps) => {
  return (
    <chakra.a {...linkProps}>
      <Box>{children}</Box>
    </chakra.a>
  );
};
