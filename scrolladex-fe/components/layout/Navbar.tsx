import React from "react";
import {
  Box,
  Flex,
  Text,
  Spacer,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import AddEmployeeModal from "../modals/AddEmployeeModal";
import { logoutUserAPI } from "@/api/authAPI";
import { useRouter } from "next/router";
import { useAuth } from "@/providers/AuthProvider";
import ManageDepartmentsModal from "../modals/ManageDepartmentsModal";

const Navbar: React.FC = () => {
  const {
    onOpen: addEmployeeOnOpen,
    isOpen: addEmployeeIsOpen,
    onClose: addEmployeeOnClose,
  } = useDisclosure();
  const {
    onOpen: manageDepartmentsOnOpen,
    isOpen: manageDepartmentsIsOpen,
    onClose: manageDepartmentsOnClose,
  } = useDisclosure();

  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();

  const { authenticated, setAuthenticated } = useAuth();
  const router = useRouter();
  return (
    <>
      <Flex
        padding="1rem"
        bg="pictonBlue"
        color="white"
        px={[2, null, 8, null, 24]}
      >
        <VStack alignItems="flex-start">
          <Text fontSize={["xl", null, "2xl", "4xl"]} color="white">
            Scroll-a-dex!
          </Text>
          <Text fontSize="xl" color="white" whiteSpace="nowrap">
            Your complete personnel directory
          </Text>
        </VStack>
        <Spacer />
        {authenticated && (
          <HStack display={{ base: "none", md: "flex" }}>
            <AddEmployeeModal
              isOpen={addEmployeeIsOpen}
              onClose={addEmployeeOnClose}
            />
            <ManageDepartmentsModal
              isOpen={manageDepartmentsIsOpen}
              onClose={manageDepartmentsOnClose}
            />
            <Button variant="green" onClick={addEmployeeOnOpen}>
              Add Employee
            </Button>
            <Button variant="green" onClick={manageDepartmentsOnOpen}>
              Manage Departments
            </Button>
            <Button
              onClick={() => {
                logoutUserAPI();
                setAuthenticated(false);
                router.replace("/login");
              }}
              variant="red"
            >
              Logout
            </Button>
          </HStack>
        )}
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={drawerOnOpen}
          />
          <Drawer
            isOpen={drawerIsOpen}
            onClose={drawerOnClose}
            placement="right"
          >
            <DrawerOverlay />
            <DrawerContent bg="blue">
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <Button variant="green" onClick={addEmployeeOnOpen}>
                  Add Employee
                </Button>
                {/* <Button variant="green" onClick={addDepartmentOnOpen}>
                  Add Department
                </Button> */}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
