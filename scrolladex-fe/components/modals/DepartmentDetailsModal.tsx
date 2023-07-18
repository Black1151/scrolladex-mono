import React from "react";
import ModalWrapper from "./ModalWrapper";
import { FormModalProps } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Box, Text, Grid, VStack } from "@chakra-ui/react";
import useDepartmentColor from "@/hooks/useDepartmentColor";

const DepartmentDetailsModal: React.FC<FormModalProps> = ({
  onClose,
  isOpen,
}) => {
  const selectedDepartment = useSelector(
    (state: RootState) => state.department.departmentWithEmployees.data
  );

  const { getDepartmentColor } = useDepartmentColor();

  return (
    <Box pos="relative" zIndex={0}>
      <ModalWrapper
        title="Department Details"
        onClose={onClose}
        isOpen={isOpen}
        bg="transparent"
        maxWidth={500}
      >
        <Box>
          <Text fontSize={["xl", "2xl", "3xl"]} mb={8} isTruncated>
            {selectedDepartment?.departmentName}
          </Text>
          <Box
            position="absolute"
            top="10px"
            left={0}
            right={0}
            height={["120px", null, "130px"]}
            background={`linear-gradient(to right, #3498db, white)`}
            zIndex={-1}
          />
          <Box
            position="absolute"
            top={["130px", null, "140px"]}
            left={0}
            right={0}
            height={1}
            background={`linear-gradient(to right, ${getDepartmentColor(
              String(selectedDepartment?.id)
            )}, white)`}
            zIndex={-1}
          />
        </Box>
        <Box />
        <Grid templateColumns={["1fr", null, "1fr 2fr"]} gap={4}>
          <Box color="pictonBlue">
            <Text>{selectedDepartment?.addressLineOne}</Text>
            <Text>{selectedDepartment?.addressLineTwo}</Text>
            <Text>{selectedDepartment?.town}</Text>
            <Text>{selectedDepartment?.county}</Text>
            <Text>{selectedDepartment?.postcode}</Text>
          </Box>
          <VStack gap={5} alignItems="start">
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
    </Box>
  );
};

export default DepartmentDetailsModal;
