import React from "react";
import { FormikHelpers } from "formik";

import { useSubmitHandler } from "@/hooks/submitHandler";
import { useAsyncAction } from "@/hooks/async";
import { EmployeeCreateUpdate, FormModalProps } from "@/types";

import EmployeeForm from "../forms/EmployeeForm";
import ModalWrapper from "./ModalWrapper";
import { createEmployee, fetchEmployeeOverview } from "@/store/employeeSlice";

const AddEmployeeModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const submitForm = useSubmitHandler({
    apiFunction: createEmployee,
    successMessage: "Employee was added successfully",
    errorMessage: "An error occurred while adding the employee.",
    showSuccess: true,
    resetForm: true,
    onClose: () => onClose(),
  });

  const updateEmployeeOverview = useAsyncAction({
    action: fetchEmployeeOverview,
    errorMessage: "Error fetching employee overview",
  });

  const handleFormSubmit = async (
    values: EmployeeCreateUpdate,
    actions: FormikHelpers<EmployeeCreateUpdate>
  ) => {
    const result = await submitForm(values, actions);
    if (result) {
      updateEmployeeOverview();
    }
  };

  return (
    <ModalWrapper title="Add Employee" isOpen={isOpen} onClose={onClose}>
      <EmployeeForm
        initialValues={{
          title: "",
          firstName: "",
          lastName: "",
          empNo: "",
          jobTitle: "",
          departmentId: "",
          telephone: "",
          email: "",
          profilePicture: null,
        }}
        onSubmit={handleFormSubmit}
        onClose={onClose}
      />
    </ModalWrapper>
  );
};

export default AddEmployeeModal;
