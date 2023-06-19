import React from "react";
import ModalWrapper from "./ModalWrapper";
import EmployeeForm from "../forms/EmployeeForm";
import { createEmployee } from "../../store/employeeSlice";
import { useSubmitHandler } from "@/hooks/submitHandler";
import { EmployeeCreateUpdate } from "@/types";
import { FormikHelpers } from "formik";
import { useAsyncAction } from "@/hooks/async";
import { fetchEmployeeOverview } from "../../store/employeeSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddEmployeeModal: React.FC<Props> = ({ isOpen, onClose }) => {
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
    <ModalWrapper
      buttonText="Add Employee"
      title="Add Employee"
      isOpen={isOpen}
      onClose={onClose}
    >
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
