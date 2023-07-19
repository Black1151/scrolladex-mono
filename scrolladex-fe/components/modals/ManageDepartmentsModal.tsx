import React, { useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import {
  VStack,
  Box,
  Flex,
  IconButton,
  Text,
  HStack,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useTheme,
} from "@chakra-ui/react";
import { useAsyncAction } from "@/hooks/async";
import { fetchDepartmentDropdownList } from "@/store/departmentSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
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
import DepartmentDetailsModal from "./DepartmentDetailsModal";
import useDepartmentColor from "@/hooks/useDepartmentColor";
import { GiHamburgerMenu } from "react-icons/gi";

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

  const { executeAction: getDepartments } = useAsyncAction({
    action: fetchDepartmentDropdownList,
    errorMessage: "Failed to fetch department list",
  });

  const { executeAction: getDepartmentDetails } = useAsyncAction({
    action: fetchDepartment,
    errorMessage: "Failed to fetch department details",
  });

  const { executeAction: getDepartmentAndEmployees } = useAsyncAction({
    action: fetchDepartmentWithEmployees,
    errorMessage: "Failed to fetch department details",
  });

  const { executeAction: removeDepartment } = useAsyncAction({
    action: deleteDepartment,
    errorMessage: "Failed to delete department",
    successMessage: `${
      selectedDepartment === null
        ? "Department"
        : `${selectedDepartment!.departmentName} department`
    } deleted successfully`,
    showSuccess: true,
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
    await getDepartmentDetails(departmentId);
    await getDepartmentAndEmployees(departmentId);
    deleteConfirmationOnOpen();
  };

  const handleDeleteDepartment = async (departmentId: number) => {
    const response = await removeDepartment(departmentId);
    if (!response.error) {
      deleteConfirmationOnClose();
    }
  };

  const iconSize = useBreakpointValue([20, 20, 30]);

  const extraButtons = [
    {
      icon: <FaPlusCircle size={iconSize} />,
      tooltipLabel: "Add department",
      onClick: () => {
        addDepartmentOnOpen();
      },
    },
  ];

  const ActionButtons = ({ departmentId }: { departmentId: number }) => {
    return (
      <>
        <Box display={["block", null, "none"]}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<GiHamburgerMenu />}
              bg="pictonBlue"
              border="none"
              _hover={{ bg: "pictonBlue" }}
              p={0}
            />
            <MenuList w={10}>
              <MenuItem
                onClick={() => handleViewDepartmentModalOpen(departmentId)}
                color="emerald"
              >
                <HStack>
                  <Box w={5}>
                    <FontAwesomeIcon icon={faEye} />
                  </Box>
                  <Text>View</Text>
                </HStack>
              </MenuItem>
              <MenuItem
                onClick={() => handleEditDepartmentModalOpen(departmentId)}
                color="xanthous"
              >
                <HStack>
                  <Box w={5}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Box>
                  <Text>Edit</Text>
                </HStack>
              </MenuItem>
              <MenuItem
                onClick={() => handleDeleteConfirmationModalOpen(departmentId)}
                color="bittersweet"
              >
                <HStack>
                  <Box w={5}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Box>
                  <Text>Delete</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <HStack display={["none", null, "block"]}>
          <IconButton
            variant="green"
            size={["xs", "sm"]}
            icon={<FontAwesomeIcon icon={faEye} />}
            aria-label="View"
            onClick={() => handleViewDepartmentModalOpen(departmentId)}
          />
          <IconButton
            variant="orange"
            size={["xs", "sm"]}
            icon={<FontAwesomeIcon icon={faEdit} />}
            aria-label="Edit"
            onClick={() => handleEditDepartmentModalOpen(departmentId)}
          />
          <IconButton
            variant="red"
            size={["xs", "sm"]}
            icon={<FontAwesomeIcon icon={faTrashAlt} />}
            aria-label="Delete"
            onClick={() => handleDeleteConfirmationModalOpen(departmentId)}
          />
        </HStack>
      </>
    );
  };

  return (
    <ModalWrapper
      maxWidth={500}
      title="Manage Departments"
      isOpen={isOpen}
      onClose={onClose}
      bg={theme.colors.medPBlue}
      extraButtons={extraButtons}
    >
      <VStack w="100%">
        {departments !== null &&
          departments.map((department) => (
            <Box key={department.id} w="100%">
              <Flex
                flexDirection={["row"]}
                justifyContent="space-between"
                alignItems="center"
                bg="transparent"
                py={[3, 3]}
                px={[2, 8]}
                color="white"
                background="#3498db"
                zIndex={0}
                flex={1}
                width="full"
              >
                <Box fontSize={["sm", "md", "xl"]} isTruncated>
                  {department.departmentName}
                </Box>
                <ActionButtons departmentId={department.id} />
              </Flex>
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
          handleDeleteDepartment(selectedDepartmentWithEmp!.id as number)
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
