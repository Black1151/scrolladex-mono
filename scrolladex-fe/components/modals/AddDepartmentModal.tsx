import React from "react";
import { FormikHelpers } from "formik";

import { useSubmitHandler } from "@/hooks/submitHandler";
import { useAsyncAction } from "@/hooks/async";
import { fetchEmployeeOverview } from "@/store/employeeSlice";
import { createDepartment } from "@/store/departmentSlice";
import { Department, FormModalProps } from "@/types";

import DepartmentForm from "../forms/DepartmentForm";
import ModalWrapper from "./ModalWrapper";

const AddDepartmentModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const submitForm = useSubmitHandler({
    apiFunction: createDepartment,
    successMessage: "Department was added successfully",
    errorMessage: "An error occurred while adding the department.",
    showSuccess: true,
    resetForm: true,
    onClose: onClose,
  });

  const updateEmployeeOverview = useAsyncAction({
    action: fetchEmployeeOverview,
    errorMessage: "Error fetching department overview",
  });

  const handleFormSubmit = async (
    values: Department,
    actions: FormikHelpers<Department>
  ) => {
    const result = await submitForm(values, actions);
    if (result) {
      updateEmployeeOverview();
    }
  };

  return (
    <ModalWrapper title="Add Department" isOpen={isOpen} onClose={onClose}>
      <DepartmentForm
        initialValues={{
          departmentName: "",
          addressLineOne: "",
          addressLineTwo: "",
          town: "",
          county: "",
          postcode: "",
        }}
        onSubmit={handleFormSubmit}
        onClose={onClose}
      />
    </ModalWrapper>
  );
};

export default AddDepartmentModal;
