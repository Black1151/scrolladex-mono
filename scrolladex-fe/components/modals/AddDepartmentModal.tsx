import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, useDisclosure, Flex, HStack } from "@chakra-ui/react";
import { createDepartment } from "@/store/departmentSlice";
import ModalWrapper from "./ModalWrapper";
import { FormModalProps } from "@/types";
import AppFormInput from "../forms/AppFormInput";
import { useSubmitHandler } from "@/hooks/submitHandler";
import { useAsyncAction } from "@/hooks/async";
import { fetchEmployeeOverview } from "@/store/employeeSlice";
import { Department } from "@/types";
import { fetchDepartmentDropdownList } from "@/store/departmentSlice";
import { FormikHelpers } from "formik";

const validationSchema = Yup.object({
  departmentName: Yup.string().required("Department Name is a required field."),
  addressLineOne: Yup.string().required("Address Line 1 is a required field."),
  addressLineTwo: Yup.string(),
  town: Yup.string().required("Town is a required field."),
  county: Yup.string().required("County is a required field."),
  postcode: Yup.string().required("Postcode is a required field."),
});

const AddDepartmentModal: React.FC<FormModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = useSubmitHandler({
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

  const updateDepartmentDropdownList = useAsyncAction({
    action: fetchDepartmentDropdownList,
    errorMessage: "Error fetching department dropdown list",
  });

  const handleFormSubmit = async (
    values: Department,
    actions: FormikHelpers<Department>
  ) => {
    const result = await handleSubmit(values, actions);
    if (result) {
      updateEmployeeOverview();
      updateDepartmentDropdownList();
    }
  };

  const handleModalClose = (formikReset: () => void) => {
    formikReset();
    onClose();
  };

  return (
    <ModalWrapper
      buttonText="Add Department"
      title="Add Department"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <Formik
        initialValues={{
          departmentName: "",
          addressLineOne: "",
          addressLineTwo: "",
          town: "",
          county: "",
          postcode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Flex p={4} gap={4} flexDirection="column">
              <AppFormInput
                label="Department Name"
                name="departmentName"
                type="text"
              />
              <Flex gap={4} flexDirection={["column", "row"]}>
                <AppFormInput
                  label="Address Line 1"
                  name="addressLineOne"
                  type="text"
                />
                <AppFormInput
                  label="Address Line 2"
                  name="addressLineTwo"
                  type="text"
                />
              </Flex>
              <Flex gap={4} flexDirection={["column", "row"]}>
                <AppFormInput label="Town" name="town" type="text" />
                <AppFormInput label="County" name="county" type="text" />
                <AppFormInput label="Postcode" name="postcode" type="text" />
              </Flex>
              <HStack mt={4} gap={[0, 4]} flex={1}>
                <Button
                  flex={1}
                  variant={"orange"}
                  onClick={() => handleModalClose(formik.resetForm)}
                >
                  Cancel
                </Button>
                <Button
                  variant={"green"}
                  type="submit"
                  isLoading={formik.isSubmitting}
                  flex={1}
                >
                  Submit
                </Button>
              </HStack>
            </Flex>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default AddDepartmentModal;
