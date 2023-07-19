import React from "react";
import { FormikHelpers } from "formik";
import { useSubmitHandler } from "@/hooks/submitHandler";

import { updateDepartment } from "@/store/departmentSlice";
import { Department, FormModalProps } from "@/types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

import DepartmentForm from "../forms/DepartmentForm";
import ModalWrapper from "./ModalWrapper";
import { useUpdateChanges } from "@/hooks/useUpdateChanges";
import { fetchDepartmentDropdownList } from "@/store/departmentSlice";
import { useAsyncAction } from "@/hooks/async";

const UpdateDepartmentModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const selectedDepartment = useSelector(
    (state: RootState) => state.department.departmentDetail.data
  );

  const submitForm = useSubmitHandler({
    apiFunction: updateDepartment,
    successMessage: `${
      selectedDepartment!.departmentName
    } department was updated successfully`,
    errorMessage: "An error occurred while updating the department.",
    showSuccess: true,
    resetForm: true,
    onClose: onClose,
  });

  const getChanges = useUpdateChanges(
    (state: RootState) => state.department.departmentDetail.data
  );
  const { executeAction: getDepartments } = useAsyncAction({
    action: fetchDepartmentDropdownList,
    errorMessage: "Failed to fetch department list",
  });

  const handleFormSubmit = async (
    values: Department,
    actions: FormikHelpers<Department>
  ) => {
    const changes = getChanges(values);

    const changesWithId = {
      ...changes,
      id: selectedDepartment!.id,
    };

    const result = await submitForm(changesWithId, actions);

    if (result) {
      getDepartments();
    }
  };

  return (
    <ModalWrapper title="Update Department" isOpen={isOpen} onClose={onClose}>
      <DepartmentForm
        initialValues={{
          departmentName: selectedDepartment!.departmentName,
          addressLineOne: selectedDepartment!.addressLineOne,
          addressLineTwo: selectedDepartment!.addressLineTwo,
          town: selectedDepartment!.town,
          county: selectedDepartment!.county,
          postcode: selectedDepartment!.postcode,
        }}
        onSubmit={handleFormSubmit}
        onClose={onClose}
      />
    </ModalWrapper>
  );
};

export default UpdateDepartmentModal;
