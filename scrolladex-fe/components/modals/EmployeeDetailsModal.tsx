import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Flex,
  VStack,
  Box,
  Image,
  SimpleGrid,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { Employee } from "@/types";
import {
  FaBriefcase,
  FaBuilding,
  FaIdCard,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalIconButton from "./ModalIconButton";

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
  const closeButtonRef = useRef(null);

  const employeeDetails: { icon: JSX.Element; key: keyof Employee }[] = [
    {
      icon: <FaBriefcase />,
      key: "jobTitle",
    },
    {
      icon: <FaBuilding />,
      key: "departmentName",
    },
    {
      icon: <FaIdCard />,
      key: "empNo",
    },
    {
      icon: <FaPhone />,
      key: "telephone",
    },
    {
      icon: <FaEnvelope />,
      key: "email",
    },
  ];

  const buttons = [
    {
      icon: <FaEdit size={25} />,
      tooltipLabel: "Edit Employee Details",
      onClick: () => console.log("edit employee"),
    },
    {
      icon: <FaTrash size={20} />,
      tooltipLabel: "Delete Employee",
      onClick: () => console.log("delete employee"),
    },
  ];

  const generateEmployeeDetails = () =>
    employeeDetails.map(({ icon, key }) => (
      <Flex gap={2} alignItems="center" key={key}>
        <Box color="pictonBlue">{icon}</Box>
        <Text fontSize={["md", "md", "xl"]} whiteSpace="nowrap">
          {employee?.[key]}
        </Text>
      </Flex>
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
              {buttons.map((button, index) => (
                <ModalIconButton
                  key={index}
                  icon={button.icon}
                  tooltipLabel={button.tooltipLabel}
                  onClick={button.onClick}
                />
              ))}
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
                  {generateEmployeeDetails()}
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
    </>
  );
};

export default EmployeeDetailsModal;
