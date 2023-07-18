import React from "react";
import ModalWrapper from "./ModalWrapper";
import { FormModalProps } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Box, Text, Grid, VStack } from "@chakra-ui/react";

const DepartmentDetailsModal: React.FC<FormModalProps> = ({
  onClose,
  isOpen,
}) => {
  const selectedDepartment = useSelector(
    (state: RootState) => state.department.departmentWithEmployees.data
  );

  return (
    <ModalWrapper title="Department Details" onClose={onClose} isOpen={isOpen}>
      <Box pb={5}>
        <Text fontSize={["2xl", "3xl"]}>
          {selectedDepartment?.departmentName}
        </Text>
      </Box>
      <Grid templateColumns={["1fr", "1fr 2fr"]} gap={4}>
        <Box>
          <Text>{selectedDepartment?.addressLineOne}</Text>
          <Text>{selectedDepartment?.addressLineTwo}</Text>
          <Text>{selectedDepartment?.town}</Text>
          <Text>{selectedDepartment?.county}</Text>
          <Text>{selectedDepartment?.postcode}</Text>
        </Box>
        <VStack gap={5} alignItems="start">
          <Box fontSize={["xl", "2xl"]}>Employees</Box>
          {selectedDepartment?.employees.map((employee, index) => (
            <Box key={index}>
              <Text fontSize={["md", "xl"]} isTruncated>
                {employee.title} {employee.firstName} {employee.lastName}
              </Text>
              <Text fontSize={["sm", "md"]} isTruncated>
                {employee.jobTitle}
              </Text>
            </Box>
          ))}
        </VStack>
      </Grid>
    </ModalWrapper>
  );
};

export default DepartmentDetailsModal;
