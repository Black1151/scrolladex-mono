// External Dependencies
import React from "react";
import {
  Box,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  FaBriefcase,
  FaBuilding,
  FaEdit,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaTrash,
} from "react-icons/fa";

// Internal Dependencies
import { Employee } from "@/types";
import ConfirmationModal from "./ConfirmationModal";
import { deleteEmployee, fetchEmployeeOverview } from "@/store/employeeSlice";
import { useAsyncAction } from "@/hooks/async";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import ModalWrapper from "./ModalWrapper";
import useDepartmentColor from "@/hooks/useDepartmentColor";

interface Props {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
}

const EmployeeDetailsModal: React.FC<Props> = ({
  employee,
  isOpen,
  onClose,
}) => {
  const confirmationDisclosure = useDisclosure();
  const editEmployeeDisclosure = useDisclosure();

  const { getDepartmentColor } = useDepartmentColor();

  const { executeAction: fetchEmployees } = useAsyncAction({
    action: fetchEmployeeOverview,
    errorMessage: "Failed to fetch employees",
  });

  const { executeAction: executeDelete } = useAsyncAction({
    action: deleteEmployee,
    successMessage: `${employee.firstName} ${employee.lastName} has been deleted.`,
    errorMessage: "Failed to delete employee",
    showSuccess: true,
  });

  const handleDelete = async () => {
    const response = await executeDelete(employee.id);
    if (!response.error) {
      fetchEmployees();
      onClose();
    }
  };

  const employeeDetails = [
    { icon: <FaBriefcase />, key: "jobTitle" },
    { icon: <FaBuilding />, key: "departmentName" },
    { icon: <FaIdCard />, key: "empNo" },
    { icon: <FaPhone />, key: "telephone" },
    { icon: <FaEnvelope />, key: "email" },
  ].map(({ icon, key }) => (
    <Flex gap={2} alignItems="center" key={key}>
      <Box color="pictonBlue">{icon}</Box>
      <Text pl={6} fontSize={["md", "md", "xl"]} whiteSpace="nowrap">
        {employee?.[key as keyof Employee]}
      </Text>
    </Flex>
  ));

  const actionButtons = [
    {
      icon: <FaEdit size={25} />,
      tooltipLabel: "Edit Employee Details",
      onClick: () => {
        editEmployeeDisclosure.onOpen();
        onClose();
      },
    },
    {
      icon: <FaTrash size={20} />,
      tooltipLabel: "Delete Employee",
      onClick: confirmationDisclosure.onOpen,
    },
  ];

  return (
    <Box position="relative" zIndex={0}>
      <ModalWrapper
        title="Employee Details"
        isOpen={isOpen}
        onClose={onClose}
        extraButtons={actionButtons}
        maxWidth={[350, null, 700]}
        bg="transparent"
      >
        <SimpleGrid
          columns={[1, null, 2]}
          spacing={10}
          borderTopRadius="lg"
          mb={3}
        >
          <VStack fontSize="xl" align={["center", null, "start", "start"]}>
            <Box>
              <Box
                position="absolute"
                top={10}
                left={0}
                right={0}
                height={[160, null, 130]}
                background={`linear-gradient(to right, #3498db, white)`}
                zIndex={-1}
              />
              <Box
                position="absolute"
                top={[200, null, 170]}
                left={0}
                right={0}
                height={1}
                background={`linear-gradient(to right, ${getDepartmentColor(
                  employee.departmentId
                )}, white)`}
                zIndex={-1}
              />
            </Box>
            <Text whiteSpace="nowrap" fontSize={"4xl"} pb={10}>
              {employee?.firstName} {employee?.lastName}
            </Text>
            <Flex flexDirection="column" gap={4}>
              {employeeDetails}
            </Flex>
          </VStack>
          <Center background="transparent">
            <Box borderRadius="100%" borderColor="white" borderWidth="4px">
              <Image
                src={
                  process.env.NEXT_PUBLIC_SERVER_ADDRESS! +
                    "/public" +
                    employee?.profilePictureUrl || ""
                }
                alt={employee?.firstName + " " + employee?.lastName}
                borderRadius="100%"
                objectFit="cover"
                maxW={300}
                maxH={300}
              />
            </Box>
          </Center>
        </SimpleGrid>
      </ModalWrapper>

      <ConfirmationModal
        onConfirm={handleDelete}
        isOpen={confirmationDisclosure.isOpen}
        onClose={confirmationDisclosure.onClose}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employee.firstName} ${employee.lastName}? This action cannot be undone.`}
      />
      <UpdateEmployeeModal
        isOpen={editEmployeeDisclosure.isOpen}
        onOpen={editEmployeeDisclosure.onOpen}
        onClose={editEmployeeDisclosure.onClose}
      />
    </Box>
  );
};

export default EmployeeDetailsModal;
