import React, { useState } from "react";
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
  Select,
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
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import ModalIconButton from "../modals/ModalIconButton";
import { useAsyncAction } from "@/hooks/async";
import { logoutUser } from "@/store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SearchPanel from "../other/SearchPanel";

const Navbar: React.FC = () => {
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);

  const onClose = () => {
    setIsSearchPanelOpen(false);
  };

  const toggleSearchPanel = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event && event.preventDefault();
    setIsSearchPanelOpen(!isSearchPanelOpen);
  };

  const router = useRouter();

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

  const { executeAction: logOut } = useAsyncAction({
    action: logoutUser,
    errorMessage: "Error logging out",
  });

  const handleLogout = async () => {
    await logOut();
    router.replace("/login");
  };

  const departmentList = useSelector(
    (state: RootState) => state.department.departmentDropdownList.data
  );

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
          <Select
            placeholder="Select department"
            width="200px"
            bg="white"
            color="black"
          >
            <option value="">All departments</option>
            {departmentList !== null &&
              departmentList.map((department) => (
                <option key={department.departmentName} value={department.id}>
                  {department.departmentName}
                </option>
              ))}
          </Select>
          <AddEmployeeModal
            isOpen={addEmployeeIsOpen}
            onClose={addEmployeeOnClose}
          />
          <ManageDepartmentsModal
            isOpen={manageDepartmentsIsOpen}
            onClose={manageDepartmentsOnClose}
          />
          <ModalIconButton
            icon={<FontAwesomeIcon icon={faSearch} />}
            tooltipLabel="Search"
            onClick={toggleSearchPanel}
            hover={{ color: "emerald", backgroundColor: "white" }}
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
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
      <SearchPanel isOpen={isSearchPanelOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;
