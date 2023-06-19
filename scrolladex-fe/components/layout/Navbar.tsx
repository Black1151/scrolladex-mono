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
import OutcomeModal from "../modals/OutcomeModal";
import { logoutUserAPI } from "@/api/authAPI";
import { useRouter } from "next/router";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
  const {
    onOpen: addEmployeeOnOpen,
    isOpen: addEmployeeIsOpen,
    onClose: addEmployeeOnClose,
  } = useDisclosure();
  const {
    onOpen: addDepartmentOnOpen,
    isOpen: addDepartmentIsOpen,
    onClose: addDepartmentOnClose,
  } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [departmentList, setDepartmentList] = useState<DepartmentListItem[]>(
    []
  );
  const [outcomeMessage, setOutcomeMessage] = useState("");
  const [outcomeStatus, setOutcomeStatus] = useState<"success" | "error">(
    "success"
  );
  const [isOutcomeOpen, setOutcomeOpen] = useState(false);
  const { authenticated, setAuthenticated } = useAuth();
  const toast = useToast();
  const MotionBox = motion(Box);
  const router = useRouter();

  const createDepartmentDropdownList = async (): Promise<void> => {
    try {
      const departments = await getDepartmentsAPI();
      if (departments != null) {
        const newDepartmentsArray = departments.map((department) => ({
          id: department.id as number,
          departmentName: department.departmentName,
        }));
        setDepartmentList(newDepartmentsArray);
      }
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
        showOutcomeModal("success", successMessage);
        actions.setSubmitting(false);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          showOutcomeModal(
            "error",
            error.message || "An unexpected error occurred."
          );
        } else {
          showOutcomeModal("error", errorMessage);
        }
      } finally {
        actions.setSubmitting(false);
      }
    };

  const showOutcomeModal = (status: "success" | "error", message: string) => {
    setOutcomeStatus(status);
    setOutcomeMessage(message);
    setOutcomeOpen(true);
  };

  useEffect(() => {
    createDepartmentDropdownList();
  }, []);

  return (
    <>
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
              isOpen={addEmployeeIsOpen}
              onClose={addEmployeeOnClose}
            />
            <Button variant="green" onClick={addEmployeeOnOpen}>
              Add Employee
            </Button>
            <AddDepartmentModal createOnSubmitHandler={createOnSubmitHandler} />
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
                <AddDepartmentModal
                  createOnSubmitHandler={createOnSubmitHandler}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
      <OutcomeModal
        isOpen={isOutcomeOpen}
        onClose={() => setOutcomeOpen(false)}
        status={outcomeStatus}
        bodyText={outcomeMessage}
      />
    </>
  );
};

export default Navbar;
