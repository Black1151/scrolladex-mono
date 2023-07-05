import React, { useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import { VStack, Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { useAsyncAction } from "@/hooks/async";
import { fetchDepartmentDropdownList } from "@/store/departmentSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@chakra-ui/react";
import UpdateDepartmentModal from "./UpdateDepartmentModal";
import { useDisclosure } from "@chakra-ui/react";
import {
  deleteDepartment,
  fetchDepartmentWithEmployees,
  fetchDepartment,
} from "@/store/departmentSlice";
import ConfirmationModal from "./ConfirmationModal";
import { FaPlusCircle } from "react-icons/fa";
import AddDepartmentModal from "./AddDepartmentModal";
import { fetchEmployeeOverview } from "@/store/employeeSlice";
import DepartmentDetailsModal from "./DepartmentDetailsModal";
import useDepartmentColor from "@/hooks/useDepartmentColor";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ManageDepartmentsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const { getDepartmentColor } = useDepartmentColor();

  const selectedDepartment = useSelector(
    (state: RootState) => state.department.departmentDetail.data
  );

  const departments = useSelector(
    (state: RootState) => state.department.departmentDropdownList.data
  );

  const selectedDepartmentWithEmp = useSelector(
    (state: RootState) => state.department.departmentWithEmployees.data
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

  const {
    isOpen: viewDepartmentIsOpen,
    onOpen: viewDepartmentOnOpen,
    onClose: viewDepartmentOnClose,
  } = useDisclosure();

  const getDepartments = useAsyncAction({
    action: fetchDepartmentDropdownList,
    errorMessage: "Failed to fetch department list",
  });

  const getDepartmentDetails = useAsyncAction({
    action: fetchDepartment,
    errorMessage: "Failed to fetch department details",
  });

  const getDepartmentAndEmployees = useAsyncAction({
    action: fetchDepartmentWithEmployees,
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

  const handleViewDepartmentModalOpen = async (departmentId: number) => {
    await getDepartmentAndEmployees(departmentId);
    viewDepartmentOnOpen();
  };

  useEffect(() => {
    getDepartments();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const handleEditDepartmentModalOpen = async (departmentId: number) => {
    await getDepartmentDetails(departmentId);
    updateDepartmentOnOpen();
  };

  const handleDeleteConfirmationModalOpen = async (departmentId: number) => {
    await getDepartmentAndEmployees(departmentId);
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
      maxWidth={500}
      title="Manage Departments"
      isOpen={isOpen}
      onClose={onClose}
      bg={theme.colors.medPBlue}
      extraButtons={extraButtons}
    >
      <VStack>
        {departments !== null &&
          departments.map((department) => (
            <Box key={department.id}>
              <HStack
                bg="transparent"
                spacing={4}
                py={3}
                px={8}
                color="white"
                background="#3498db"
                zIndex={0}
              >
                <Box fontSize="xl" borderRadius={20} w={60}>
                  {department.departmentName}
                </Box>
                <IconButton
                  variant="green"
                  icon={<FontAwesomeIcon icon={faEye} />}
                  aria-label="View"
                  onClick={() => handleViewDepartmentModalOpen(department.id)}
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
                  onClick={() =>
                    handleDeleteConfirmationModalOpen(department.id)
                  }
                />
              </HStack>
              <Box
                top={0}
                height={1}
                background={getDepartmentColor(String(department.id))}
              />
            </Box>
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
        message={
          <>
            <Text>{`Are you sure you want to delete the ${selectedDepartment?.departmentName} department?`}</Text>
            <Text>{`This will also delete the ${selectedDepartmentWithEmp?.employees.length} employees working there and their user accounts.`}</Text>
            <Text
              fontWeight="bold"
              color="bittersweet"
              fontSize={"lg"}
            >{`This action cannot be undone.`}</Text>
          </>
        }
        onConfirm={() =>
          handleDeleteDepartment(selectedDepartment!.id as number)
        }
      />
      <AddDepartmentModal
        isOpen={addDepartmentIsOpen}
        onClose={addDepartmentOnClose}
      />
      <DepartmentDetailsModal
        isOpen={viewDepartmentIsOpen}
        onClose={viewDepartmentOnClose}
      />
    </ModalWrapper>
  );
};

export default ManageDepartmentsModal;
