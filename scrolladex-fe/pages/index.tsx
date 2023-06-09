import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Flex,
  Image,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import EmployeeDetailsModal from "@/components/modals/EmployeeDetailsModal";
import { Employee } from "../types";
import { getEmployeeAPI } from "../api/employeeApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchEmployeeOverview } from "@/store/employeeSlice";

const MotionBox = motion(Box);

const Index = () => {
  const dispatch: AppDispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.entities);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchEmployeeOverview());
  }, [dispatch]);

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handleCardClick = async (id: number) => {
    try {
      const employeeData = await getEmployeeAPI(id);
      setEmployee(employeeData);
      onOpen();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: `Failed to fetch employee details: ${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        throw error;
      }
    }
  };

  return (
    <MotionBox
      p={5}
      bg="medPBlue"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        spacing={5}
        position="relative"
      >
        {employees.map((employee, index) => (
          <>
            {console.log(employee.profilePictureUrl)}
            <MotionBox
              key={employee.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded[index] ? 1 : 0 }}
              transition={{ duration: Math.random() * 1 }}
              onClick={() => handleCardClick(employee.id)}
              cursor="pointer"
            >
              <Box
                bg="white"
                p={5}
                shadow="md"
                borderWidth="1px"
                transition="all 0.25s"
                transform="scale(1)"
                zIndex={0}
                position="relative"
                _hover={{
                  transform: "scale(1.025)",
                  shadow: "xl",
                  zIndex: 10,
                }}
              >
                <Flex justifyContent="space-between">
                  <Box whiteSpace="nowrap">
                    <Heading fontSize="xl">
                      {employee.firstName} {employee.lastName}
                    </Heading>
                    <Text mt={2} fontSize="sm">
                      {employee.jobTitle}
                    </Text>
                    <Text mt={2} fontSize="sm">
                      {employee.departmentName}
                    </Text>
                  </Box>
                  <Box mr={4}>
                    <Image
                      borderRadius="full"
                      boxSize="100px"
                      src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS!}/public${
                        employee.profilePictureUrl || "/placeholder.png"
                      }`}
                      alt={employee.firstName + " " + employee.lastName}
                      fallbackSrc="/placeholder.png"
                      onLoad={() => handleImageLoad(index)}
                    />
                  </Box>
                </Flex>
              </Box>
            </MotionBox>
          </>
        ))}
      </SimpleGrid>
      {employee && (
        <EmployeeDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          employee={employee}
          fetchEmployees={fetchEmployeeOverview}
        />
      )}
    </MotionBox>
  );
};

export default Index;
