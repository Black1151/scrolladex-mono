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
import { useRouter } from "next/router";
import ManageDepartmentsModal from "../modals/ManageDepartmentsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faBuilding,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import ModalIconButton from "../modals/ModalIconButton";
import { useAsyncAction } from "@/hooks/async";
import { logoutUser } from "@/store/authSlice";

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

  const logOut = useAsyncAction({
    action: logoutUser,
    errorMessage: "Error logging out",
  });

  const handleLogout = async () => {
    await logOut();
    router.replace("/login");
  };

  const router = useRouter();

  return (
    <>
      <Flex
        position="fixed"
        top="0"
        width="100%"
        zIndex="1000"
        py={1}
        bg="pictonBlue"
        color="white"
        px={[2, null, 8, null, 24]}
      >
        <VStack alignItems="flex-start">
          <Text fontSize={["xl", null, "2xl", "4xl"]} color="white">
            Scroll-a-dex!
          </Text>
        </VStack>
        <Spacer />
        <HStack display={{ base: "none", md: "flex" }}>
          <AddEmployeeModal
            isOpen={addEmployeeIsOpen}
            onClose={addEmployeeOnClose}
          />
          <ManageDepartmentsModal
            isOpen={manageDepartmentsIsOpen}
            onClose={manageDepartmentsOnClose}
          />
          <ModalIconButton
            icon={<FontAwesomeIcon icon={faUserPlus} />}
            tooltipLabel="Add Employee"
            onClick={addEmployeeOnOpen}
            hover={{ color: "emerald", backgroundColor: "white" }}
          />
          <ModalIconButton
            icon={<FontAwesomeIcon icon={faBuilding} />}
            tooltipLabel="Manage Departments"
            onClick={manageDepartmentsOnOpen}
            hover={{ color: "emerald", backgroundColor: "white" }}
          />
          <ModalIconButton
            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
            tooltipLabel="Logout"
            bg="bittersweet"
            hover={{ color: "bittersweet", backgroundColor: "white" }}
            onClick={handleLogout}
          />
        </HStack>
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
