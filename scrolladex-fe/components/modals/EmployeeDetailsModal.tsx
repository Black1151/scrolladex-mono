import React, { useEffect, useState } from "react";
import {
  Button,
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
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { getEmployeeAPI } from "@/api/employeeApi";
import { Employee } from "@/types";
import {
  FaBriefcase,
  FaBuilding,
  FaIdCard,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

interface Props {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const EmployeeDetailsModal: React.FC<Props> = ({ id, isOpen, onClose }) => {
  const [employee, setEmployee] = useState<Employee | null>(null);

  const fetchEmployee = async (id: number) => {
    const employeeData = await getEmployeeAPI(id);
    setEmployee(employeeData);
  };

  useEffect(() => {
    if (isOpen) {
      fetchEmployee(id);
    }
  }, [isOpen, id]);

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

  const generateEmployeeDetails = (employee: Employee | null) =>
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
      <Modal isOpen={isOpen} onClose={onClose}>
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
            <Button
              bg="emerald"
              border="none"
              color="white"
              size="xl"
              _hover={{ bg: "emerald" }}
              onClick={onClose}
            >
              <FaTimes size={30} />
            </Button>
          </Flex>
          <ModalBody>
            <SimpleGrid columns={[1, 2]} spacing={10}>
              <VStack p={4} fontSize="xl" align="start" gap={6}>
                <Text whiteSpace="nowrap" fontSize={["2xl", "4xl"]}>
                  {employee?.firstName} {employee?.lastName}
                </Text>
                <Flex flexDirection="column" gap={4}>
                  {generateEmployeeDetails(employee)}
                </Flex>
              </VStack>
              <Center>
                <Image
                  src={
                    process.env.NEXT_PUBLIC_SERVER_ADDRESS! +
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
