import { Flex } from "@chakra-ui/react";
import { AppHeader, AppHeaderProps } from "./AppHeader";
import { Page, PageProps } from "./Page";

// type BaseLayoutProps ={
//     headerMenu: React.ReactNode;
//     headerRightMenu: React.ReactNode;
// };
export type BaseLayoutProps = AppHeaderProps & PageProps;
export const BaseLayout = ({ headerMenu, ...pageProps }: BaseLayoutProps) => {
  return (
    <Flex bg={"white"} _dark={{ bg: "init" }} flexDirection="column">
      <AppHeader headerMenu={headerMenu} />
      <Page {...pageProps} />
    </Flex>
  );
};
