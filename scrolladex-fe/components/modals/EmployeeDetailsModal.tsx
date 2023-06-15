import React, { useRef } from "react";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
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
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import { Employee } from "@/types";
import ModalIconButton from "./ModalIconButton";
import ConfirmationModal from "./ConfirmationModal";
import { deleteEmployee, fetchEmployeeOverview } from "@/store/employeeSlice";
import { useAsyncAction } from "@/hooks/async";

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
  const closeButtonRef = useRef(null);
  const confirmationDisclosure = useDisclosure();

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
      onClick: () => console.log("edit employee"),
    },
    {
      icon: <FaTrash size={20} />,
      tooltipLabel: "Delete Employee",
      onClick: confirmationDisclosure.onOpen,
    },
  ].map((button, index) => (
    <ModalIconButton
      key={index}
      icon={button.icon}
      tooltipLabel={button.tooltipLabel}
      onClick={button.onClick}
    />
  ));

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={closeButtonRef}>
        <ModalOverlay />
        <ModalContent maxW={650} w="100%" borderTopRadius="lg">
          <Flex
            bg="emerald"
            borderTopRadius="md"
            justifyContent="space-between"
            alignItems="center"
            px={6}
            py={4}
          >
            <Text fontSize="3xl" color="white">
              Employee Details
            </Text>
            <Flex position="relative">
              {actionButtons}
              <IconButton
                aria-label="Close"
                onClick={onClose}
                ref={closeButtonRef}
                icon={<FaTimes size={30} />}
                bg="emerald"
                mx={2}
                border="none"
                color="white"
                _hover={{ bg: "emerald" }}
                _focus={{ outline: 0 }}
              />
            </Flex>
          </Flex>
          <ModalBody>
            <SimpleGrid columns={[1, 2]} spacing={10}>
              <VStack p={4} fontSize="xl" align="start" gap={6}>
                <Text whiteSpace="nowrap" fontSize={["2xl", "4xl"]}>
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
                />
              </Center>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ConfirmationModal
        onConfirm={handleDelete}
        isOpen={confirmationDisclosure.isOpen}
        onClose={confirmationDisclosure.onClose}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employee.firstName} ${employee.lastName}? This action cannot be undone.`}
      />
    </>
  );
};

export default EmployeeDetailsModal;
