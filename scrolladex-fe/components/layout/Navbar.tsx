// Libraries
import React, { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faBuilding,
  faSignOutAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

// Chakra UI components
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Select,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

// Local components
import AddEmployeeModal from "../modals/AddEmployeeModal";
import ManageDepartmentsModal from "../modals/ManageDepartmentsModal";
import ModalIconButton from "../modals/ModalIconButton";
import SearchPanel from "../other/SearchPanel";

// Store and hooks
import { useAsyncAction } from "@/hooks/async";
import { fetchEmployeeOverview } from "@/store/employeeSlice";
import { logoutUser } from "@/store/authSlice";
import { RootState } from "@/store/store";

const Navbar: React.FC = () => {
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const onClose = () => {
    setIsSearchPanelOpen(false);
    setSelectedDepartment("");
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

  const { executeAction: getEmployees } = useAsyncAction({
    action: fetchEmployeeOverview,
    errorMessage: "Error fetching employees",
  });

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
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              getEmployees({
                searchField: "department_id",
                searchValue: e.target.value,
              });
            }}
            defaultValue=""
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
