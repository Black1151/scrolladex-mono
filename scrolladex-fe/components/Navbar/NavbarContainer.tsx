// NavbarContainer.tsx

import React from "react";
import { Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import NavBarButtons from "./NavBarButtons";

const NavbarContainer: React.FC<any> = ({ navbarButtonsProps }) => {
  return (
    <Flex
      position="fixed"
      top="0"
      width="100vw"
      zIndex="1000"
      py={1}
      bg="pictonBlue"
      color="white"
      px={[6, null, 8, null, 24]}
      alignItems={"center"}
      h={16}
    >
      <VStack alignItems="flex-start">
        <Text fontSize={["xl", "4xl"]} color="white">
          Scroll-a-dex!
        </Text>
      </VStack>
      <Spacer />
      <NavBarButtons {...navbarButtonsProps} />
    </Flex>
  );
};

export default NavbarContainer;
