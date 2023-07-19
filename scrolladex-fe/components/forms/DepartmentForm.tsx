import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Flex, HStack } from "@chakra-ui/react";
import AppFormInput from "../forms/AppFormInput";
import { FormikHelpers } from "formik";
import { Department } from "@/types";

interface DepartmentFormProps {
  initialValues: Department;
  onSubmit: (
    values: Department,
    formikHelpers: FormikHelpers<Department>
  ) => void;
  onClose: () => void;
}

const validationSchema = Yup.object({
  departmentName: Yup.string().required("Department Name is a required field."),
  addressLineOne: Yup.string().required("Address Line 1 is a required field."),
  addressLineTwo: Yup.string(),
  town: Yup.string().required("Town is a required field."),
  county: Yup.string().required("County is a required field."),
  postcode: Yup.string()
    .matches(
      new RegExp("^([A-Z]{1,2}[0-9]{1,2}([A-Z]{1})? [0-9][A-Z]{2})$"),
      "Please enter a valid UK postcode"
    )
    .required("Postcode is a required field."),
});

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  initialValues,
  onSubmit,
  onClose,
}) => {
  const handleModalClose = (formikReset: () => void) => {
    formikReset();
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Flex gap={4} flexDirection="column">
            <AppFormInput
              label="Department Name"
              name="departmentName"
              type="text"
            />
            <Flex gap={4} flexDirection={["column", null, "row"]}>
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
            <Flex gap={4} flexDirection={["column", null, "row"]}>
              <AppFormInput label="Town" name="town" type="text" />
              <AppFormInput label="County" name="county" type="text" />
              <AppFormInput label="Postcode" name="postcode" type="text" />
            </Flex>
            <HStack mt={4} gap={[0, 4]} flex={1}>
              <Button
                flex={1}
                variant={"red"}
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
  );
};

export default DepartmentForm;
