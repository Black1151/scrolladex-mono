import React from "react";
import { useSubmitHandler } from "@/hooks/submitHandler";
import { createDepartment } from "@/store/departmentSlice";
import { FormModalProps } from "@/types";
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
        onSubmit={submitForm}
        onClose={onClose}
      />
    </ModalWrapper>
  );
};

export default AddDepartmentModal;
