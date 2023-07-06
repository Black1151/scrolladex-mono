import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Flex,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import EmployeeDetailsModal from "@/components/modals/EmployeeDetailsModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchEmployeeOverview, fetchEmployee } from "@/store/employeeSlice";
import { useAsyncAction } from "@/hooks/async";
import useDepartmentColor from "@/hooks/useDepartmentColor";
import { GetServerSidePropsContext } from "next";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { EmployeeOverview } from "@/types";

const MotionBox = motion(Box);

const Index = () => {
  const [displayedCards, setDisplayedCards] = useState<
    EmployeeOverview[] | null
  >([]);

  const { data: employees, status: employeesLoading } = useSelector(
    (state: RootState) => state.employee.employeeEntities
  );
  const { getDepartmentColor } = useDepartmentColor();
  const [animationState, setAnimationState] = useState("");
  const maxTransitionDuration = 1500;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { executeAction: fetchEmployees } = useAsyncAction({
    action: fetchEmployeeOverview,
    successMessage: "Employees fetched successfully",
    errorMessage: "Failed to fetch employees",
  });

  const { executeAction: fetchEmployeeDetails } = useAsyncAction({
    action: fetchEmployee,
    successMessage: "Employee details fetched successfully",
    errorMessage: "Failed to fetch employee details",
  });

  const employee = useSelector(
    (state: RootState) => state.employee.employeeDetail.data
  );

  useEffect(() => {
    fetchEmployees();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (employeesLoading === "loading") {
      setAnimationState("fadeOut");
    } else if (employeesLoading === "succeeded") {
      const fadeInTimeout = setTimeout(() => {
        setDisplayedCards(employees);
        setAnimationState("fadeIn");
      }, maxTransitionDuration);
      return () => clearTimeout(fadeInTimeout);
    }
  }, [employeesLoading]);

  const handleCardClick = (id: number) => {
    fetchEmployeeDetails(id).then(() => {
      onOpen();
    });
  };

  const columnWidth = 350;

  return (
    <MotionBox
      p={5}
      bg="medPBlue"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      pt={78}
      height="100%"
      minHeight="100vh"
    >
      <SimpleGrid
        gridTemplateColumns={[
          `repeat(1, ${columnWidth}px)`,
          null,
          `repeat(2, ${columnWidth}px)`,
          null,
          `repeat(4, ${columnWidth}px)`,
          `repeat(5, ${columnWidth}px)`,
        ]}
        spacing={5}
        position="relative"
        justifyContent="center"
      >
        {displayedCards &&
          displayedCards.map((employee, index) => (
            <MotionBox
              key={employee.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: animationState === "fadeIn" ? 1 : 0,
              }}
              transition={{
                duration: (Math.random() * maxTransitionDuration) / 1000,
              }}
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
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height={16}
                    background={`linear-gradient(to right, #3498db, white)`}
                    zIndex={-1}
                  />
                  <Box
                    position="absolute"
                    top={16}
                    left={0}
                    right={0}
                    height={1}
                    background={`linear-gradient(to right, ${getDepartmentColor(
                      employee.departmentId
                    )}, white)`}
                    zIndex={-1}
                  />
                  <Box whiteSpace="nowrap" zIndex={1}>
                    <Box width="100%">
                      <Heading fontSize="xl" pb={6}>
                        {employee.firstName} {employee.lastName}
                      </Heading>
                    </Box>
                    <Text mt={2} fontWeight="bold" fontSize="md">
                      {employee.jobTitle}
                    </Text>
                    <Text mt={2} fontSize="sm">
                      {employee.departmentName}
                    </Text>
                  </Box>
                  <Box
                    mr={4}
                    zIndex={1}
                    borderColor="white"
                    borderWidth="2px"
                    borderRadius="full"
                  >
                    <Image
                      borderRadius="full"
                      boxSize="100px"
                      src={`${process.env.NEXT_PUBLIC_SERVER_ADDRESS!}/public${
                        employee.profilePictureUrl || "/placeholder.png"
                      }`}
                      alt={employee.firstName + " " + employee.lastName}
                      fallbackSrc="/placeholder.png"
                    />
                  </Box>
                </Flex>
              </Box>
            </MotionBox>
          ))}
      </SimpleGrid>
      {employee && (
        <EmployeeDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          employee={employee}
        />
      )}
    </MotionBox>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return checkUserAuthentication(context);
}

export default Index;
