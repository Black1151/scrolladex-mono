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

interface Props {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
  fetchEmployees: () => void;
}

const EmployeeDetailsModal: React.FC<Props> = ({
  employee,
  isOpen,
  onClose,
}) => {
  const confirmationDisclosure = useDisclosure();
  const editEmployeeDisclosure = useDisclosure();

  const fetchEmployees = useAsyncAction({
    action: fetchEmployeeOverview,
    errorMessage: "Failed to fetch employees",
  });

  const executeDelete = useAsyncAction({
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
      <Text fontSize={["md", "md", "xl"]} whiteSpace="nowrap">
        {employee?.[key as keyof Employee]}
      </Text>
    </Flex>
  ));

  const actionButtons = [
    {
      icon: <FaEdit size={25} />,
      tooltipLabel: "Edit Employee Details",
      ariaLabel: "Edit Employee Details",
      onClick: () => {
        editEmployeeDisclosure.onOpen();
        onClose();
      },
    },
    {
      icon: <FaTrash size={20} />,
      tooltipLabel: "Delete Employee",
      ariaLabel: "Delete Employee",
      onClick: confirmationDisclosure.onOpen,
    },
  ];

  return (
    <>
      <ModalWrapper
        title="Employee Details"
        isOpen={isOpen}
        onClose={onClose}
        extraButtons={actionButtons}
        maxWidth={[350, null, 700]}
      >
        <SimpleGrid columns={[1, null, 2]} spacing={10}>
          <VStack
            fontSize="xl"
            align={["center", null, "start", "start"]}
            spacing={6}
          >
            <Text whiteSpace="nowrap" fontSize={"4xl"}>
              {employee?.firstName} {employee?.lastName}
            </Text>
            <Flex flexDirection="column" gap={4}>
              {employeeDetails}
            </Flex>
          </VStack>
          <Center>
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
    </>
  );
};

export default EmployeeDetailsModal;
