import { Center, Box } from "@chakra-ui/react";

export const MainCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Center>
      <Box
        minH="400px"
        w="400px"
        borderRadius="lg"
        boxShadow="md"
        p={4}
        bg="white"
        _dark={{ bg: "gray.700" }}
      >
        {children}
      </Box>
    </Center>
  );
};
