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
import { getEmployeesOverviewAPI } from "../api/employeeApi";
import { EmployeeOverview } from "../types";
import EmployeeDetailsModal from "@/components/modals/EmployeeDetailsModal";

const MotionBox = motion(Box);

const Index = () => {
  const [employees, setEmployees] = useState<EmployeeOverview[]>([]);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployeesOverviewAPI();
        if (data) {
          setEmployees(data);
          setLoaded(new Array(data.length).fill(false));
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Failed to call API: ${error.message}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        throw error;
      }
    };

    fetchEmployees();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const handleCardClick = (id: number) => {
    setSelectedEmployeeId(id);
    onOpen();
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
        ))}
      </SimpleGrid>

      {selectedEmployeeId && (
        <EmployeeDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          id={selectedEmployeeId}
        />
      )}
    </MotionBox>
  );
};

export default Index;
