import React from "react";
import { useSubmitHandler } from "@/hooks/submitHandler";
import { FormModalProps } from "@/types";

import EmployeeForm from "../forms/EmployeeForm";
import ModalWrapper from "./ModalWrapper";
import { createEmployee } from "@/store/employeeSlice";

const AddEmployeeModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const submitForm = useSubmitHandler({
    apiFunction: createEmployee,
    successMessage: "Employee was added successfully",
    errorMessage: "An error occurred while adding the employee.",
    showSuccess: true,
    resetForm: true,
    onClose: () => onClose(),
  });

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
        onSubmit={submitForm}
        onClose={onClose}
      />
    </ModalWrapper>
  );
};

export default AddEmployeeModal;
