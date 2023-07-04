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
  Slide,
  Grid,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
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
import { useTheme } from "@chakra-ui/react";
import AppFormInput from "../forms/AppFormInput";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Navbar: React.FC = () => {
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const toggleSearchPanel = () => setIsSearchPanelOpen(!isSearchPanelOpen);

  const theme = useTheme();

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

  const logOut = useAsyncAction({
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
            <option value="all">All departments</option>
            {departmentList !== null &&
              departmentList.map((department) => (
                <option value={department.id}>
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
      <Box
        position="fixed"
        right="0"
        zIndex="999"
        width={["100%", null, null, "50%"]}
      >
        <Slide
          direction="top"
          in={isSearchPanelOpen}
          style={{
            position: "relative",
            top: "60px",
          }}
        >
          <Box bg="lightPBlue" p={4} color="black" shadow="md">
            <Formik
              initialValues={{
                searchField: "",
                searchValue: "",
              }}
              onSubmit={(values) => {
                // Handle form submission
                console.log(values);
              }}
            >
              {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                  <Grid
                    templateColumns={{ base: "1fr", md: "1fr 2fr auto" }}
                    gap={4}
                    alignItems="center"
                  >
                    <AppFormInput
                      placeholder="Search field"
                      name="searchField"
                      type="select"
                      options={[
                        { label: "First name", value: "firstName" },
                        { label: "Last name", value: "lastName" },
                        { label: "Job title", value: "jobTitle" },
                      ]}
                    />
                    <AppFormInput
                      placeholder="Search..."
                      icon={<SearchIcon color="gray.500" />}
                      name="searchValue"
                      type="text"
                    />
                    <Button mt={2} type="submit" variant="green">
                      Search
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Slide>
      </Box>
    </>
  );
};

export default Navbar;
