import React from "react";
import { Box, Heading, Text, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import useDepartmentColor from "@/hooks/useDepartmentColor";
import { EmployeeOverview } from "@/types";

const MotionBox = motion(Box);

interface Props {
  employee: EmployeeOverview;
  handleCardClick: (id: number) => void;
  employeesLoading: string;
  showCard: boolean;
}

const OverviewCard: React.FC<Props> = ({
  employee,
  handleCardClick,
  showCard,
}) => {
  const { getDepartmentColor } = useDepartmentColor();

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{
        opacity: showCard ? 1 : 0,
      }}
      transition={{
        duration: Math.random() * 1,
      }}
      onClick={() => handleCardClick(employee.id)}
      cursor="pointer"
    >
      <Box
        bg="white"
        p={[2, 5]}
        shadow="md"
        borderWidth="1px"
        transition="all 0.25s"
        transform="translateZ(0)"
        zIndex={0}
        position="relative"
        _hover={{
          transform: "scale(1.02) translateZ(0)",
          shadow: "xl",
          zIndex: 10,
        }}
        willChange="transform"
      >
        <Flex justifyContent="space-between">
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            height={[12, 16, 12, 16, 12, 16]}
            background={`linear-gradient(to right, #3498db, white)`}
            zIndex={-1}
          />
          <Box
            position="absolute"
            top={[12, 16, 12, 16, 12, 16]}
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
              <Heading
                fontSize={["sm", "xl", "sm", "xl", "sm", "xl"]}
                pb={[3, 6, null, 6, 6, 6]}
                pt={[3, 0, null, 0, 0, 0]}
              >
                {employee.firstName} {employee.lastName}
              </Heading>
            </Box>
            <Text
              mt={2}
              fontWeight="bold"
              fontSize={["xs", "md", "xs", "md", "xs", "md"]}
            >
              {employee.jobTitle}
            </Text>
            <Text mt={2} fontSize={["xs", "md", "xs", "md", "xs", "md"]}>
              {employee.departmentName}
            </Text>
          </Box>
          <Box
            zIndex={1}
            borderColor="white"
            borderWidth="2px"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_SERVER_ADDRESS! +
                  "/public" +
                  employee?.profilePictureUrl || ""
              }
              alt={employee.firstName + " " + employee.lastName}
              width={[92, 110, 92, 110, 92, 110]}
              height={[92, 110, 92, 110, 92, 110]}
            />
          </Box>
        </Flex>
      </Box>
    </MotionBox>
  );
};

export default OverviewCard;
