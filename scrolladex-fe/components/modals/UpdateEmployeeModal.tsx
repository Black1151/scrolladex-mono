// External dependencies
import React from "react";
import { FormikHelpers } from "formik";
import { useSelector } from "react-redux";

// Internal dependencies
import ModalWrapper from "./ModalWrapper";
import { useSubmitHandler } from "@/hooks/submitHandler";
import { useAsyncAction } from "@/hooks/async";
import {
  fetchEmployeeOverview,
  updateEmployee,
} from "../../store/employeeSlice";
import { RootState } from "@/store/store";
import { EmployeeCreateUpdate } from "@/types";
import EmployeeForm from "../forms/EmployeeForm";
import { useUpdateChanges } from "@/hooks/useUpdateChanges";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const UpdateEmployeeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const selectedEmployee = useSelector(
    (state: RootState) => state.employee.employeeDetail.data
  );

  const updateEmployeeOverview = useAsyncAction({
    action: fetchEmployeeOverview,
    errorMessage: "Error fetching employee overview",
  });

  const getChanges = useUpdateChanges(
    (state: RootState) => state.employee.employeeDetail.data
  );

  const submitForm = useSubmitHandler({
    apiFunction: updateEmployee,
    successMessage: "Employee was updated successfully",
    errorMessage: "An error occurred while updating the employee.",
    showSuccess: true,
    resetForm: true,
    onClose: () => onClose(),
  });

  const handleFormSubmit = async (
    values: EmployeeCreateUpdate,
    actions: FormikHelpers<EmployeeCreateUpdate>
  ) => {
    let changes = getChanges(values);

    if (values.profilePicture !== null) {
      changes = {
        ...changes,
        profilePictureUrl: selectedEmployee!.profilePictureUrl,
      };
    }
    const changesWithId = {
      ...changes,
      id: selectedEmployee!.id,
    };

    const result = await submitForm(changesWithId, actions);
    if (result) {
      updateEmployeeOverview();
    }
  };

  const mapSelectedEmployeeToFormValues = {
    title: selectedEmployee!.title,
    firstName: selectedEmployee!.firstName,
    lastName: selectedEmployee!.lastName,
    empNo: selectedEmployee!.empNo,
    jobTitle: selectedEmployee!.jobTitle,
    departmentId: selectedEmployee!.departmentId,
    telephone: selectedEmployee!.telephone,
    email: selectedEmployee!.email,
    profilePicture: null,
  };

  return (
    <ModalWrapper title="Edit Employee" isOpen={isOpen} onClose={onClose}>
      <EmployeeForm
        initialValues={mapSelectedEmployeeToFormValues}
        onSubmit={handleFormSubmit}
        onClose={onClose}
        selectedEmployeeImageUrl={selectedEmployee!.profilePictureUrl}
      />
    </ModalWrapper>
  );
};

export default UpdateEmployeeModal;
