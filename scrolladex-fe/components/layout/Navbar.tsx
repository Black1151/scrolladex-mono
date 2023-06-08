import React, { useState, useEffect } from "react";
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
  useToast,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import AddEmployeeModal from "../modals/AddEmployeeModal";
import AddDepartmentModal from "../modals/AddDepartmentModal";
import { getDepartmentsAPI } from "@/api/departmentAPI";
import { DepartmentListItem } from "@/types";
import { motion } from "framer-motion";
import ConfirmationModal from "../modals/ConfirmationModal";
import { logoutUserAPI } from "@/api/authAPI";
import { useRouter } from "next/router";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [departmentList, setDepartmentList] = useState<DepartmentListItem[]>(
    []
  );
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationStatus, setConfirmationStatus] = useState<
    "success" | "error"
  >("success");
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const { authenticated, setAuthenticated } = useAuth();

  const toast = useToast();

  const MotionBox = motion(Box);

  const router = useRouter();

  const createDepartmentDropdownList = async (): Promise<void> => {
    console.log("createDepartmentDropdownList started");
    try {
      const departments = await getDepartmentsAPI();
      if (departments != null) {
        const newDepartmentsArray = departments.map((department) => ({
          id: department.id as number,
          departmentName: department.departmentName,
        }));
        setDepartmentList(newDepartmentsArray);
      }
      console.log("createDepartmentDropdownList try finished");
    } catch (error: any) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const createOnSubmitHandler =
    (
      apiFunction: (values: any) => Promise<any>,
      successMessage: string,
      errorMessage: string
    ) =>
    async (values: any, actions: any) => {
      try {
        await apiFunction(values);
        createDepartmentDropdownList();
        showConfirmationModal("success", successMessage);
        actions.setSubmitting(false);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          showConfirmationModal(
            "error",
            error.message || "An unexpected error occurred."
          );
        } else {
          showConfirmationModal("error", errorMessage);
        }
      } finally {
        actions.setSubmitting(false);
      }
    };

  const showConfirmationModal = (
    status: "success" | "error",
    message: string
  ) => {
    console.log("showConfirmationModal");
    setConfirmationStatus(status);
    setConfirmationMessage(message);
    setConfirmationOpen(true);
  };

  useEffect(() => {
    createDepartmentDropdownList();
  }, []);

  return (
    <>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Flex
          as="nav"
          align="center"
          justify="space-between"
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
                departmentList={departmentList}
                createOnSubmitHandler={createOnSubmitHandler}
              />
              <AddDepartmentModal
                createOnSubmitHandler={createOnSubmitHandler}
              />
              <Button
                onClick={() => {
                  logoutUserAPI();
                  setAuthenticated(false);
                  router.replace("/login");
                }}
                variant="orange"
              >
                Logout
              </Button>
            </HStack>
          )}
          <Box display={{ base: "block", md: "none" }}>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
            <Drawer isOpen={isOpen} onClose={onClose} placement="right">
              <DrawerOverlay />
              <DrawerContent bg="blue">
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <AddEmployeeModal
                    departmentList={departmentList}
                    createOnSubmitHandler={createOnSubmitHandler}
                  />
                  <AddDepartmentModal
                    createOnSubmitHandler={createOnSubmitHandler}
                  />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Flex>
      </MotionBox>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        status={confirmationStatus}
        bodyText={confirmationMessage}
      />
    </>
  );
};

export default Navbar;
