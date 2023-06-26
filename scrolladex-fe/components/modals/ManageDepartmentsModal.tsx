import React, { useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import { VStack, Box, HStack, IconButton } from "@chakra-ui/react";
import { useAsyncAction } from "@/hooks/async";
import {
  fetchDepartment,
  fetchDepartmentDropdownList,
} from "@/store/departmentSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@chakra-ui/react";
import UpdateDepartmentModal from "./UpdateDepartmentModal";
import { useDisclosure } from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ManageDepartmentsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    isOpen: updateDepartmentIsOpen,
    onOpen: updateDepartmentOnOpen,
    onClose: updateDepartmentOnClose,
  } = useDisclosure();

  const getDepartments = useAsyncAction({
    action: fetchDepartmentDropdownList,
    errorMessage: "Failed to fetch department list",
  });

  const getDepartmentDetails = useAsyncAction({
    action: fetchDepartment,
    errorMessage: "Failed to fetch department details",
  });

  // const getDepartmentDetails = async (departmentId: number) => {
  //   await fetchDepartmentDetails(departmentId);
  // };

  // const handleViewDepartment = async (departmentId: number) => {
  //   await getDepartmentDetails(departmentId);
  //   /// logic to open add department modal
  // };

  const selectedDepartment = useSelector(
    (state: RootState) => state.department.departmentDetail.data
  );

  const departments = useSelector(
    (state: RootState) => state.department.departmentDropdownList.data
  );

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      updateDepartmentOnOpen();
    }
  }, [selectedDepartment]);

  const handleEditDepartmentModalOpen = async (departmentId: number) => {
    await getDepartmentDetails(departmentId);
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
                onClick={() => handleEditDepartmentModalOpen(department.id)}
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
      {selectedDepartment && (
        <UpdateDepartmentModal
          isOpen={updateDepartmentIsOpen}
          onClose={updateDepartmentOnClose}
        />
      )}
    </ModalWrapper>
  );
};

export default ManageDepartmentsModal;
