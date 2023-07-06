import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import EmployeeDetailsModal from "@/components/modals/EmployeeDetailsModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchEmployeeOverview, fetchEmployee } from "@/store/employeeSlice";
import { useAsyncAction } from "@/hooks/async";
import { GetServerSidePropsContext } from "next";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { EmployeeOverview } from "@/types";
import OverviewCard from "@/components/other/OverviewCard";

const MotionBox = motion(Box);

const Index = () => {
  const [displayedCards, setDisplayedCards] = useState<
    EmployeeOverview[] | null
  >([]);

  const { data: employees, status: employeesLoading } = useSelector(
    (state: RootState) => state.employee.employeeEntities
  );

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
    if (employeesLoading === "succeeded") {
      setDisplayedCards(employees);
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
            <OverviewCard
              key={employee.id}
              employee={employee}
              handleCardClick={handleCardClick}
              employeesLoading={employeesLoading}
            />
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
