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
import { deleteDepartment } from "@/store/departmentSlice";
import ConfirmationModal from "./ConfirmationModal";
import { FaPlusCircle } from "react-icons/fa";
import AddDepartmentModal from "./AddDepartmentModal";
import { fetchEmployeeOverview } from "@/store/employeeSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ManageDepartmentsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const selectedDepartment = useSelector(
    (state: RootState) => state.department.departmentDetail.data
  );

  const departments = useSelector(
    (state: RootState) => state.department.departmentDropdownList.data
  );

  const {
    isOpen: updateDepartmentIsOpen,
    onOpen: updateDepartmentOnOpen,
    onClose: updateDepartmentOnClose,
  } = useDisclosure();

  const {
    isOpen: deleteConfirmationIsOpen,
    onOpen: deleteConfirmationOnOpen,
    onClose: deleteConfirmationOnClose,
  } = useDisclosure();

  const {
    isOpen: addDepartmentIsOpen,
    onOpen: addDepartmentOnOpen,
    onClose: addDepartmentOnClose,
  } = useDisclosure();

  const getDepartments = useAsyncAction({
    action: fetchDepartmentDropdownList,
    errorMessage: "Failed to fetch department list",
  });

  const getDepartmentDetails = useAsyncAction({
    action: fetchDepartment,
    errorMessage: "Failed to fetch department details",
  });

  const removeDepartment = useAsyncAction({
    action: deleteDepartment,
    errorMessage: "Failed to delete department",
    successMessage: `${
      selectedDepartment === null
        ? "Department"
        : `${selectedDepartment!.departmentName} department`
    } deleted successfully`,
    showSuccess: true,
  });

  const getEmployees = useAsyncAction({
    action: fetchEmployeeOverview,
    errorMessage: "Error fetching employee overview",
  });

  // const getDepartmentDetails = async (departmentId: number) => {
  //   await fetchDepartmentDetails(departmentId);
  // };

  // const handleViewDepartment = async (departmentId: number) => {
  //   await getDepartmentDetails(departmentId);
  //   /// logic to open add department modal
  // };

  useEffect(() => {
    getDepartments();
  }, []);

  const handleEditDepartmentModalOpen = async (departmentId: number) => {
    await getDepartmentDetails(departmentId);
    updateDepartmentOnOpen();
  };

  const handleDeleteConfirmationModalOpen = async (departmentId: number) => {
    await getDepartmentDetails(departmentId);
    deleteConfirmationOnOpen();
  };

  const handleDeleteDepartment = async (departmentId: number) => {
    const response = await removeDepartment(departmentId);
    if (!response.error) {
      getDepartments();
      getEmployees();
      deleteConfirmationOnClose();
    }
  };

  const handleView = (departmentId: number) => {
    console.log("View:", departmentId);
  };

  const theme = useTheme();

  const extraButtons = [
    {
      icon: <FaPlusCircle size={25} />,
      tooltipLabel: "Add department",
      onClick: () => {
        addDepartmentOnOpen();
      },
    },
  ];

  return (
    <ModalWrapper
      fitContent={true}
      title="Manage Departments"
      isOpen={isOpen}
      onClose={onClose}
      bg={theme.colors.medPBlue}
      extraButtons={extraButtons}
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
                onClick={() => handleDeleteConfirmationModalOpen(department.id)}
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

      <ConfirmationModal
        isOpen={deleteConfirmationIsOpen}
        onClose={deleteConfirmationOnClose}
        title="Delete Department"
        message={`Are you sure you want to delete the ${selectedDepartment?.departmentName} department? This action cannot be undone.`}
        onConfirm={() =>
          handleDeleteDepartment(selectedDepartment!.id as number)
        }
      />
      <AddDepartmentModal
        isOpen={addDepartmentIsOpen}
        onClose={addDepartmentOnClose}
      />
    </ModalWrapper>
  );
};

export default ManageDepartmentsModal;
