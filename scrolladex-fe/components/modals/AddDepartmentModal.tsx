import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, useDisclosure, Flex, HStack } from "@chakra-ui/react";
import { createDepartmentAPI } from "@/api/departmentAPI";
import ModalWrapper from "./ModalWrapper";
import { FormModalProps } from "@/types";
import AppFormInput from "../forms/AppFormInput";

const validationSchema = Yup.object({
  departmentName: Yup.string().required("Department Name is a required field."),
  addressLineOne: Yup.string().required("Address Line 1 is a required field."),
  addressLineTwo: Yup.string(),
  town: Yup.string().required("Town is a required field."),
  county: Yup.string().required("County is a required field."),
  postcode: Yup.string().required("Postcode is a required field."),
});

const AddDepartmentModal: React.FC<FormModalProps> = ({
  createOnSubmitHandler,
}) => {
  const { onClose: onModalClose } = useDisclosure();

  const onClose = () => {
    onModalClose();
  };

  return (
    <ModalWrapper buttonText="Add Department" title="Add Department">
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
        onSubmit={createOnSubmitHandler(
          createDepartmentAPI,
          "Department was added successfully",
          "An error occurred while adding the department."
        )}
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
                <Button flex={1} variant={"orange"} onClick={onClose}>
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
