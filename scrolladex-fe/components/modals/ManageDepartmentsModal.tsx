import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { VStack, Box, HStack, IconButton } from "@chakra-ui/react";
import { useAsyncAction } from "@/hooks/async";
import { fetchDepartmentDropdownList } from "@/store/departmentSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ManageDepartmentsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const fetchDeparments = useAsyncAction({
    action: fetchDepartmentDropdownList,
    errorMessage: "Failed to fetch department list",
  });

  const departments = useSelector(
    (state: RootState) => state.department.departmentDropdownList.data
  );

  useEffect(() => {
    fetchDeparments();
  }, []);

  const handleEdit = (departmentId: number) => {
    // Handle the edit action here
    console.log("Edit:", departmentId);
  };

  const handleDelete = (departmentId: number) => {
    // Handle the delete action here
    console.log("Delete:", departmentId);
  };

  const handleView = (departmentId: number) => {
    // Handle the delete action here
    console.log("Delete:", departmentId);
  };

  const theme = useTheme();

  return (
    <ModalWrapper
      fitContent={true}
      title="Manage Departments"
      isOpen={isOpen}
      onClose={onClose}
      bg={theme.colors.medPBlue}
    >
      <VStack>
        {departments !== null &&
          departments.map((department) => (
            <HStack
              borderRadius={10}
              bg={"pictonBlue"}
              key={department.id}
              spacing={4}
              p={4}
              color="white"
              mx={4}
            >
              <Box fontSize="xl" borderRadius={20} bg={"pictonBlue"} w={60}>
                {department.departmentName}
              </Box>
              <IconButton
                variant="green"
                icon={<FontAwesomeIcon icon={faEye} />}
                aria-label="View"
                onClick={() => handleView(department.id)}
              />
              <IconButton
                variant="orange"
                icon={<FontAwesomeIcon icon={faEdit} />}
                aria-label="Edit"
                onClick={() => handleEdit(department.id)}
              />
              <IconButton
                variant="red"
                icon={<FontAwesomeIcon icon={faTrashAlt} />}
                aria-label="Delete"
                onClick={() => handleDelete(department.id)}
              />
            </HStack>
          ))}
      </VStack>
    </ModalWrapper>
  );
};

export default ManageDepartmentsModal;
