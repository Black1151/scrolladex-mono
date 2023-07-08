import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import DrawerButton from "./DrawerButton";

interface Props {
  drawerIsOpen: boolean;
  drawerOnClose: () => void;
  addEmployeeOnOpen: () => void;
  manageDepartmentsOnOpen: () => void;
  toggleSearchPanel: () => void;
  handleLogout: () => void;
}

const NavDrawer: React.FC<Props> = ({
  drawerIsOpen,
  drawerOnClose,
  addEmployeeOnOpen,
  manageDepartmentsOnOpen,
  toggleSearchPanel,
  handleLogout,
}) => {
  return (
    <Drawer isOpen={drawerIsOpen} onClose={drawerOnClose} placement="right">
      <DrawerOverlay />
      <DrawerContent bg="rgba(0, 0, 0, 0.6)">
        <HStack justifyContent="space-between" py={4} px={6}>
          <DrawerHeader p={0}>
            <Text color="white">Menu</Text>
          </DrawerHeader>
          <Button
            bg="transparent"
            border="none"
            color="white"
            size="xl"
            _hover={{ bg: "pictonBlue" }}
            onClick={drawerOnClose}
          >
            <FaTimes size={30} />
          </Button>
        </HStack>
        <DrawerBody>
          <VStack gap={2}>
            <DrawerButton
              label="Add Employee"
              action={addEmployeeOnOpen}
              colorVariant="green"
              drawerOnClose={drawerOnClose}
            />
            <DrawerButton
              label="Manage Departments"
              action={manageDepartmentsOnOpen}
              colorVariant="green"
              drawerOnClose={drawerOnClose}
            />
            <DrawerButton
              label="Search"
              action={toggleSearchPanel}
              colorVariant="green"
              drawerOnClose={drawerOnClose}
            />
            <DrawerButton
              label="Logout"
              action={handleLogout}
              colorVariant="red"
              drawerOnClose={drawerOnClose}
            />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
